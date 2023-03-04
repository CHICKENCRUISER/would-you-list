package hello.wouldyoulist.controller;

import hello.wouldyoulist.domain.User;
import hello.wouldyoulist.domain.UserForm;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/home")
    public String home() {
        return "home";
    }

    // 회원가입
    // https://velog.io/@qodlstjd12/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Step-2-Mysql-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0

//    @PostMapping("/users/new")
//    public String register(@ModelAttribute UserForm form){
//        User user= new User();
//        user.setEmail(form.getEmail());
//        user.setPassword(form.getPassword());
//        user.setName(form.getName());
//        user.setUserPhotoId(form.getUserPhotoId());
//        userService.join(user);
//        return "hello";
    }

