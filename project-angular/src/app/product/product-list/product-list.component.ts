import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Category} from '../model/category';
import {CategoryService} from '../service/category.service';
import {AuthService} from '../../user/service/auth.service';
import {ProductOrder} from '../model/productOrder';
import {Customer} from '../../user/model/customer';
import {CustomerService} from '../../user/service/customer.service';
import {CartService} from '../../user/service/cart.service';
import {CommonService} from '../../user/service/common.service';

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
  public totalProducts: number;
  customer: Customer;
  public infoStatus: boolean = true;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private authService: AuthService,
              private toastrService: ToastrService,
              private activatedRoute: ActivatedRoute,
              private customerService: CustomerService,
              private cartService: CartService,
              private commonService: CommonService) {
    $('#product-list').attr('class', 'nav-item nav-link active');
    this.authService.checkLogin().subscribe(value => {
      this.loginStatus = value;
      if (value) {
        this.authService.getRoles().subscribe(resp => {
          this.getCustomerByUsername(resp.username);
          this.getRole(resp);
        }, error => {});
      } else {

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
    this.productService.getAllListProducts().subscribe(value => {
      // @ts-ignore
      this.totalProducts = value.length;
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
    let productOrder: ProductOrder = {
      customer: this.customer,
      product: product,
      quantity: 1
    };
    this.cartService.addOrder(productOrder).subscribe((po: ProductOrder) => {
      this.toastrService.success("Thêm thành công sản phẩm " + po.product.name);
      this.sendMessage();
    }, error => {
      if (error.error.message == 'quantity') {
        this.toastrService.warning("Bạn đã thêm vượt quá số lượng sản phẩm!");
      }
    });
  }

  getCustomerByUsername(username: string) {
    this.customerService.getCustomerByUsername(username).subscribe(value => {
      this.customer = value;
      if (value == null) {
        this.infoStatus = false;
      } else {
        this.infoStatus = value.appUser.status;
      }
    });
  }

  sendMessage(): void {
    this.commonService.sendUpdate('Success!');
  }

  addToCartMessage() {
    this.toastrService.warning("Vui lòng đăng nhập để thực hiện chức năng này!");
  }

  updateInfoMessage() {
    this.router.navigateByUrl("/checkout").then(value => {
      this.toastrService.warning("Vui lòng cập nhật thông tin!");
    })
  }
}
