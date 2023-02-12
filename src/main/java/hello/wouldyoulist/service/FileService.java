package hello.wouldyoulist.service;

import hello.wouldyoulist.domain.Todo;
import hello.wouldyoulist.domain.UploadFile;
import hello.wouldyoulist.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class FileService {

    private final FileRepository fileRepository;

    @Transactional
    public Long save(UploadFile uploadFile) {
        fileRepository.save(uploadFile);
        return uploadFile.getId();
    }

    public Optional<UploadFile> findOne(Long fileId) {
        return fileRepository.findById(fileId);
    }
}
