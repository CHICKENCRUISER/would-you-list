package src.main.java.com.wouldyoulist.repository;

import src.main.java.com.wouldyoulist.domain.Todo;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class JpaTodoRepository implements TodoRepository {

    private final EntityManager em;

    public Todo save(Todo todo) {
        if (todo.getId() == null){
            em.persist(todo);
        } else {
            em.merge(todo);
        }
        return todo;
    }

    public List<Todo> findAll() {
        return em.createQuery("select t from Todo t", Todo.class)
                .getResultList();
    }

    public List<Todo> findStateFalse() {
        return em.createQuery("select t from Todo t where t.state = false", Todo.class)
                .getResultList();
    }

    public List<Todo> findStateTrue() {
        return em.createQuery("select t from Todo t where t.state = true", Todo.class)
                .getResultList();
    }

    public Optional<Todo> findById(Long id) {
        Todo todo = em.find(Todo.class, id);
        return Optional.ofNullable(todo);
    }

    public Optional<Todo> findByName(String name) {
        List<Todo> result = em.createQuery("select t from Todo t where t.name = :name", Todo.class)
                .setParameter("name", name)
                .getResultList();
        return result.stream().findAny();
    }

    public void delete(Long id) {
        Todo todo = em.find(Todo.class, id);
        em.remove(todo);
        em.flush();
    }
}
