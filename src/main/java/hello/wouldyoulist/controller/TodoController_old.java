package hello.wouldyoulist.controller;

import hello.wouldyoulist.domain.Todo;
import hello.wouldyoulist.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@Controller
public class TodoController_old {

    private final TodoService todoService;

    @Autowired
    public TodoController_old(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/todo")
    public String list(Model model) {
        List<Todo> todos = todoService.findTodos();
        model.addAttribute("todos", todos);
        return "todo/todoList";
    }

    @GetMapping("/todo/new")
    public String createForm() {
        return "todo/createTodoForm";
    }

    @PostMapping(value = "/todo/new")
    public String create(TodoForm form) {
        Todo todo = new Todo();
        todo.setUser(form.getUser());
        todo.setName(form.getName());
        todo.setDate(form.getDate());
        todo.setCategory(form.getCategory());
        todo.setContent(form.getContent());

        todoService.saveTodo(todo);

        return "redirect:/todo";
    }

    @GetMapping("/todo/{todoId}")
    public String updateTodoForm(@PathVariable Long todoId, Model model) {
        Todo todo = todoService.findOne(todoId).get();

        TodoForm form = new TodoForm();
        form.setUser(todo.getUser());
        form.setName(todo.getName());
        form.setDate(todo.getDate());
        form.setCategory(todo.getCategory());
        form.setContent(todo.getContent());

        model.addAttribute("form", form);
        return "/todo/updateTodoForm";
    }

    @PostMapping("/todo/{todoId}")
    public String updateTodo(@PathVariable Long todoId, @ModelAttribute TodoForm form) {
        todoService.updateTodo(todoId, form.getUser(), form.getName(), form.getDate(), form.getCategory(), form.getContent());
        return "redirect:/todo";
    }

    @DeleteMapping("/todo/{todoId}")
    public String deleteTodo(@PathVariable Long todoId) {
        todoService.deleteTodo(todoId);
        return "redirect:/todo";
    }
}
