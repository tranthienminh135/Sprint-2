package com.phuong.service.impl;

import com.phuong.model.Product;
import com.phuong.repository.IProductRepository;
import com.phuong.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {

    @Autowired
    private IProductRepository productRepository;

    @Override
    public List<Product> getNewProducts() {
        return this.productRepository.getNewProducts();
    }
}
