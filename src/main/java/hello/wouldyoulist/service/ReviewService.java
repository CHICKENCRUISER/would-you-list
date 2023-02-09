package hello.wouldyoulist.service;

import hello.wouldyoulist.domain.Review;
import hello.wouldyoulist.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Transactional
    public Long save(Review review) {
        reviewRepository.save(review);
        return review.getId();
    }
}
