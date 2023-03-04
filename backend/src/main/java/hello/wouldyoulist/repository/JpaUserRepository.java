package hello.wouldyoulist.repository;

import hello.wouldyoulist.domain.Review;
import hello.wouldyoulist.domain.User;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class JpaUserRepository implements UserRepository {
    private final EntityManager em;

    public User save(User user) {
        if (user.getId() == null){
            em.persist(user);
        } else {
            em.merge(user);
        }
        return user;
    }

    public List<User> findAll() {
        return em.createQuery("select distinct u from User u ", User.class)
                .getResultList();
    }
    public Optional<User> findById(Long id) {
        User user = em.createQuery("select distinct u from User u where u.id = :id", User.class)
                .setParameter("id", id)
                .getSingleResult();
        return Optional.ofNullable(user);
    }

    public Optional<User> findByEmail(String email) {
        User user = em.createQuery("select distinct u from User u where u.email = :email", User.class)
                .setParameter("email", email)
                .getSingleResult();
        return Optional.ofNullable(user);
    }


}
