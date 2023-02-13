package src.main.java.com.wouldyoulist.service;

import src.main.java.com.wouldyoulist.domain.UploadFile;
import src.main.java.com.wouldyoulist.repository.FileRepository;
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
