package hello.wouldyoulist.repository;

import hello.wouldyoulist.domain.Todo;
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
        return em.createQuery("select distinct t from Todo t left join fetch t.review", Todo.class)
                .getResultList();
    }

    public List<Todo> findStateFalse() {
        return em.createQuery("select distinct t from Todo t left join fetch t.review where t.state = false", Todo.class)
                .getResultList();
    }

    public List<Todo> findStateTrue() {
        return em.createQuery("select distinct t from Todo t left join fetch t.review where t.state = true", Todo.class)
                .getResultList();
    }

    public Optional<Todo> findById(Long id) {
//        Todo todo = em.find(Todo.class, id);
        Todo todo = em.createQuery("select distinct t from Todo t left join fetch t.review where t.id = :id", Todo.class)
                .setParameter("id", id)
                .getSingleResult();
        return Optional.ofNullable(todo);
    }

    public Optional<Todo> findByName(String name) {
        List<Todo> result = em.createQuery("select distinct t from Todo t left join fetch t.review where t.name = :name", Todo.class)
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
