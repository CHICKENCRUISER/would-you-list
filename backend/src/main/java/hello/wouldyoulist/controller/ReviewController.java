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

    //참고 링크: https://velog.io/@dhk22/ToyProject-1-SpringBoot를-이용한-파일-업로드에-JPA적용-시키기
    //S3에 업로드: https://velog.io/@chaeri93/SpringBoot-AWS-S3로-이미지-업로드하기
    @PostMapping(value = "/review/new")
    public CreateReviewResponse createReview(HttpServletRequest request, @RequestParam(required = false) MultipartFile file) throws IOException {
        Review review = new Review();
        review.setDoneDate(request.getParameter("doneDate"));
        review.setReviewTitle(request.getParameter("reviewTitle"));
        review.setReviewContent(request.getParameter("reviewContent"));
        review.setPlace(request.getParameter("place"));
        review.setExpression(request.getParameter("expression"));

        if (file == null || file.isEmpty()) {
            review.setReviewPhotoId(1L); //사진 업로드가 안됐을 경우 기본 사진 id로 세팅
        } else {
            String originalFilename = file.getOriginalFilename();
            String storedFileName=s3Uploader.upload(file,"images");

            Long fileId = fileService.save(new UploadFile(originalFilename, storedFileName));
            review.setReviewPhotoId(fileId);
        }

        Long id = reviewService.save(review);
        Review newReview = reviewService.findOne(id).get();

        Long todoId = Long.parseLong(request.getParameter("todoId"));
        todoService.reviewTodo(todoId, newReview); //다(일)대일 양방향 매핑 상황에서 연관관계의 주인이 Todo이므로

        return new CreateReviewResponse(id);
    }

    @DeleteMapping(value = "/review/{reviewId}")
    public Long deleteReview(@PathVariable Long reviewId) {
        Review review = reviewService.findOne(reviewId).get();

        //1.Amazon S3에서 파일 삭제
        //2.UploadFile 객체 삭제
        Long photoId = review.getReviewPhotoId();
        if (photoId != 1) {
            s3Uploader.deleteFile(fileService.findOne(photoId).get().getFullPath());
            fileService.deleteFile(photoId);
        }
        //3.Todo 객체의 review 필드 삭제
        //4.Review 객체 삭제
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
                request.getParameter("place"), request.getParameter("expression")); //커맨드(수정)와
        Review findReview = reviewService.findOne(reviewId).get(); //쿼리(조회)를 분리

        Long photoId = findReview.getReviewPhotoId();
        if(file == null || file.isEmpty()) {
            // Case A: file false && del true
            if(isDeleted && photoId != 1) {
                // 기존 이미지 삭제
                s3Uploader.deleteFile(fileService.findOne(photoId).get().getFullPath());
                fileService.deleteFile(photoId);
                // 기본 이미지로 변경
                reviewService.updateReviewPhotoId(reviewId, 1L);
            }
            // Case B: file false && del false
            // 기존 이미지 유지
        }
        else {
//            if(isDeleted)
            // Case C: file true && del true
            if (photoId != 1) {
                // 기존 이미지 삭제
                s3Uploader.deleteFile(fileService.findOne(photoId).get().getFullPath());
                fileService.deleteFile(photoId);
            }
            // 새로운 파일 업로드
            String originalFilename = file.getOriginalFilename();
            String storedFileName=s3Uploader.upload(file,"images");
            Long fileId = fileService.save(new UploadFile(originalFilename, storedFileName));
            reviewService.updateReviewPhotoId(reviewId, fileId); // table에 photoId 업데이트
//            else
            // Case D: file true && del false 원래는 추가가 맞음. 지금은 사진 하나라 변경점 X
        }

        return new UpdateReviewResponse(findReview.getId(), findReview.getReviewTitle());
    }
}
