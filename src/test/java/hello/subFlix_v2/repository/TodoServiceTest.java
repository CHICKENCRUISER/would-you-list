package hello.subFlix_v2.repository;

import hello.subFlix_v2.domain.Todo;
import hello.subFlix_v2.service.TodoService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

public class TodoServiceTest {

    TodoService todoService;
    MemoryTodoRepository entertainmentRepository;

    @BeforeEach
    public void beforeEach() {
        entertainmentRepository = new MemoryTodoRepository();
        todoService = new TodoService(entertainmentRepository);
    }

    @AfterEach
    public void afterEach() {
        entertainmentRepository.clearStore();
    }

    @Test
    public void 컨텐츠_등록() throws Exception {
        //Given
        Todo entertainment = new Todo();
        entertainment.setName("더 메뉴");

        //When
        Long savedId = todoService.join(entertainment);

        //Then
        Todo findEntertainment = entertainmentRepository.findById(savedId).get();
        assertEquals(entertainment, findEntertainment);
    }

    @Test
    public void 중복_컨텐츠_예외() throws Exception {
        //Given
        Todo entertainment1 = new Todo();
        entertainment1.setName("더 메뉴");

        Todo entertainment2 = new Todo();
        entertainment2.setName("더 메뉴");

        //When
        todoService.join(entertainment1);
        IllegalStateException e = assertThrows(IllegalStateException.class,
                () -> todoService.join(entertainment2));

        //Then
        assertThat(e.getMessage()).isEqualTo("이미 존재하는 컨텐츠입니다.");
    }

}
