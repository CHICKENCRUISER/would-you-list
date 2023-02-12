package hello.wouldyoulist.controller;

import hello.wouldyoulist.domain.Todo;
import hello.wouldyoulist.domain.UploadFile;
import hello.wouldyoulist.domain.Review;
import hello.wouldyoulist.service.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
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
    @ResponseBody
    public List<ReadReviewResponse> findAllReview() {
        List<Review> dataReviews = reviewService.getReviews();
        List<ReadReviewResponse> reviews = new ArrayList<>();
        for (Review dataReview : dataReviews) {
            String photoUrl = fileService.findOne(dataReview.getPhotoId()).get().getFullPath();
            ReadReviewResponse review = new ReadReviewResponse(dataReview.getTodo(), photoUrl,
                    dataReview.getDoneDate(), dataReview.getTitle(), dataReview.getReview(),
                    dataReview.getPlace(), dataReview.getExpression());

            reviews.add(review);
        }
        return reviews;
    }

    @GetMapping("/review/thumbnail")
    @ResponseBody
    public List<ThumbnailReviewResponse> findAllReviewThumbnail() {
        List<Review> dataReviews = reviewService.getReviews();
        List<ThumbnailReviewResponse> reviewThumbnails = new ArrayList<>();
        for (Review dataReview : dataReviews) {
            ThumbnailReviewResponse reviewThumbnail = new ThumbnailReviewResponse();
            reviewThumbnail.setPhoto(fileService.findOne(dataReview.getPhotoId()).get().getFullPath());
            reviewThumbnail.setTitle(dataReview.getTitle());

            reviewThumbnails.add(reviewThumbnail);
        }
        return reviewThumbnails;
    }

    @GetMapping("/review/{reviewId}")
    @ResponseBody
    public ReadReviewResponse findReview(@PathVariable Long reviewId) {
        Review dataReview = reviewService.findOne(reviewId).get();
        String photoUrl = fileService.findOne(dataReview.getPhotoId()).get().getFullPath();
        return new ReadReviewResponse(dataReview.getTodo(), photoUrl, dataReview.getDoneDate(),
                dataReview.getTitle(), dataReview.getReview(), dataReview.getPlace(), dataReview.getExpression());
    }

    //참고 링크: https://velog.io/@dhk22/ToyProject-1-SpringBoot를-이용한-파일-업로드에-JPA적용-시키기
    //S3에 업로드: https://velog.io/@chaeri93/SpringBoot-AWS-S3로-이미지-업로드하기
    @PostMapping(value = "/review/new")
    @ResponseBody
    public CreateReviewResponse create(HttpServletRequest request, @RequestParam MultipartFile file) throws IOException {

        Review review = new Review();
        Long todoId = Long.parseLong(request.getParameter("todoId"));
        review.setTodo(todoService.findOne(todoId).get());

        review.setDoneDate(request.getParameter("doneDate"));
        review.setTitle(request.getParameter("title"));
        review.setReview(request.getParameter("review"));
        review.setPlace(request.getParameter("place"));
        review.setExpression(request.getParameter("expression"));

        if (file.isEmpty()) {
            review.setPhotoId(0L); //사진 업로드가 안됐을 경우 기본 사진 id로 세팅
        } else {
//            //파일을 지정된 경로에 저장 (실제 물리적 저장)
            String originalFilename = file.getOriginalFilename();
//            String fullPath = uploadDir + originalFilename;
//            file.transferTo(new File(fullPath));
//
//            //파일과 리뷰의 정보를 DB에 저장 (논리적 저장)
//            Long fileId = fileService.save(new UploadFile(originalFilename, fullPath));
//            review.setPhotoId(fileId);

            String storedFileName=s3Uploader.upload(file,"images");

            Long fileId = fileService.save(new UploadFile(originalFilename, storedFileName));
            review.setPhotoId(fileId);

        }
        Long id = reviewService.save(review);
        return new CreateReviewResponse(id);
    }

    @Data
    static class ReadReviewResponse {
        private Todo todo;
        private String photo;
        private String doneDate;
        private String title;
        private String review;
        private String place;
        private String expression;

        public ReadReviewResponse(Todo todo, String photo, String doneDate, String title, String review, String place, String expression) {
            this.todo = todo;
            this.photo = photo;
            this.doneDate = doneDate;
            this.title = title;
            this.review = review;
            this.place = place;
            this.expression = expression;
        }
    }

    @Data
    static class ThumbnailReviewResponse {
        private String photo;
        private String title;
    }

    @Data
    static class CreateReviewRequest {
        private Long todoId; //**주의 필요**
        private String doneDate;
        private String title;
        private String review;
        private String place;
        private String expression;

        private MultipartFile file;
    }

    @Data
    static class CreateReviewResponse {
        private Long id;

        public CreateReviewResponse(Long id) {
            this.id = id;
        }
    }

}
