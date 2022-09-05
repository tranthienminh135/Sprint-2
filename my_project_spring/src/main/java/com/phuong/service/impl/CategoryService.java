package com.phuong.service.impl;

import com.phuong.model.Category;
import com.phuong.repository.ICategoryRepository;
import com.phuong.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return this.categoryRepository.getAllCategory();
    }
}
