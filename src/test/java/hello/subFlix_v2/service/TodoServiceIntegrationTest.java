package hello.subFlix_v2.service;

import hello.subFlix_v2.domain.Todo;
import hello.subFlix_v2.repository.TodoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
public class TodoServiceIntegrationTest {

    @Autowired
    TodoService todoService;
    @Autowired
    TodoRepository todoRepository;

    @Test
    public void 컨텐츠_등록() throws Exception {

        //Given
        Todo todo = new Todo();
        todo.setName("아바타1");

        //When
        Long savedId = todoService.join(todo);

        //Then
        Todo findTodo = todoRepository.findById(savedId).get();
        assertEquals(todo.getName(), findTodo.getName());
    }

    @Test
    public void 중복_컨텐츠_예외() throws Exception {

        //Given
        Todo todo1 = new Todo();
        todo1.setName("아바타1");

        Todo todo2 = new Todo();
        todo2.setName("아바타1");

        //When
        todoService.join(todo1);
        IllegalStateException e = assertThrows(IllegalStateException.class,
                () -> todoService.join(todo2)); //예외가 발생해야함

        assertThat(e.getMessage()).isEqualTo("이미 존재하는 컨텐츠입니다.");
    }
}
