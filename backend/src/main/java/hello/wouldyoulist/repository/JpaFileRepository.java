package hello.wouldyoulist.repository;

import hello.wouldyoulist.domain.Review;
import hello.wouldyoulist.domain.Todo;
import hello.wouldyoulist.domain.UploadFile;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class JpaFileRepository implements FileRepository {

    private final EntityManager em;

    public UploadFile save(UploadFile uploadFile) {
        if (uploadFile.getId() == null){
            em.persist(uploadFile);
        } else {
            em.merge(uploadFile);
        }
        return uploadFile;
    }

    public Optional<UploadFile> findById(Long id) {
        UploadFile uploadFile = em.createQuery("select distinct u from UploadFile u where u.id = :id", UploadFile.class)
                .setParameter("id", id)
                .getSingleResult();
        return Optional.ofNullable(uploadFile);
    }

    public void delete(Long id) {
        UploadFile uploadFile = em.find(UploadFile.class, id);
        em.remove(uploadFile);
        em.flush();
    }
}
