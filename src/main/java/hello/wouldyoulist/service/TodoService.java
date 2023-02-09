package hello.wouldyoulist.service;

import hello.wouldyoulist.domain.Todo;
import hello.wouldyoulist.repository.TodoRepository;
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
    public Long saveTodo(Todo todo) {
        todoRepository.save(todo);
        return todo.getId();
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

    @Transactional
    public void toggleTodo(Long todoId) {
        Todo findTodo = todoRepository.findById(todoId).get();
        if (findTodo.getState() == true) {
            findTodo.setState(false);
        } else {
            findTodo.setState(true);
        }
    }

    public List<Todo> findTodos() {
        return todoRepository.findStateFalse();
    }

    public List<Todo> findDoneTodos() {
        return todoRepository.findStateTrue();
    }

    public Optional<Todo> findOne(Long todoId) {
        return todoRepository.findById(todoId);
    }

    public void deleteTodo(Long todoId) {
        todoRepository.delete(todoId);
    }

}
