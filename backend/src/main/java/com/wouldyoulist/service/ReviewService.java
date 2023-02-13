package src.main.java.com.wouldyoulist.service;

import src.main.java.com.wouldyoulist.domain.Review;
import src.main.java.com.wouldyoulist.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    public List<Review> getReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> findOne(Long reviewId) {
        return reviewRepository.findById(reviewId);
    }
}
