import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../service/product.service';
import {Product} from '../model/product';
import {AuthService} from '../../user/service/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  public role: string;
  public username: string = '';
  public loginStatus: any;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private authService: AuthService) {
    this.activatedRoute.paramMap.subscribe(value => {
      this.findProductById(value.get("id"));
    })
    this.authService.checkLogin().subscribe(value => {
      this.loginStatus = value;
      if (value) {
        this.authService.getRoles().subscribe(resp => {
          this.getRole(resp);
        }, error => {
        });
      }
    }, error => {});
  }

  getRole(value: any) {
    if (this.isAdmin(value.grantList)) {
      this.role = 'ROLE_ADMIN';
    } else if (this.isUser(value.grantList)) {
      this.role = 'ROLE_USER';
    }
    this.username = value.username;
  }

  isAdmin(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'ROLE_ADMIN';
    });
  }

  isUser(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'ROLE_USER';
    });
  }

  ngOnInit(): void {
  }

  findProductById(id: string) {
    this.productService.findProductById(id).subscribe(value => {
      this.product = value;
    });
  }

}
