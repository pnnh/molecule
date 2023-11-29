package com.huable.venus;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String index() {
        var a = 7;
        return "Greetings from Spring Boot!  " + a;
    }

}