package com.example.backend.Controller;

import com.example.backend.model.Employee;
import com.example.backend.model.Question;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/employee")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @PostMapping("/{employeeId}/answer")
    public void answerQuestion(@PathVariable String employeeId, @RequestParam String questionText, @RequestParam String answer) {
        List<Question> questions = questionRepository.findAll();
        for (Question question : questions) {
            if (question.getAssigneeId().equals(employeeId) && question.getQuestion().equals(questionText)) {
                question.setAnswer(answer);
                questionRepository.save(question);
                break;
            }
        }
    }
}
