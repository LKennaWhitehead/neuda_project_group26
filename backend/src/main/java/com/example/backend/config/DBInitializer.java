package com.example.backend.config;


import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.backend.repository.CustomerRepository;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.repository.QuestionRepository;

@Configuration
public class DBInitializer {
    @Bean
    CommandLineRunner initCu(CustomerRepository customerRepository) {
        return args -> {
            // var customers = List.of(
            //         new Customer("Alice", "Alice@gmail.com"),
            //         new Customer("Bob", "Bob@gmail.com"),
            //         new Customer("Carl", "Carl@gmail.com")
            // );
            // customerRepository.saveAll(customers);
        };
    }

    @Bean
    CommandLineRunner initEm(EmployeeRepository employeeRepository) {
        return args -> {
            // var employees = List.of(
            //         new Employee("Dora", "Dora@gmail.com"),
            //         new Employee("Earl", "Earl@gmail.com"),
            //         new Employee("Fazal", "Fazal@gmail.com")
            // );
            // employeeRepository.saveAll(employees);
        };
    }

    @Bean
    CommandLineRunner initQu(QuestionRepository questionRepository) {
        return args -> {
        };
    }
}
