package hello.wouldyoulist.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

public class TodoDto {

    @Data
    public static class CreateTodoRequest {
        private String user;
        private String name;
        private String date;
        private String category;
        private String content;
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
        private String name;
        private String date;
        private String category;
        private String content;
    }

    @Data
    @AllArgsConstructor
    public static class UpdateTodoResponse {
        private Long id;
        private String user;
    }
}
