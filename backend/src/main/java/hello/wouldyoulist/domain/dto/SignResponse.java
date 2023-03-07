package hello.wouldyoulist.domain.dto;

import hello.wouldyoulist.domain.Authority;
import hello.wouldyoulist.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignResponse {

    private String email;
    private String password;

    private String username;
    private Long userPhotoId;

    private List<Authority> roles = new ArrayList<>();

    private String token;

    public SignResponse(User user) {
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.username = user.getUsername();
        this.userPhotoId = user.getUserPhotoId();
        this.roles = user.getRoles();
    }
}