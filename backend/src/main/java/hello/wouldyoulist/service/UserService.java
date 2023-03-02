package hello.wouldyoulist.service;

import hello.wouldyoulist.domain.User;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {
    public User join(User user){
        validateDupicateUser(user);

        return user;
    }

    public void validateDuplicateUser(User user){

    }
}
