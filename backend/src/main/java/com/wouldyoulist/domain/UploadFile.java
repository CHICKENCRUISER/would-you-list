package src.main.java.com.wouldyoulist.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UploadFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String originalFileName;
    @Column(nullable = false)
    private String fullPath;

    public UploadFile(String originalFileName, String fullPath) {
        this.originalFileName = originalFileName;
        this.fullPath = fullPath;
    }
}
