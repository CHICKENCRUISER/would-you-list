package hello.wouldyoulist;

import hello.wouldyoulist.domain.Review;
import hello.wouldyoulist.domain.Todo;
import hello.wouldyoulist.domain.UploadFile;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class InitDb {

    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.fileDbInit();
        initService.DbInit();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;

        public void DbInit() {
            Todo todo1 = createTodo("이동섭", "종만북", "2월 5일 오후 7:30", "BOOK", "어쩌구저쩌구", true, null);
            Todo todo2 = createTodo("이동섭", "풋살", "2월 5일 오후 11:00", "SPORTS", "풋살체련 희망자!", true, null);
            Todo todo3 = createTodo("이동섭", "아바타", "2월 9일 오후 3:30", "MOVIE", "아바타2 보기전", false, null);
            Todo todo4 = createTodo("이동섭", "신과함께", "1월 1일 오전 12:00", "MOVIE", "주지훈 머시쪙", false, null);
            em.persist(todo1);
            em.persist(todo2);
            em.persist(todo3);
            em.persist(todo4);

            Review review1 = createReview(1L, "코딩테스트 대비 최고의 책!", "알기 쉽게 설명이 되어있어서 정말 도움이 많이 됐어요~", "2월 13일 오후 2:24", "스타벅스", "happy");
            Review review2 = createReview(1L, "풋살은 역시 비올때 해야 제맛!", "하지만 다리가 부러졌어요 ㅠㅠ", "1월 31일 오전 11:12", "풋살장", "sad");
            em.persist(review1);
            em.persist(review2);

            todo1.setReview(review1);
            todo2.setReview(review2);
        }

        public void fileDbInit() {
            UploadFile defaultPhoto = new UploadFile("defaultPhoto.jpeg", "https://wouldyoulistfile.s3.ap-northeast-2.amazonaws.com/images/97c08004-fb34-4fb1-ad4c-4100524d3957defaultPhoto.jpeg");
            em.persist(defaultPhoto);
        }

        private static Todo createTodo(String user, String name, String date, String category, String content, Boolean state, Review review) {
            Todo todo = new Todo();
            todo.setUser(user);
            todo.setName(name);
            todo.setDate(date);
            todo.setCategory(category);
            todo.setContent(content);
            todo.setState(state);
            todo.setReview(review);
            return todo;
        }

        private static Review createReview(Long photoId, String title, String review, String doneDate, String place, String expression) {
            Review newReview = new Review();
            newReview.setPhotoId(photoId);
            newReview.setTitle(title);
            newReview.setReview(review);
            newReview.setDoneDate(doneDate);
            newReview.setPlace(place);
            newReview.setExpression(expression);
            return newReview;
        }
    }
}
