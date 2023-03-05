package hello.wouldyoulist.domain.dto;

import hello.wouldyoulist.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;

public class TodoDto {

    @Data
    public static class CreateTodoRequest {
        private String user;
        private String todoName;
        private String planDate;
        private String category;
        private String todoContent;
        private Boolean state;
    }

    @Data
    public static class CreateTodoResponse {
        private Long id;

        public CreateTodoResponse(Long id) {
            this.id = id;
        }
    }

    @Data
    public static class UpdateTodoRequest {
        private String user;
        private String todoName;
        private String planDate;
        private String category;
        private String todoContent;
    }

    @Data
    @AllArgsConstructor
    public static class UpdateTodoResponse {
        private Long id;
        private String user;
    }
}
