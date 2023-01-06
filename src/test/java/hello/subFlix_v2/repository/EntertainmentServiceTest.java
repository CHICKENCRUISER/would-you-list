package hello.subFlix_v2.repository;

import hello.subFlix_v2.domain.Entertainment;
import hello.subFlix_v2.service.EntertainmentService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

public class EntertainmentServiceTest {

    EntertainmentService entertainmentService;
    MemoryEntertainmentRepository entertainmentRepository;

    @BeforeEach
    public void beforeEach() {
        entertainmentRepository = new MemoryEntertainmentRepository();
        entertainmentService = new EntertainmentService(entertainmentRepository);
    }

    @AfterEach
    public void afterEach() {
        entertainmentRepository.clearStore();
    }

    @Test
    public void 컨텐츠_등록() throws Exception {
        //Given
        Entertainment entertainment = new Entertainment();
        entertainment.setTitle("더 메뉴");

        //When
        Long savedId = entertainmentService.join(entertainment);

        //Then
        Entertainment findEntertainment = entertainmentRepository.findById(savedId).get();
        assertEquals(entertainment.getTitle(), findEntertainment.getTitle());
    }

    @Test
    public void 중복_컨텐츠_예외() throws Exception {
        //Given
        Entertainment entertainment1 = new Entertainment();
        entertainment1.setTitle("더 메뉴");

        Entertainment entertainment2 = new Entertainment();
        entertainment2.setTitle("더 메뉴");

        //When
        entertainmentService.join(entertainment1);
        IllegalStateException e = assertThrows(IllegalStateException.class,
                () -> entertainmentService.join(entertainment2));

        //Then
        assertThat(e.getMessage()).isEqualTo("이미 존재하는 컨텐츠입니다.");
    }

}
