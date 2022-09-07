package com.phuong.service;

import com.phuong.model.Customer;

public interface ICustomerService {
    Customer getCustomerByUsername(String username);
}
