package hello.subFlix_v2.repository;

import hello.subFlix_v2.domain.Entertainment;
import jakarta.persistence.EntityManager;

import java.util.List;
import java.util.Optional;

public class JpaEntertainmentRepository implements EntertainmentRepository {

    private final EntityManager em;

    public JpaEntertainmentRepository(EntityManager em) {
        this.em = em;
    }

    public Entertainment save(Entertainment entertainment) {
        em.persist(entertainment);
        return entertainment;
    }

    public Optional<Entertainment> findById(Long id) {
        Entertainment entertainment = em.find(Entertainment.class, id);
        return Optional.ofNullable(entertainment);
    }

    public List<Entertainment> findAll() {
        return em.createQuery("select e from Entertainment e", Entertainment.class)
                .getResultList();
    }

    public Optional<Entertainment> findByTitle(String title) {
        List<Entertainment> result = em.createQuery("select e from Entertainment e where e.title = :title", Entertainment.class)
                .setParameter("title", title)
                .getResultList();
        return result.stream().findAny();
    }
}
