package hello.subFlix_v2;

import hello.subFlix_v2.repository.EntertainmentRepository;
import hello.subFlix_v2.repository.JdbcEntertainmentRepository;
import hello.subFlix_v2.repository.JpaEntertainmentRepository;
import hello.subFlix_v2.repository.MemoryEntertainmentRepository;
import hello.subFlix_v2.service.EntertainmentService;
import jakarta.persistence.EntityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class SpringConfig {

//    private final DataSource dataSource;
//    private final EntityManager em;

//    public SpringConfig(DataSource dataSource, EntityManager em) {
//        this.dataSource = dataSource;
//        this.em = em;
//    }

    private final EntertainmentRepository entertainmentRepository;

    public SpringConfig(EntertainmentRepository entertainmentRepository) {
        this.entertainmentRepository = entertainmentRepository;
    }

    @Bean
    public EntertainmentService entertainmentService() {
        return new EntertainmentService(entertainmentRepository);
    }
}

//    @Bean
//    public EntertainmentRepository entertainmentRepository() {
//        return new MemoryEntertainmentRepository();
//        return new JdbcEntertainmentRepository(dataSource);
//        return new JpaEntertainmentRepository(em);
//    }
//}
