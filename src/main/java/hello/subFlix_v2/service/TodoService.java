package hello.subFlix_v2.service;

import hello.subFlix_v2.domain.Todo;
import hello.subFlix_v2.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TodoService {

    private final TodoRepository todoRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Transactional
    public void saveTodo(Todo todo) {
        todoRepository.save(todo);
    }

    @Transactional
    public void updateTodo(Long todoId, String user, String name, String date, String category, String content){
        Todo findTodo = todoRepository.findById(todoId).get();
        findTodo.setUser(user);
        findTodo.setName(name);
        findTodo.setDate(date);
        findTodo.setCategory(category);
        findTodo.setContent(content);
    }

    public List<Todo> findTodos() {
        return todoRepository.findAll();
    }

    public Optional<Todo> findOne(Long todoId) {
        return todoRepository.findById(todoId);
    }

    public void deleteTodo(Long todoId) {
        todoRepository.delete(todoId);
    }

}
