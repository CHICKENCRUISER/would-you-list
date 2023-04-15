package hello.wouldyoulist.controller;

import hello.wouldyoulist.domain.dto.MemberSignUpRequestDto;
import hello.wouldyoulist.repository.MemberRepository;
import hello.wouldyoulist.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/member")
@RestController
public class MemberController {
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    @PostMapping("/join")
    @ResponseStatus(HttpStatus.OK)
    public Long join(@Valid @RequestBody MemberSignUpRequestDto request) throws Exception{
        return memberService.signUp(request);
    }

}
