package hello.wouldyoulist.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;



@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class Member extends BaseTimeEntity {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, unique = true)
    private String email;

    @Column(length = 45)
    private String nickname;

    private int age;

    @Column(length = 100)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public void encodePassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(password);
    }
}
