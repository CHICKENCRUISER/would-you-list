package hello.wouldyoulist.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(mappedBy = "review")
    private Todo todo;

    private Long photoId;
    private String doneDate;
    private String title;
    private String review;
    private String place;
    private String expression;

}
