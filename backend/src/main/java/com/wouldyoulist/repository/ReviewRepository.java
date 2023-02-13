package src.main.java.com.wouldyoulist.repository;

import src.main.java.com.wouldyoulist.domain.Review;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository {

    Review save(Review review);

    Optional<Review> findById(Long id);
    List<Review> findAll();

    void delete(Long id);

}
