package hello.wouldyoulist.repository;

import hello.wouldyoulist.domain.Review;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository {

    Review save(Review review);

    Optional<Review> findById(Long id);
    List<Review> findAll();

    void delete(Long id);

}
