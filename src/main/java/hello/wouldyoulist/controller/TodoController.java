package hello.wouldyoulist.controller;

import hello.wouldyoulist.domain.Todo;
import hello.wouldyoulist.service.TodoService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/todo")
    public List<Todo> todoList() {
        return todoService.findTodos();
    }

    @PostMapping(value = "/todo/new")
    public CreateTodoResponse create(@RequestBody CreateTodoRequest request) {
        //엔티티를 직접 받아오면, 엔티티 검증 정보나 필드명 변경에 취약 -> 별도의 DTO 사용
        Todo todo = new Todo();
        todo.setUser(request.getUser());
        todo.setName(request.getName());
        todo.setDate(request.getDate());
        todo.setCategory(request.getCategory());
        todo.setContent(request.getContent());

        Long id = todoService.saveTodo(todo);
        return new CreateTodoResponse(todo.getId());
    }

    @PutMapping("/todo/{todoId}")
    public UpdateTodoResponse updateTodo(
            @PathVariable Long todoId,
            @RequestBody UpdateTodoRequest request) {

        todoService.updateTodo(todoId, request.getUser(), request.getName(), request.getDate(),
                request.getCategory(), request.getContent()); //커맨드(수정)와
        Todo findTodo = todoService.findOne(todoId).get(); //쿼리(조회)를 분리
        return new UpdateTodoResponse(findTodo.getId(), findTodo.getUser());
    }

    @DeleteMapping("/todo/{todoId}")
    public Long deleteTodo(@PathVariable Long todoId) {
        todoService.deleteTodo(todoId);
        return todoId;
    }

    @Data
    static class CreateTodoRequest {
        private String user;
        private String name;
        private String date;
        private String category;
        private String content;
    }

    @Data
    public class CreateTodoResponse {
        private Long id;

        public CreateTodoResponse(Long id) {
            this.id = id;
        }
    }

    @Data
    static class UpdateTodoRequest {
        private String user;
        private String name;
        private String date;
        private String category;
        private String content;
    }

    @Data
    @AllArgsConstructor
    static class UpdateTodoResponse {
        private Long id;
        private String user;
    }
}
