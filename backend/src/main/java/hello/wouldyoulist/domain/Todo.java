package hello.wouldyoulist.domain;

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

    private String user;
    private String name;
    private String date;
    private String category;
    private String content;
    private Boolean state;

    @JsonManagedReference
    @OneToOne(mappedBy = "todo")
    private Review review;

    //기본값 세팅 로직
    @PrePersist
    public void prePersist() {
        this.state = this.state == null ? false : this.state;
    }
}
