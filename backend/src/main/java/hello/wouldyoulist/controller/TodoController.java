package hello.wouldyoulist.controller;

import hello.wouldyoulist.domain.Review;
import hello.wouldyoulist.domain.Todo;
import hello.wouldyoulist.domain.dto.TodoDto;
import hello.wouldyoulist.service.TodoService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static hello.wouldyoulist.domain.dto.TodoDto.*;

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

    @GetMapping("/doneTodo")
    public List<Todo> doneTodoList() {
        return todoService.findDoneTodos();
    }

    @PostMapping(value = "/todo/new")
    public CreateTodoResponse createTodo(@RequestBody CreateTodoRequest request) {
        //엔티티를 직접 받아오면, 엔티티 검증 정보나 필드명 변경에 취약 -> 별도의 DTO 사용
        Todo todo = new Todo();
        todo.setUser(request.getUser());
        todo.setTodoName(request.getTodoName());
        todo.setPlanDate(request.getPlanDate());
        todo.setCategory(request.getCategory());
        todo.setTodoContent(request.getTodoContent());
        todo.setState(request.getState());

        Long id = todoService.saveTodo(todo);
        return new CreateTodoResponse(todo.getId());
    }

    @PutMapping("/todo/{todoId}")
    public UpdateTodoResponse updateTodo(
            @PathVariable Long todoId,
            @RequestBody UpdateTodoRequest request) {

        todoService.updateTodo(todoId, request.getUser(), request.getTodoName(), request.getPlanDate(),
                request.getCategory(), request.getTodoContent()); //커맨드(수정)와
        Todo findTodo = todoService.findOne(todoId).get(); //쿼리(조회)를 분리
        return new UpdateTodoResponse(findTodo.getId(), findTodo.getUser());
    }

    @PutMapping("/todo/{todoId}/toggle")
    public UpdateTodoResponse toggleTodo(@PathVariable Long todoId) {

        todoService.toggleTodo(todoId);
        Todo findTodo = todoService.findOne(todoId).get();
        return new UpdateTodoResponse(findTodo.getId(), findTodo.getUser());
    }

    @DeleteMapping("/todo/{todoId}")
    public Long deleteTodo(@PathVariable Long todoId) {
        todoService.deleteTodo(todoId);
        return todoId;
    }
}
