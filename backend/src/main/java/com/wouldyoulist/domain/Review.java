package src.main.java.com.wouldyoulist.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "todo_id")
    private Todo todo;

    private Long photoId;
    private String doneDate;
    private String title;
    private String review;
    private String place;
    private String expression;

}
