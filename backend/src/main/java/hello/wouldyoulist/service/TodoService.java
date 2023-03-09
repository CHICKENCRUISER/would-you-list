package hello.wouldyoulist.service;

import hello.wouldyoulist.domain.Review;
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
    public void updateTodo(Long todoId, String user, String todoName, String planDate, String category, String todoContent){
        Todo findTodo = todoRepository.findById(todoId).get();
        findTodo.setUser(user);
        findTodo.setTodoName(todoName);
        findTodo.setPlanDate(planDate);
        findTodo.setCategory(category);
        findTodo.setTodoContent(todoContent);
    }

    @Transactional
    public void reviewTodo(Long todoId, Review review) {
        Todo findTodo = todoRepository.findById(todoId).get();
        findTodo.setReview(review);
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
