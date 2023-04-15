package hello.wouldyoulist.service;

import hello.wouldyoulist.domain.dto.MemberSignUpRequestDto;

public interface MemberService {
    //회원가입
    public Long signUp(MemberSignUpRequestDto requestDto) throws Exception;
}
