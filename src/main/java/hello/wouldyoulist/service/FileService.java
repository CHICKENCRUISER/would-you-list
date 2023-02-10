package hello.wouldyoulist.service;

import hello.wouldyoulist.domain.UploadFile;
import hello.wouldyoulist.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
