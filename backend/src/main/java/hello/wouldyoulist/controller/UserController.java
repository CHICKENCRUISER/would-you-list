package hello.wouldyoulist.controller;
//
//@Controller
//@RequiredArgsConstructor
//@RequestMapping("/members")
//public class userController {
//    private final UserRepository userRepository;
////    @GetMapping("/add")
////    public String addForm(@ModelAttribute("member") Member member) {
////        return "members/addMemberForm";
////    }
//    @PostMapping("/add")
//    public String save(@ModelAttribute User user, BindingResult
//            result) {
//        if (result.hasErrors()) {
//            return "members/addMemberForm";
//        }
//        userRepository.save(user);
//        return "redirect:/";
//    }
//}
//

import hello.wouldyoulist.domain.User;
import hello.wouldyoulist.jwt.JwtTokenProvider;
import hello.wouldyoulist.jwt.TokenInfo;
import hello.wouldyoulist.jwt.UserLoginRequestDto;
import hello.wouldyoulist.repository.UserRepository;
import hello.wouldyoulist.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class UserController {

    private final UserService userService;

    final String EMAIL = "aabbcc@gmail.com";
    final String PASSWORD = "abcd0000";
    final String USERNAME = "침착맨";
    final Long USERPHOTOID = 1L;

    User user = User.builder()
            .email(EMAIL)
            .password(PASSWORD)
            .username(USERNAME)
            .userPhotoId(USERPHOTOID)
            .roles(Collections.singletonList("ROLE_USER")) // 최초 가입시 USER 로 설정
            .build();


    @PostMapping("/login")
    public TokenInfo login(@RequestBody UserLoginRequestDto memberLoginRequestDto) {
        String memberId = memberLoginRequestDto.getEmail();
        String password = memberLoginRequestDto.getPassword();
        TokenInfo tokenInfo = userService.login(memberId, password);
        return tokenInfo;
    }
}


