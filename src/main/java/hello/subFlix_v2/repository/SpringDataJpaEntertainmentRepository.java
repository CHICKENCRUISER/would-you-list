package hello.subFlix_v2.repository;

import hello.subFlix_v2.domain.Entertainment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface SpringDataJpaEntertainmentRepository extends JpaRepository<Entertainment, Long>, EntertainmentRepository {

    Optional<Entertainment> findByTitle(String title);
}
