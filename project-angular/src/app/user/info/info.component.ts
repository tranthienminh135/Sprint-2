import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../product/service/product.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../product/service/category.service';
import {AuthService} from '../service/auth.service';
import {CustomerService} from '../service/customer.service';
import {Customer} from '../model/customer';

declare var $: any;

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit, OnDestroy {
  public role: string;
  public username: string = '';
  public loginStatus: any;
  customer: Customer;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private authService: AuthService,
              private userService: CustomerService) {
    this.authService.checkLogin().subscribe(value => {
      this.loginStatus = value;
      if (value) {
        this.authService.getRoles().subscribe(resp => {
          this.getCustomerByUsername(resp.username);
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

  ngOnDestroy(): void {
  }

  getCustomerByUsername(username: string) {
    this.userService.getCustomerByUsername(username).subscribe(value => {
      this.customer = value;
    });
  }
}
