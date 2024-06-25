package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Question {
    private String questionerId;
    @Id
    private String question;
    private String answer;
    private Boolean solved;

    public Question(String questionerId, String question) {
        this.questionerId = questionerId;
        this.question = question;
        solved = false;
    }

    public Question() {

    }

    public void setAnswer(String answer) {
        solved = true;
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

    public String getStatus() {
        return solved? "Solved" : "In Progress";
    }
}
