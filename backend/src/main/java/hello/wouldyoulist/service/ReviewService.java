package hello.wouldyoulist.service;

import hello.wouldyoulist.domain.Review;
import hello.wouldyoulist.domain.Todo;
import hello.wouldyoulist.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

    @Transactional
    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId).get();
        Todo todo = review.getTodo();
        todo.setReview(null);

        reviewRepository.delete(reviewId);
    }

    @Transactional
    public void updateReview(Long reviewId,  String reviewTitle, String reviewContent, String doneDate, String place, String expression){
        Review findReview = reviewRepository.findById(reviewId).get();
        findReview.setReviewTitle(reviewTitle);
        findReview.setReviewContent(reviewContent);
        findReview.setDoneDate(doneDate);
        findReview.setPlace(place);
        findReview.setExpression(expression);
    }

    @Transactional
    public void updateReviewPhotoId(Long reviewId, Long reviewPhotoId){
        Review findReview = reviewRepository.findById(reviewId).get();
        findReview.setReviewPhotoId(reviewPhotoId);

    }
}
