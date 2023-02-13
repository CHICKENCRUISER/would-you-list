package hello.wouldyoulist.repository;

import hello.wouldyoulist.domain.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<UploadFile, Long> {
}
