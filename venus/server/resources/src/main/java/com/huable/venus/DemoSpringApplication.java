package com.huable.venus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.huable.venus.services.DataSourceConfig;

@SpringBootApplication
public class DemoSpringApplication {

    public static void main(String[] args) {
        // ApplicationContext context = new
        // AnnotationConfigApplicationContext(DataSourceConfig.class);
        SpringApplication.run(DemoSpringApplication.class, args);
    }

}
