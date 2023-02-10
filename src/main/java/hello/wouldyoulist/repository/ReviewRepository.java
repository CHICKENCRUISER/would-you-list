package hello.wouldyoulist.repository;

import hello.wouldyoulist.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
