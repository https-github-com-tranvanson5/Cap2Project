package com.example.backend;

import org.springframework.boot.SpringApplication;
<<<<<<< Updated upstream
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
=======
>>>>>>> Stashed changes
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}

}
