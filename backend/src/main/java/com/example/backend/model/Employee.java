package com.example.backend.model;

import java.util.ArrayList;
import java.util.List;

public class Employee extends Person{
    private List<String> questions;

    public Employee() {
        super();
        questions = new ArrayList<String>();
    }

    public List<String> getQuestions() {
        return questions;
    }

    public void addQuestion(String question) {
        questions.add(question);
    }

    public int getNumQuestions() {
        return questions.size();
    }


}
