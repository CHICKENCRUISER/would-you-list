package hello.wouldyoulist.repository;

import hello.wouldyoulist.domain.Review;
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
        Review review = em.find(Review.class, id);
        return Optional.ofNullable(review);
    }

    public List<Review> findAll() {
        return em.createQuery("select r from Review r", Review.class)
                .getResultList();
    }

    public void delete(Long id) {
        Review review = em.find(Review.class, id);
        em.remove(review);
        em.flush();
    }
}
