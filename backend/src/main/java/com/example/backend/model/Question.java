package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Question {
    private Long questionerId;
    private Long assigneeId;
    @Id
    private String question;
    private String answer;
    private Boolean solved;

    public Question(Long questionerId, Long assigneeId, String question) {
        this.questionerId = questionerId;
        this.assigneeId = assigneeId;
        this.question = question;
        solved = false;
    }

    public Question() {

    }

    public void solved() {
        solved = true;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Long getQuestionerId() {
        return questionerId;
    }

    public Long getAssigneeId() {
        return assigneeId;
    }

    public String getQuestion() {
        return question;
    }

    public Boolean getSolved() {
        return solved;
    }

    public String getAnswer() {
        return answer;
    }
}
