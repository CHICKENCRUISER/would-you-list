package hello.wouldyoulist.service;

import hello.wouldyoulist.domain.Authority;
import hello.wouldyoulist.domain.User;
import hello.wouldyoulist.domain.dto.SignRequest;
import hello.wouldyoulist.domain.dto.SignResponse;
import hello.wouldyoulist.repository.UserRepository;
import hello.wouldyoulist.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@Transactional
@RequiredArgsConstructor
public class SignService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public SignResponse login(SignRequest request) throws Exception {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() ->
                new BadCredentialsException("잘못된 계정정보입니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("잘못된 계정정보입니다.");
        }

        return SignResponse.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .username(user.getUsername())
                .userPhotoId(user.getUserPhotoId())
                .roles(user.getRoles())
                .token(jwtProvider.createToken(user.getEmail(), user.getRoles()))
                .build();
    }

    public boolean register(SignRequest request) throws Exception {
        try {
            User user = User.builder()
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .username(request.getUsername())
                    .userPhotoId(request.getUserPhotoId())
                    .build();

            user.setRoles(Collections.singletonList(Authority.builder().role("ROLE_USER").build()));

            userRepository.save(user);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new Exception("잘못된 요청입니다.");
        }
        return true;
    }

    public SignResponse getUser(String email) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("계정을 찾을 수 없습니다."));
        return new SignResponse(user);
    }
}

