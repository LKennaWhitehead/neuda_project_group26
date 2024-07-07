package com.example.backend.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Employee extends Person {

    private static int idCounter = 0;

    @Id
    private String employeeId;

    @ElementCollection
    @CollectionTable(name = "employeeQuestions", joinColumns = @JoinColumn(name = "employeeId"))
    @Column(name = "question")
    private List<String> questions = new ArrayList<>();

    public Employee(String name, String email) {
        super(name, email);
        generateId();
    }

    public Employee() {}

    @Override
    public void generateId() {
        this.employeeId = "EM" + (idCounter++);
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

    public String getEmployeeId() {
        return employeeId;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "employeeId='" + employeeId + '\'' +
                ", name='" + getName() + '\'' +
                ", email='" + getEmail() + '\'' +
                ", questions=" + questions +
                '}';
    }
}
