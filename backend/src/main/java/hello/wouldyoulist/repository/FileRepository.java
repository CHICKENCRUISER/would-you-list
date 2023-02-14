package hello.wouldyoulist.repository;

import hello.wouldyoulist.domain.UploadFile;

import java.util.List;
import java.util.Optional;

public interface FileRepository {

    UploadFile save(UploadFile uploadFile);

    Optional<UploadFile> findById(Long id);

    void delete(Long id);
}
