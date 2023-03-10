package hello.wouldyoulist.controller;

import hello.wouldyoulist.domain.Todo;
import hello.wouldyoulist.domain.UploadFile;
import hello.wouldyoulist.domain.Review;
import hello.wouldyoulist.domain.dto.ReviewDto;
import hello.wouldyoulist.service.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import lombok.RequiredArgsConstructor;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static hello.wouldyoulist.domain.dto.ReviewDto.*;


@RestController
public class ReviewController {

    private final TodoService todoService;
    private final FileService fileService;
    private final ReviewService reviewService;
    private final S3Uploader s3Uploader;

    public ReviewController(TodoService todoService, FileService fileService, ReviewService reviewService, S3Uploader s3Uploader) {
        this.todoService = todoService;
        this.fileService = fileService;
        this.reviewService = reviewService;
        this.s3Uploader = s3Uploader;
    }

    @GetMapping("/review")
    public List<ReadReviewResponse> reviewList() {
        List<Review> dataReviews = reviewService.getReviews();
        List<ReadReviewResponse> reviews = new ArrayList<>();
        for (Review dataReview : dataReviews) {
            String photoUrl = fileService.findOne(dataReview.getReviewPhotoId()).get().getFullPath();
            ReadReviewResponse review = new ReadReviewResponse(dataReview.getId(), dataReview.getTodo(), photoUrl,
                    dataReview.getDoneDate(), dataReview.getReviewTitle(), dataReview.getReviewContent(),
                    dataReview.getPlace(), dataReview.getExpression());

            reviews.add(review);
        }
        return reviews;
    }

    @GetMapping("/review/thumbnail")
    public List<ThumbnailReviewResponse> reviewThumbnailList() {
        List<Review> dataReviews = reviewService.getReviews();
        List<ThumbnailReviewResponse> reviewThumbnails = new ArrayList<>();
        for (Review dataReview : dataReviews) {
            ThumbnailReviewResponse reviewThumbnail = new ThumbnailReviewResponse();
            reviewThumbnail.setReviewPhoto(fileService.findOne(dataReview.getReviewPhotoId()).get().getFullPath());
            reviewThumbnail.setReviewTitle(dataReview.getReviewTitle());

            reviewThumbnails.add(reviewThumbnail);
        }
        return reviewThumbnails;
    }

    @GetMapping("/review/{reviewId}")
    public ReadReviewResponse reviewOne(@PathVariable Long reviewId) {
        Review dataReview = reviewService.findOne(reviewId).get();
        String photoUrl = fileService.findOne(dataReview.getReviewPhotoId()).get().getFullPath();
        return new ReadReviewResponse(dataReview.getId(), dataReview.getTodo(), photoUrl, dataReview.getDoneDate(),
                dataReview.getReviewTitle(), dataReview.getReviewContent(), dataReview.getPlace(), dataReview.getExpression());
    }

    //?????? ??????: https://velog.io/@dhk22/ToyProject-1-SpringBoot???-?????????-??????-????????????-JPA??????-?????????
    //S3??? ?????????: https://velog.io/@chaeri93/SpringBoot-AWS-S3???-?????????-???????????????
    @PostMapping(value = "/review/new")
    public CreateReviewResponse createReview(HttpServletRequest request, @RequestParam(required = false) MultipartFile file) throws IOException {
        Review review = new Review();
        review.setDoneDate(request.getParameter("doneDate"));
        review.setReviewTitle(request.getParameter("reviewTitle"));
        review.setReviewContent(request.getParameter("reviewContent"));
        review.setPlace(request.getParameter("place"));
        review.setExpression(request.getParameter("expression"));

        if (file == null || file.isEmpty()) {
            review.setReviewPhotoId(1L); //?????? ???????????? ????????? ?????? ?????? ?????? id??? ??????
        } else {
            String originalFilename = file.getOriginalFilename();
            String storedFileName=s3Uploader.upload(file,"images");

            Long fileId = fileService.save(new UploadFile(originalFilename, storedFileName));
            review.setReviewPhotoId(fileId);
        }

        Long id = reviewService.save(review);
        Review newReview = reviewService.findOne(id).get();

        Long todoId = Long.parseLong(request.getParameter("todoId"));
        todoService.reviewTodo(todoId, newReview); //???(???)?????? ????????? ?????? ???????????? ??????????????? ????????? Todo?????????

        return new CreateReviewResponse(id);
    }

    @DeleteMapping(value = "/review/{reviewId}")
    public Long deleteReview(@PathVariable Long reviewId) {
        Review review = reviewService.findOne(reviewId).get();

        //1.Amazon S3?????? ?????? ??????
        //2.UploadFile ?????? ??????
        Long photoId = review.getReviewPhotoId();
        if (photoId != 1) {
            s3Uploader.deleteFile(fileService.findOne(photoId).get().getFullPath());
            fileService.deleteFile(photoId);
        }
        //3.Todo ????????? review ?????? ??????
        //4.Review ?????? ??????
        reviewService.deleteReview(reviewId);

        return reviewId;
    }

    @PutMapping("/review/{reviewId}")
    public UpdateReviewResponse updateReview(
            @PathVariable Long reviewId,
            HttpServletRequest request,
            @RequestParam(required = false) MultipartFile file,
            @RequestParam Boolean isDeleted
            ) throws IOException{

        reviewService.updateReview(reviewId, request.getParameter("reviewTitle"), request.getParameter("reviewContent"), request.getParameter("doneDate"),
                request.getParameter("place"), request.getParameter("expression")); //?????????(??????)???
        Review findReview = reviewService.findOne(reviewId).get(); //??????(??????)??? ??????

        Long photoId = findReview.getReviewPhotoId();
        if(file == null || file.isEmpty()) {
            // Case A: file false && del true
            if(isDeleted && photoId != 1) {
                // ?????? ????????? ??????
                s3Uploader.deleteFile(fileService.findOne(photoId).get().getFullPath());
                fileService.deleteFile(photoId);
                // ?????? ???????????? ??????
                reviewService.updateReviewPhotoId(reviewId, 1L);
            }
            // Case B: file false && del false
            // ?????? ????????? ??????
        }
        else {
//            if(isDeleted)
            // Case C: file true && del true
            if (photoId != 1) {
                // ?????? ????????? ??????
                s3Uploader.deleteFile(fileService.findOne(photoId).get().getFullPath());
                fileService.deleteFile(photoId);
            }
            // ????????? ?????? ?????????
            String originalFilename = file.getOriginalFilename();
            String storedFileName=s3Uploader.upload(file,"images");
            Long fileId = fileService.save(new UploadFile(originalFilename, storedFileName));
            reviewService.updateReviewPhotoId(reviewId, fileId); // table??? photoId ????????????
//            else
            // Case D: file true && del false ????????? ????????? ??????. ????????? ?????? ????????? ????????? X
        }

        return new UpdateReviewResponse(findReview.getId(), findReview.getReviewTitle());
    }
}
