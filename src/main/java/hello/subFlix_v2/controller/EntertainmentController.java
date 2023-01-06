package hello.subFlix_v2.controller;

import hello.subFlix_v2.domain.Entertainment;
import hello.subFlix_v2.service.EntertainmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class EntertainmentController {

    private final EntertainmentService entertainmentService;

    @Autowired
    public EntertainmentController(EntertainmentService entertainmentService) {
        this.entertainmentService = entertainmentService;
    }

    @GetMapping(value = "/entertainments/new")
    public String createForm() {
        return "entertainments/createEntertainmentForm";
    }

    @PostMapping(value = "/entertainments/new")
    public String create(EntertainmentForm form) {
        Entertainment entertainment = new Entertainment();
        entertainment.setTitle(form.getTitle());

        entertainmentService.join(entertainment);

        return "redirect:/";
    }

    @GetMapping(value = "/entertainments")
    public String list(Model model) {
        List<Entertainment> entertainments = entertainmentService.findEntertainments();
        model.addAttribute("entertainments", entertainments);
        return "entertainments/entertainmentList";
    }
}
