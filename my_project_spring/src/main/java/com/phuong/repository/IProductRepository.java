package com.phuong.repository;

import com.phuong.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = " SELECT * FROM product where is_deleted = 0 order by release_time desc limit 8 ", nativeQuery = true)
    List<Product> getNewProducts();

    @Query(value = " select p.* from product p " +
            " join category c on c.id = p.category_id" +
            " where c.id = :id ", nativeQuery = true)
    List<Product> findByCategoryId(@Param("id") Integer id);

    @Query(value = " select * from product " +
            " left join category c on c.id = product.category_id " +
            " where category_id like :id ", nativeQuery = true)
    Page<Product> findAll(Pageable pageable,@Param("id") String id);
}
