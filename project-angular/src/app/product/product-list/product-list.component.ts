import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Category} from '../model/category';
import {CategoryService} from '../service/category.service';
import {AuthService} from '../../user/service/auth.service';
import {ProductOrder} from '../model/productOrder';

declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  public role: string;
  public username: string = '';
  public loginStatus: any;
  productOrders: ProductOrder[] = [];

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private authService: AuthService,
              private toastrService: ToastrService,
              private activatedRoute: ActivatedRoute) {
    $('#product-list').attr('class', 'nav-item nav-link active');
    this.authService.checkLogin().subscribe(value => {
      this.loginStatus = value;
      if (value) {
        this.authService.getRoles().subscribe(resp => {
          this.getRole(resp);
        }, error => {
        });
      }
    }, error => {
    });
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
    this.getAllCategories();
    this.activatedRoute.paramMap.subscribe(value => {
      if (value.get('id') != null) {
        this.loadProductByCategory(value.get('id'));
      } else {
        this.loadProductByCategory('');
      }
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategoriesList().subscribe(value => {
      // @ts-ignore
      this.categories = value;
    });
  }

  getAllProductPage(pageNumber: number, categoryId: string) {
    this.productService.getAllPageProducts(pageNumber, categoryId).subscribe(value => {
      if (value != null) {
        // @ts-ignore
        if (value.totalElements >= 0) {
          // @ts-ignore
          this.products = value.content;
        }
      } else {
        this.products = [];
      }
    });
  }

  ngOnDestroy(): void {
    $('#product-list').attr('class', 'nav-item nav-link');
  }

  loadProductByCategory(id: string) {
    $('[data-toggle="reset-active-category"]').attr('class', 'nav-item nav-link');
    $('#category' + id).attr('class', 'nav-item nav-link active');
    this.getAllProductPage(0, String(id));
  }

  addToCart(product: Product) {
    if (this.loginStatus) {

    }
  }
}
