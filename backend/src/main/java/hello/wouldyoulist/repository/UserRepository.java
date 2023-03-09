package hello.wouldyoulist.repository;

import hello.wouldyoulist.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    User save(User user);

    List<User> findAll();

    Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);
}