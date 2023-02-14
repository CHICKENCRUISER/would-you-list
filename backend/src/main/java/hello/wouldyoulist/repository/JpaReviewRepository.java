package hello.wouldyoulist.repository;

import hello.wouldyoulist.domain.Review;
import hello.wouldyoulist.domain.Todo;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class JpaReviewRepository implements ReviewRepository{

    private final EntityManager em;

    public Review save(Review review) {
        if (review.getId() == null){
            em.persist(review);
        } else {
            em.merge(review);
        }
        return review;
    }

    public Optional<Review> findById(Long id) {
        Review review = em.createQuery("select distinct r from Review r left join fetch r.todo where r.id = :id", Review.class)
                .setParameter("id", id)
                .getSingleResult();
        return Optional.ofNullable(review);
    }

    public List<Review> findAll() {
        return em.createQuery("select distinct r from Review r left join fetch r.todo", Review.class)
                .getResultList();
    }

    public void delete(Long id) {
        Review review = em.find(Review.class, id);
        em.remove(review);
        em.flush();
    }
}
