package com.phuong.service;

import com.phuong.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
    List<Product> getNewProducts();

    void save(Product product);

    Page<Product> findAll(Pageable pageable, String id);

    Product findById(String id);

    List<Product> findByCategoryId(Integer id);

    List<Product> findAll();
}
