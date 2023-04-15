package hello.wouldyoulist.domain.dto;

import hello.wouldyoulist.domain.Member;
import hello.wouldyoulist.domain.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

@Data
@Builder
@AllArgsConstructor
public class MemberSignUpRequestDto {
    @NotBlank(message = "아이디를 입력해주세요")
    private String email;

    @NotBlank(message = "닉네임을 입력해주세요.")
    @Size(min=2, message = "닉네임이 너무 짧습니다.")
    private String nickname;

    @NotNull(message = "나이를 입력해주세요")
    @Range(min = 0, max = 150)
    private int age;

    @NotBlank(message = "비밀번호를 입력해주세요")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,30}$",
            message = "비밀번호는 8~30 자리이면서 1개 이상의 알파벳, 숫자, 특수문자를 포함해야합니다.")
    private String password;

    private String checkedPassword;

    private Role role;

    @Builder
    public Member toEntity(){
        return Member.builder()
                .email(email)
                .nickname(nickname)
                .age(age)
                .password(password)
                .role(Role.USER)
                .build();
    }
}
