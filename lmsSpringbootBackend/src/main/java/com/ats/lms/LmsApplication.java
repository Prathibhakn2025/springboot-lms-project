package com.ats.lms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class LmsApplication {

	 private static final Logger log =
	            LoggerFactory.getLogger(LmsApplication.class);
	 
	public static void main(String[] args) {
		SpringApplication.run(LmsApplication.class, args);
		 log.info("welcome jyothi LMS");
	}

}
