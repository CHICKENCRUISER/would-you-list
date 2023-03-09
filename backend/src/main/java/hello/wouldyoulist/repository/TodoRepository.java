package hello.wouldyoulist.repository;

import hello.wouldyoulist.domain.Todo;

import java.util.List;
import java.util.Optional;

public interface TodoRepository {

    Todo save(Todo todo);
    Optional<Todo> findById(Long id);
    Optional<Todo> findByTodoName(String todoName);

    List<Todo> findAll();
    List<Todo> findStateFalse();
    List<Todo> findStateTrue();

    void delete(Long id);

}
