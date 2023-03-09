//package hello.wouldyoulist.controller;
//
//import hello.wouldyoulist.domain.User;
//import hello.wouldyoulist.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Controller;
//import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//
////import javax.validation.Valid;
//
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
//
//
//
