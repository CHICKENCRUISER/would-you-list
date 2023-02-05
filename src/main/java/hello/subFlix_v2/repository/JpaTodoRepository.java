package hello.subFlix_v2.repository;

import hello.subFlix_v2.domain.Todo;
import jakarta.persistence.EntityManager;

import java.util.List;
import java.util.Optional;

public class JpaTodoRepository implements TodoRepository {

    private final EntityManager em;

    public JpaTodoRepository(EntityManager em) {
        this.em = em;
    }

    public Todo save(Todo todo) {
        em.persist(todo);
        return todo;
    }

    public Optional<Todo> findById(Long id) {
        Todo todo = em.find(Todo.class, id);
        return Optional.ofNullable(todo);
    }

    public List<Todo> findAll() {
        return em.createQuery("select e from Todo e", Todo.class)
                .getResultList();
    }

    public Optional<Todo> findByName(String name) {
        List<Todo> result = em.createQuery("select t from Todo t where t.name = :name", Todo.class)
                .setParameter("name", name)
                .getResultList();
        return result.stream().findAny();
    }
}
