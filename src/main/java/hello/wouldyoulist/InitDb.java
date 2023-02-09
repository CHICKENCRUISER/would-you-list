package hello.wouldyoulist;

import hello.wouldyoulist.domain.Todo;
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
        initService.dbInit();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;

        public void dbInit() {
            Todo todo1 = createTodo("이동섭", "바빌론", "2월 5일 오후 7:30", "MOVIE", "어쩌구저쩌구", null);
            Todo todo2 = createTodo("이동섭", "풋살", "2월 5일 오후 11:00", "SPORTS", "풋살체련 희망자!", false);
            Todo todo3 = createTodo("이동섭", "아바타", "2월 9일 오후 3:30", "MOVIE", "아바타2 보기전", true);
            Todo todo4 = createTodo("이동섭", "신과함께", "1월 1일 오전 12:00", "MOVIE", "주지훈 머시쪙", true);
            em.persist(todo1);
            em.persist(todo2);
            em.persist(todo3);
            em.persist(todo4);
        }

        private static Todo createTodo(String user, String name, String date, String category, String content, Boolean state) {
            Todo todo = new Todo();
            todo.setUser(user);
            todo.setName(name);
            todo.setDate(date);
            todo.setCategory(category);
            todo.setContent(content);
            todo.setState(state);
            return todo;
        }
    }
}
