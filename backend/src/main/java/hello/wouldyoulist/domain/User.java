package hello.wouldyoulist.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String username;
    private String password;
    private Long userPhotoId;

//    @JsonBackReference
//    @OneToMany(mappedBy = "user")
//    private List<Todo> todos;
}
