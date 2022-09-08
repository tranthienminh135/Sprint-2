package com.phuong.service.impl;

import com.phuong.dto.ErrorDto;
import com.phuong.model.Customer;
import com.phuong.model.ProductOrder;
import com.phuong.repository.ICustomerRepository;
import com.phuong.repository.IProductOrderRepository;
import com.phuong.repository.IProductRepository;
import com.phuong.service.IProductOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductOrderService implements IProductOrderService {
    @Autowired
    private IProductOrderRepository productOrderRepository;

    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private ICustomerRepository customerRepository;

    @Override
    public ErrorDto saveOrder(ProductOrder productOrder) {
        ErrorDto errorDto = new ErrorDto();
        productOrder.setIsDeleted(false);
        ProductOrder po = this.productOrderRepository.findProductOrderListByCustomerAndProduct(productOrder);
        if (po == null) {
            if (productOrder.getQuantity() > productOrder.getProduct().getQuantity()) {
                errorDto.setMessage("quantity");
                errorDto.setProductOrder(po);
                return errorDto;
            } else {
                this.productOrderRepository.save(productOrder);
            }
        } else {
            if ((po.getQuantity() + productOrder.getQuantity()) > productOrder.getProduct().getQuantity()) {
                errorDto.setMessage("quantity");
                errorDto.setProductOrder(po);
                return errorDto;
            } else {
                po.setQuantity(productOrder.getQuantity() + po.getQuantity());
                this.productOrderRepository.save(po);
            }
        }
        return errorDto;
    }

    @Override
    public List<ProductOrder> getProductInCardByCustomer(Customer customer) {
        return this.productOrderRepository.getProductInCardByCustomer(customer);
    }

    @Override
    public Boolean minusQuantity(ProductOrder productOrder) {
        if (productOrder.getQuantity() > 1) {
            productOrder.setQuantity(productOrder.getQuantity() - 1);
            this.productOrderRepository.save(productOrder);
            return true;
        }
        return false;
    }

    @Override
    public Boolean plusQuantity(ProductOrder productOrder) {
        if (productOrder.getQuantity() < productOrder.getProduct().getQuantity()) {
            productOrder.setQuantity(productOrder.getQuantity() + 1);
            this.productOrderRepository.save(productOrder);
            return true;
        }
        return false;
    }

    @Override
    public Boolean findProductOrder(ProductOrder productOrder) {
        ProductOrder po = this.productOrderRepository.findById(productOrder.getId()).orElse(null);
        if (po != null) {
            this.productOrderRepository.delete(productOrder);
            return true;
        }
        return false;
    }
}
