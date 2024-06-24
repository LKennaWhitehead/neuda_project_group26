package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Customer extends Person{
    @Id
    private String CustomerId;
    private int idCounter = 0;

    public Customer(String name, String email){
        super(name, email);
        generateId();
    }

    public Customer() {
    }


    public void generateId() {
        CustomerId = "CU" + idCounter++;
    }

    public String getCustomerId() {
        return CustomerId;
    }
}
