package hello.subFlix_v2.repository;

import hello.subFlix_v2.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface SpringDataJpaTodoRepository extends JpaRepository<Todo, Long>, TodoRepository {

    Optional<Todo> findByName(String name);
}
