package com.phuong.service;

import com.phuong.dto.ErrorDto;
import com.phuong.model.Customer;
import com.phuong.model.ProductOrder;

import java.util.List;

public interface IProductOrderService {
    ErrorDto saveOrder(ProductOrder productOrder);

    List<ProductOrder> getProductInCardByCustomer(Customer customer);

    Boolean minusQuantity(ProductOrder productOrder);

    Boolean plusQuantity(ProductOrder productOrder);

    Boolean findProductOrder(ProductOrder productOrder);
}
