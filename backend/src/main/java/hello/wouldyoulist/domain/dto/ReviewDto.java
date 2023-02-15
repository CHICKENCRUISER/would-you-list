package hello.wouldyoulist.domain.dto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import hello.wouldyoulist.domain.Review;
import hello.wouldyoulist.domain.Todo;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

public class ReviewDto {
    @Data
    public static class ReadReviewResponse {
        private Long id;
        private ReviewTodoResponse todo;
        private String photo;
        private String doneDate;
        private String title;
        private String review;
        private String place;
        private String expression;

        public ReadReviewResponse(Long id, Todo todo, String photo, String doneDate, String title, String review, String place, String expression) {
            this.id = id;
            this.todo = new ReviewTodoResponse(todo);
            this.photo = photo;
            this.doneDate = doneDate;
            this.title = title;
            this.review = review;
            this.place = place;
            this.expression = expression;
        }
    }

    @Data
    public static class ReviewTodoResponse { //반환된 review 안에 todo 안에 또 review가 있는걸 방지
        private Long id;
        private String user;
        private String name;
        private String date;
        private String category;
        private String content;
        private Boolean state;

        public ReviewTodoResponse(Todo todo) {
            this.id = todo.getId();
            this.user = todo.getUser();
            this.name = todo.getName();
            this.date = todo.getDate();
            this.category = todo.getCategory();
            this.content = todo.getContent();
            this.state = todo.getState();
        }
    }


    @Data
    public static class ThumbnailReviewResponse {
        private String photo;
        private String title;
    }

    @Data
    public static class CreateReviewRequest {
        private Long todoId; //**주의 필요**
        private String doneDate;
        private String title;
        private String review;
        private String place;
        private String expression;

        private MultipartFile file;
    }

    @Data
    public static class CreateReviewResponse {
        private Long id;

        public CreateReviewResponse(Long id) {
            this.id = id;
        }
    }

    @Data
    public static class UpdateReviewRequest {
        private Long todoId; //**주의 필요**
        private String doneDate;
        private String title;
        private String review;
        private String place;
        private String expression;

        private MultipartFile file;
    }

    @Data
    @AllArgsConstructor
    public static class UpdateReviewResponse {
        private Long id;
        private String title;
    }
}
