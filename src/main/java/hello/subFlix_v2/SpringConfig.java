package hello.subFlix_v2;

import hello.subFlix_v2.repository.EntertainmentRepository;
import hello.subFlix_v2.repository.JdbcEntertainmentRepository;
import hello.subFlix_v2.repository.MemoryEntertainmentRepository;
import hello.subFlix_v2.service.EntertainmentService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class SpringConfig {

    private final DataSource dataSource;

    public SpringConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Bean
    public EntertainmentService entertainmentService() {
        return new EntertainmentService(entertainmentRepository());
    }

    @Bean
    public EntertainmentRepository entertainmentRepository() {
//        return new MemoryEntertainmentRepository();
        return new JdbcEntertainmentRepository(dataSource);
    }
}
