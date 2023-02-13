package src.main.java.com.wouldyoulist.repository;

import src.main.java.com.wouldyoulist.domain.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<UploadFile, Long> {
}
