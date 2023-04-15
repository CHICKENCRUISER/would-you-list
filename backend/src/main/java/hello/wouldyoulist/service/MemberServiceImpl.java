package hello.wouldyoulist.service;

import hello.wouldyoulist.domain.Member;
import hello.wouldyoulist.domain.dto.MemberSignUpRequestDto;
import hello.wouldyoulist.repository.MemberRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Transactional(readOnly=true)
@Service
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public Long signUp(MemberSignUpRequestDto requestDto) throws Exception{
        if(memberRepository.findByEmail(requestDto.getEmail()).isPresent()){
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if(!requestDto.getPassword().equals(requestDto.getCheckedPassword())){
            throw new Exception("비밀번호가 일치하지 않습니다.");
        }

        Member member = memberRepository.save(requestDto.toEntity());
        member.encodePassword(passwordEncoder);

        //member.addUserAuthority(); //이게 없는데?
        return member.getId();
    }
}
