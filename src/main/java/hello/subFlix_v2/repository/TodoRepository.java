package hello.subFlix_v2.repository;

import hello.subFlix_v2.domain.Todo;

import java.util.List;
import java.util.Optional;

public interface TodoRepository {

    Todo save(Todo todo);
    Optional<Todo> findById(Long id);

    Optional<Todo> findByName(String name);
    List<Todo> findAll();

    void delete(Long id);

}
