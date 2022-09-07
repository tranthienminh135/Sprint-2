package com.phuong.service.impl;

import com.phuong.model.Customer;
import com.phuong.repository.ICustomerRepository;
import com.phuong.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService implements ICustomerService {

    @Autowired
    private ICustomerRepository customerRepository;

    @Override
    public Customer getCustomerByUsername(String username) {
        return this.customerRepository.getCustomerByUsername(username);
    }
}
