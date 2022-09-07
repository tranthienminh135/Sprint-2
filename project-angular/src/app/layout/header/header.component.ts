import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {LogoutService} from '../../user/service/logout.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthService} from '../../user/service/auth.service';
import {CommonService} from '../../user/service/common.service';
import {CustomerService} from '../../user/service/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public role: string;
  public username: string = '';
  public loginStatus: any;
  messageReceived: any;
  private subscriptionName: Subscription;
  public buttonLogoutStatus: boolean = true;
  public infoStatus: boolean = true;

  constructor(private logoutService: LogoutService,
              private toastrService: ToastrService,
              private router: Router,
              private authService: AuthService,
              private commonService: CommonService,
              private userService: CustomerService) {
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
    this.subscriptionName = this.commonService.getUpdate().subscribe(message => {
      this.messageReceived = message;
      this.authService.checkLogin().subscribe(value => {
        this.loginStatus = value;
        if (value) {
          this.authService.getRoles().subscribe(resp => {
            this.getRole(resp);
            this.getCustomerByUsername(resp.username);
          }, error => {
          });
        }
      }, error => {
      });
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

  getCustomerByUsername(username: string) {
    this.userService.getCustomerByUsername(username).subscribe(value => {
      if (value == null) {
        this.infoStatus = false;
      } else {
        this.infoStatus = value.appUser.status;
      }
      console.log(this.infoStatus);
    });
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

  onLogout() {
    this.buttonLogoutStatus = false;
    this.logoutService.onLogout().subscribe(() => {
      setTimeout(()=>{
        this.router.navigateByUrl("/login").then(() => {
          this.toastrService.success("Đăng xuất thành công!")
          this.buttonLogoutStatus = true;
        })
        this.infoStatus = true;
        this.sendMessage();
      }, 2000)
    }, error => {
      setTimeout(()=>{
        this.router.navigateByUrl("/login").then(() => {
          this.toastrService.warning("Có vẻ như bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại!")
          this.buttonLogoutStatus = true;
        })
        this.infoStatus = true;
        this.sendMessage();
      }, 2000)

    }, () => {
    });
  }

  ngOnDestroy(): void {
    this.subscriptionName.unsubscribe();
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.commonService.sendUpdate('Đăng Xuất thành công!');
  }
}
