package com.phuong.controller;

import com.phuong.dto.ProductDto;
import com.phuong.model.Product;
import com.phuong.service.IProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public ResponseEntity<?> createNewProduct(@Valid @RequestBody ProductDto productDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldError(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        Product product = new Product();
        BeanUtils.copyProperties(productDto, product);
        this.productService.save(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @RequestMapping(value = "/product/edit", method = RequestMethod.POST)
    public ResponseEntity<?> updateProduct(@Valid @RequestBody ProductDto productDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldError(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        Product product = new Product();
        BeanUtils.copyProperties(productDto, product);
        this.productService.save(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/product/page", method = RequestMethod.GET)
    public ResponseEntity<Page<Product>> getAllPageProducts(@PageableDefault(value = 9) Pageable pageable,
                                                            @RequestParam("categoryId") String id) {
        Page<Product> productPage = this.productService.findAll(pageable, id);
        if (productPage.hasContent()) {
            return new ResponseEntity<>(productPage, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/product/list", method = RequestMethod.GET)
    public ResponseEntity<List<Product>> getAllListProducts() {
        List<Product> productList = this.productService.findAll();
        if (productList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @RequestMapping(value = "/product/detail/{id}", method = RequestMethod.GET)
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Product product = this.productService.findById(id);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

}
