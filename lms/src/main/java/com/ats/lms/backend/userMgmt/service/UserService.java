package com.ats.lms.backend.userMgmt.service;

import com.ats.lms.backend.userMgmt.entity.PasswordResetOtp;
import com.ats.lms.backend.userMgmt.entity.Role;

import com.ats.lms.backend.userMgmt.entity.User;
import com.ats.lms.backend.userMgmt.repo.PasswordResetOtpRepository;
import com.ats.lms.backend.userMgmt.repo.RoleRepository;
import com.ats.lms.backend.userMgmt.repo.UserRepository;
import com.ats.lms.backend.utility.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private PasswordResetOtpRepository otpRepository;


	public User registerUser(User user) {

		// encrypt password
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		// assign ROLE_USER
		Role roleUser = roleRepository.findByName("ROLE_USER")
				.orElseThrow(() -> new RuntimeException("ROLE_USER not found"));

		Set<Role> roles = new HashSet<>();
		roles.add(roleUser);
		user.setRoles(roles);

		// save user
		User savedUser = userRepository.save(user);

		// send mail
		emailService.sendThankYouMail(savedUser.getEmail(), savedUser.getUsername());

		return savedUser;
	}

	public void deleteUserById(Long id) {

		// check if user exists
		User user = userRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("User not found with id: " + id));

		// delete user
		userRepository.delete(user);

	}

	
//	public User getUserById(Long id) {
//
//		return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
//	}
	
	public User getUserById(Long id) {
	    return userRepository.findById(id).orElse(null);
	}



	
	
	public User updateUser(Long id, User updatedUser) {

		User existingUser = userRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("User not found with id: " + id));

		// update allowed fields
		existingUser.setUsername(updatedUser.getUsername());
		existingUser.setEmail(updatedUser.getEmail());

		// update password only if provided
		if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
			existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
		}

		return userRepository.save(existingUser);
	}
	
	
	public List<User> getAllUsersWithUserRole() {
        return userRepository.findByRoles_Name("ROLE_USER"); // only ROLE_USER
    }
	
	

	public User login(String email, String rawPassword) {

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("Invalid email"));

	    System.out.println("RAW password from request: " + rawPassword);
	    System.out.println("ENC password from DB: " + user.getPassword());

	    if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
	        throw new RuntimeException("Invalid password");
	    }

	    return user;
	}

	
	//FORGOT PASSWORD 

	public void sendForgotPasswordOtp(String email) {

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    String otp = String.valueOf(new Random().nextInt(900000) + 100000);

	    PasswordResetOtp resetOtp = new PasswordResetOtp();
	    resetOtp.setEmail(email);
	    resetOtp.setOtp(otp);
	    resetOtp.setVerified(false);
	    resetOtp.setExpiryTime(LocalDateTime.now().plusMinutes(5));

	    otpRepository.save(resetOtp);

	    emailService.sendOtpEmail(email, otp);
	}

	
	public void verifyOtp(String email, String otp) {

	    PasswordResetOtp resetOtp = otpRepository
	            .findByEmailAndOtp(email, otp)
	            .orElseThrow(() -> new RuntimeException("Invalid OTP"));

	    if (resetOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
	        throw new RuntimeException("OTP expired");
	    }

	    resetOtp.setVerified(true);
	    otpRepository.save(resetOtp);
	}

	
	public void resetPassword(String email, String newPassword) {

	    PasswordResetOtp resetOtp = otpRepository
	            .findTopByEmailOrderByExpiryTimeDesc(email)
	            .orElseThrow(() -> new RuntimeException("OTP not found"));

	    if (!resetOtp.isVerified()) {
	        throw new RuntimeException("OTP not verified");
	    }

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    user.setPassword(passwordEncoder.encode(newPassword));
	    userRepository.save(user);
	}

	
}
