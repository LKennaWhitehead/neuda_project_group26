package com.example.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Customer;
import com.example.backend.model.Question;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.repository.QuestionRepository;

@RestController
@RequestMapping(path = "/customer")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping("/{customerId}")
    public Customer getCustomerById(@PathVariable String customerId) {
        List<Customer> customers = getAllCustomers();
        for (Customer customer : customers) {
            if (customer.getCustomerId().equals(customerId)) {
                return customer;
            }
        }
        return null;
    }

    @PostMapping("/{customerId}/raise")
    public void raiseQuestion(@PathVariable String customerId, @RequestParam String questionText, 
                                @RequestParam String customerName, @RequestParam String email) {
        Customer customer = new Customer(customerName, email);
        customerRepository.save(customer);
        Question question = new Question(customerId, questionText);
        questionRepository.save(question);
    }

    /* 
    @PostMapping("/{customerId}/resolve")
    public void resolveQuestion(@PathVariable String customerId, @RequestParam String questionText) {
        List<Question> questions = questionRepository.findAll();
        for (Question question : questions) {
            if (question.getQuestionerId().equals(customerId) && question.getQuestion().equals(questionText) && question.getAnswer() != null) {
                //question.solved(); 
                questionRepository.save(question);
                break;
            }
        }
    }*/

    @GetMapping("/{customerId}/status")
    //customer Id = questionerId
    public String getStatus(@PathVariable String customerId, @ RequestParam String questionText) {
        List<Question> questions = questionRepository.findAll();
        for (Question question : questions) {
            if (question.getQuestionerId().equals(customerId) && question.getQuestion().equals(questionText)) {
                return question.getStatus();
            }
        }
        return "Question does not exist";
    }
}
