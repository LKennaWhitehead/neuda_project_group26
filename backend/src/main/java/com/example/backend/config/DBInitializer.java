package com.example.backend.config;


import com.example.backend.model.Customer;
import com.example.backend.model.Employee;
import com.example.backend.model.Question;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.repository.QuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DBInitializer {
    @Bean
    CommandLineRunner initCu(CustomerRepository customerRepository) {
        return args -> {
            var customers = List.of(
                    new Customer("Alice", "Alice@gmail.com"),
                    new Customer("Bob", "Bob@gmail.com"),
                    new Customer("Carl", "Carl@gmail.com")
            );
            customerRepository.saveAll(customers);
        };
    }

    @Bean
    CommandLineRunner initEm(EmployeeRepository employeeRepository) {
        return args -> {
            var employees = List.of(
                    new Employee("Dora", "Dora@gmail.com"),
                    new Employee("Earl", "Earl@gmail.com"),
                    new Employee("Fazal", "Fazal@gmail.com")
            );
            employeeRepository.saveAll(employees);
        };
    }

    @Bean
    CommandLineRunner initQu(QuestionRepository questionRepository) {
        return args -> {
            var questions = List.of(
                    new Question("CU1","EM1","How to register")
            );
            questionRepository.saveAll(questions);
        };
    }
}
