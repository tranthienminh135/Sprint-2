package com.phuong.controller;

import com.phuong.dto.ProductDto;
import com.phuong.model.Product;
import com.phuong.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class ProductRestController {

    @Autowired
    private IProductService productService;

    @GetMapping(value = "/new/products")
    public ResponseEntity<List<Product>> getNewProducts() {
        List<Product> productList = this.productService.getNewProducts();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @RequestMapping(value = "/product/create", method = RequestMethod.POST)
    public ResponseEntity<?> createNewProduct(@RequestBody ProductDto productDto) {
        System.out.println(productDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
