package hello.wouldyoulist.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String todoName;
    private String planDate;
    private String category;
    private String todoContent;
    private Boolean state;

    @JsonManagedReference
    @OneToOne
    @JoinColumn(name = "review_id")
    private Review review;

    private String user;
//    @JsonManagedReference
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

    //기본값 세팅 로직
    @PrePersist
    public void prePersist() {
        this.state = this.state == null ? false : this.state;
    }
}
