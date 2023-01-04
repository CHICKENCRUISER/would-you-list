package hello.subFlix_v2.repository;

import hello.subFlix_v2.domain.Entertainment;

import java.util.List;
import java.util.Optional;

public interface EntertainmentRepository {

    Entertainment save(Entertainment entertainment);
    Optional<Entertainment> findById(Long id);
    Optional<Entertainment> findByTitle(String title);
    List<Entertainment> findAll();

}
