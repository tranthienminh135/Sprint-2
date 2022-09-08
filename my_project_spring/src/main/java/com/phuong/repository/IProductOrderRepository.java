package com.phuong.repository;

import com.phuong.model.Customer;
import com.phuong.model.ProductOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IProductOrderRepository extends JpaRepository<ProductOrder, Integer> {

    @Query(value = " select po.* from product_order po " +
            " join customer c on c.id = po.customer_id " +
            " join product p on p.id = po.product_id " +
            " where po.customer_id = :#{#productOrder.customer.id} and po.product_id = :#{#productOrder.product.id} and po.bill_id is null ", nativeQuery = true)
    ProductOrder findProductOrderListByCustomerAndProduct(ProductOrder productOrder);

    @Query(value = " select po.* from product_order po " +
            " join customer c on c.id = po.customer_id " +
            " join product p on p.id = po.product_id " +
            " where po.customer_id = :#{#customer.id} and bill_id is null ", nativeQuery = true)
    List<ProductOrder> getProductInCardByCustomer(Customer customer);
}
