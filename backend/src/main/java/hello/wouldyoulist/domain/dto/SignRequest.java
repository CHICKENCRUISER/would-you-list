package hello.wouldyoulist.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignRequest {

    private String email;
    private String password;
    private String username;
    private Long userPhotoId;
}