package hello.subFlix_v2.service;

import hello.subFlix_v2.domain.Entertainment;
import hello.subFlix_v2.repository.EntertainmentRepository;
import hello.subFlix_v2.repository.MemoryEntertainmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//@Service
public class EntertainmentService {

    private final EntertainmentRepository entertainmentRepository;

    //@Autowired
    public EntertainmentService(EntertainmentRepository entertainmentRepository) {
        this.entertainmentRepository = entertainmentRepository;
    }

    /**
     * 엔터테인먼트 등록
     */

    public Long join(Entertainment entertainment) {

        validateDuplicateEntertainment(entertainment);
        entertainmentRepository.save(entertainment);
        return entertainment.getId();
    }

    public void validateDuplicateEntertainment(Entertainment entertainment) {
        entertainmentRepository.findByTitle(entertainment.getTitle())
                .ifPresent(e -> {
                    throw new IllegalStateException("이미 존재하는 컨텐츠입니다.");
                });
    }

    /**
     * 전체 엔터테인먼트 조회
     */
    public List<Entertainment> findEntertainments() {
        return entertainmentRepository.findAll();
    }

    public Optional<Entertainment> findOne(Long enterId) {
        return entertainmentRepository.findById(enterId);
    }

}
