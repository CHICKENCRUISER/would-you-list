package hello.subFlix_v2.controller;

import hello.subFlix_v2.domain.Todo;
import hello.subFlix_v2.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping(value = "/todos/new")
    public String createForm() {
        return "todos/createTodoForm";
    }

    @PostMapping(value = "/todos/new")
    public String create(TodoForm form) {
        Todo todo = new Todo();
        todo.setName(form.getName());

        todoService.join(todo);

        return "redirect:/";
    }

    @GetMapping(value = "/todos")
    public String list(Model model) {
        List<Todo> todos = todoService.findTodos();
        model.addAttribute("todos", todos);
        return "todos/todoList";
    }
}
