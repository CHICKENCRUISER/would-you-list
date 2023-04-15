package hello.wouldyoulist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class WouldYouListApplication {

	public static void main(String[] args) {
		SpringApplication.run(WouldYouListApplication.class, args);
	}

}
