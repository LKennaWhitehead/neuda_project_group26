package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Customer extends Person{
    @Id
    private String customerId;
    private static int idCounter = 0;

    public Customer(String name, String email){
        super(name, email);
        generateId();
    }

    public Customer() {
    }


    public void generateId() {
        customerId = "CU" + (idCounter++);
    }

    public String getCustomerId() {
        return customerId;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "CustomerId='" + customerId + '\'' +
                ", idCounter=" + idCounter +
                '}';
    }

}
