// package com.example.backend.model;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Id;

// @Entity
// public class Question {
//     private String questionerId;
//     @Id
//     private String question;
//     private String answer;
//     private Boolean solved;

//     public Question(String questionerId, String question) {
//         this.questionerId = questionerId;
//         this.question = question;
//         solved = false;
//     }

//     public Question() {

//     }

//     public void setAnswer(String answer) {
//         solved = true;
//         this.answer = answer;
//     }

//     public String getQuestionerId() {
//         return questionerId;
//     }

//     public String getQuestion() {
//         return question;
//     }

//     public String getAnswer() {
//         return answer;
//     }

//     public String getStatus() {
//         return solved? "Solved" : "In Progress";
//     }
// }

package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // New unique identifier field

    private String questionerId;
    private String question;
    private String answer;
    private Boolean solved;

    public Question(String questionerId, String question) {
        this.questionerId = questionerId;
        this.question = question;
        this.solved = false;
    }

    public Question() {
        // Default constructor
    }

    // Getters and setters for new id field
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Existing getters and setters
    public void setAnswer(String answer) {
        this.solved = true;
        this.answer = answer;
    }

    public String getQuestionerId() {
        return questionerId;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public Boolean getSolved() {
        return solved;
    }

    public void setSolved(Boolean solved) {
        this.solved = solved;
    }

    public String getStatus() {
        return solved ? "Solved" : "In Progress";
    }
}
