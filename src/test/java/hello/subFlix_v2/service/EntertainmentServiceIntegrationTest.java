package hello.subFlix_v2.service;

import hello.subFlix_v2.domain.Entertainment;
import hello.subFlix_v2.repository.EntertainmentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
public class EntertainmentServiceIntegrationTest {

    @Autowired
    EntertainmentService entertainmentService;
    @Autowired
    EntertainmentRepository entertainmentRepository;

    @Test
    public void 컨텐츠_등록() throws Exception {

        //Given
        Entertainment entertainment = new Entertainment();
        entertainment.setTitle("아바타1");

        //When
        Long savedId = entertainmentService.join(entertainment);

        //Then
        Entertainment findEntertainment = entertainmentRepository.findById(savedId).get();
        assertEquals(entertainment.getTitle(), findEntertainment.getTitle());
    }

    @Test
    public void 중복_컨텐츠_예외() throws Exception {

        //Given
        Entertainment enter1 = new Entertainment();
        enter1.setTitle("아바타1");

        Entertainment enter2 = new Entertainment();
        enter2.setTitle("아바타1");

        //When
        entertainmentService.join(enter1);
        IllegalStateException e = assertThrows(IllegalStateException.class,
                () -> entertainmentService.join(enter2)); //예외가 발생해야함

        assertThat(e.getMessage()).isEqualTo("이미 존재하는 컨텐츠입니다.");
    }
}
