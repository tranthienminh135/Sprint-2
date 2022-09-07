package com.phuong.controller;

import com.phuong.model.Customer;
import com.phuong.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class CustomerRestController {

    @Autowired
    private ICustomerService customerService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/get/customer/{username}")
    public ResponseEntity<Customer> getCustomerByUsername(@PathVariable String username) {
        Customer customer = this.customerService.getCustomerByUsername(username);
        if (customer == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(customer,HttpStatus.OK);
    }
}
