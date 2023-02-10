package hello.wouldyoulist.service;

import hello.wouldyoulist.domain.Review;
import hello.wouldyoulist.domain.Todo;
import hello.wouldyoulist.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Transactional
    public Long save(Review review) {
        reviewRepository.save(review);
        return review.getId();
    }

    @Transactional
    public List<Review> getReviews() {
        return reviewRepository.findAll();
    }
}
