package hello.wouldyoulist.domain;

import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseTimeEntity {
    @CreatedDate //엔티티가 생성된 시간
    private LocalDateTime createDate;

    @LastModifiedDate // 엔티티가 수정된 시간
    private LocalDateTime modifiedDate;

}
