package hello.subFlix_v2;

import hello.subFlix_v2.repository.EntertainmentRepository;
import hello.subFlix_v2.repository.MemoryEntertainmentRepository;
import hello.subFlix_v2.service.EntertainmentService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {
    @Bean
    public EntertainmentService entertainmentService() {
        return new EntertainmentService(entertainmentRepository());
    }

    @Bean
    public EntertainmentRepository entertainmentRepository() {
        return new MemoryEntertainmentRepository();
    }
}
