package com.phuong.controller;

import com.phuong.dto.ErrorDto;
import com.phuong.model.Customer;
import com.phuong.model.ProductOrder;
import com.phuong.service.IProductOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class ProductOrderController {

    @Autowired
    private IProductOrderService productOrderService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/add/cart")
    public ResponseEntity<?> addToCart(@RequestBody ProductOrder productOrder) {
        ErrorDto err = this.productOrderService.saveOrder(productOrder);

        if (err.getMessage() != null) {
            return new ResponseEntity<>(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(productOrder ,HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/cart/minus/quantity")
    public ResponseEntity<?> minusQuantityCart(@RequestBody ProductOrder productOrder) {
        List<ProductOrder> productOrderList = this.productOrderService.getProductInCardByCustomer(productOrder.getCustomer());
        Boolean check = this.productOrderService.minusQuantity(productOrder);
        if (check) {
            return new ResponseEntity<>(productOrderList, HttpStatus.OK);
        }
        ErrorDto errorDto = new ErrorDto();
        errorDto.setMessage("minimum");
        return new ResponseEntity<>(errorDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/cart/plus/quantity")
    public ResponseEntity<?> plusQuantityCart(@RequestBody ProductOrder productOrder) {
        List<ProductOrder> productOrderList = this.productOrderService.getProductInCardByCustomer(productOrder.getCustomer());
        Boolean check = this.productOrderService.plusQuantity(productOrder);
        if (check) {
            return new ResponseEntity<>(productOrderList, HttpStatus.OK);
        }
        ErrorDto errorDto = new ErrorDto();
        errorDto.setMessage("maximum");
        return new ResponseEntity<>(errorDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/cart/delete")
    public ResponseEntity<?> deleteProductInCart(@RequestBody ProductOrder productOrder) {
        Boolean check = this.productOrderService.findProductOrder(productOrder);
        if (check) {
            List<ProductOrder> productOrderList = this.productOrderService.getProductInCardByCustomer(productOrder.getCustomer());
            return new ResponseEntity<>(productOrderList, HttpStatus.OK);
        }
        ErrorDto errorDto = new ErrorDto();
        errorDto.setMessage("notfound");
        return new ResponseEntity<>(errorDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/cart/products")
    public ResponseEntity<?> getProductInCard(@RequestBody Customer customer) {
        List<ProductOrder> productOrderList = this.productOrderService.getProductInCardByCustomer(customer);
        if (productOrderList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productOrderList ,HttpStatus.OK);
    }
}
