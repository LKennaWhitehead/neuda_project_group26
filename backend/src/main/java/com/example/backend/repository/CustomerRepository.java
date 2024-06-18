package com.example.backend.repository;

import com.example.backend.model.Customer;
import com.example.backend.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
