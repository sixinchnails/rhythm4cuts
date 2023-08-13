package com.b109.rhythm4cuts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class Rhythm4cutsApplication {

	public static void main(String[] args) {
		SpringApplication.run(Rhythm4cutsApplication.class, args);
	}

}
