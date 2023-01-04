package hello.subFlix_v2.repository;

import hello.subFlix_v2.domain.Entertainment;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

public class MemoryEntertainmentRepositoryTest {

    MemoryEntertainmentRepository repository = new MemoryEntertainmentRepository();

    @AfterEach
    public void afterEach() {
        repository.clearStore();
    }

    @Test
    public void save(){
        //given
        Entertainment entertainment = new Entertainment();
        entertainment.setTitle("나의 아저씨");

        //when
        repository.save(entertainment);

        //then
        Entertainment result = repository.findById(entertainment.getId()).get();
        assertThat(result).isEqualTo(entertainment);
    }

    @Test
    public void findByName() {
        //given
        Entertainment enter1 = new Entertainment();
        enter1.setTitle("더 메뉴");
        repository.save(enter1);

        Entertainment enter2 = new Entertainment();
        enter2.setTitle("스타트업");
        repository.save(enter2);

        //when
        Entertainment result = repository.findByTitle("더 메뉴").get();

        //then
        assertThat(result).isEqualTo(enter1);
    }

    @Test
    public void findAll() {
        //given
        Entertainment enter1 = new Entertainment();
        enter1.setTitle("더 메뉴");
        repository.save(enter1);

        Entertainment enter2 = new Entertainment();
        enter2.setTitle("스타트업");
        repository.save(enter2);

        //when
        List<Entertainment> result = repository.findAll();

        //then
        assertThat(result.size()).isEqualTo(2);
    }
}
