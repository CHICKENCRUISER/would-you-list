package hello.subFlix_v2.repository;

import hello.subFlix_v2.domain.Todo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

public class MemoryTodoRepositoryTest {

    MemoryTodoRepository repository = new MemoryTodoRepository();

    @AfterEach
    public void afterEach() {
        repository.clearStore();
    }

    @Test
    public void save(){
        //given
        Todo todo = new Todo();
        todo.setName("나의 아저씨");

        //when
        repository.save(todo);

        //then
        Todo result = repository.findById(todo.getId()).get();
        assertThat(result).isEqualTo(todo);
    }

    @Test
    public void findByName() {
        //given
        Todo todo1 = new Todo();
        todo1.setName("더 메뉴");
        repository.save(todo1);

        Todo todo2 = new Todo();
        todo2.setName("스타트업");
        repository.save(todo2);

        //when
        Todo result = repository.findByName("더 메뉴").get();

        //then
        assertThat(result).isEqualTo(todo1);
    }

    @Test
    public void findAll() {
        //given
        Todo todo1 = new Todo();
        todo1.setName("더 메뉴");
        repository.save(todo1);

        Todo todo2 = new Todo();
        todo2.setName("스타트업");
        repository.save(todo2);

        //when
        List<Todo> result = repository.findAll();

        //then
        assertThat(result.size()).isEqualTo(2);
    }
}
