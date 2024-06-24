package com.example.backend.model;

import jakarta.persistence.*;

@MappedSuperclass
public abstract class Person {

    private String name;
    private String email;

    public Person() {}

    public Person(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public abstract void generateId();

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

//package com.example.backend.model;
//
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.MappedSuperclass;
//
//@MappedSuperclass
//public abstract class Person {
//
//
//    private String name;
//    private String email;
//
//    // Constructors, getters, and setters
//
//    public Person() {}
//
//    public Person(String name, String email) {
//        this.name = name;
//        this.email = email;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//}