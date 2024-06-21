import { Component } from '@angular/core';
import { ApiService } from './service/api.service';
import { DatePipe } from '@angular/common';
import { CommonService } from './service/common.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { flush } from '@angular/core/testing';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn:boolean=false;
  constructor(private router: Router,private messageService: MessageService,private api: ApiService,private datePipe: DatePipe,private common : CommonService,private authService: AuthService) { }  
  
  title = 'BMSFrontEnd';
  sidebarActive: boolean = false;
  currentDateTime: any = '';
  ngOnInit(): void {
    this.openAside=true;
    setInterval(() => {
      this.currentDateTime = this.datePipe.transform(new Date(), 'EEE dd-MMMM-yyyy hh:mm:ss a');
  }, 1000);
  this.sidebarActive=true

  }
  loginData: any = {};
  login() {
    this.api.login(this.loginData).subscribe(res=>{
      if(res.userType){
        const dataString = JSON.stringify(res.userType);
        localStorage.setItem("userType",dataString);
        this.router.navigate(['dashboard']);
        this.isLoggedIn=true;
        this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Login successfully'});
      }
      else {
				this.messageService.add({ severity: 'error', summary: 'Error', detail: res.msg })
			}
    },err=>{
				this.messageService.add({ severity: 'error', summary: 'Error', detail: err.msg })
      
    })
    }

    logout() {
      localStorage.removeItem("userType");
      this.router.navigate(['login']);
      this.isLoggedIn = false;
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Logged out successfully' });
    }
  closeAside:boolean=false;
  openAside:boolean=false;
  closeSideBar(){
      this.closeAside=true;
      this.openAside=false;
      this.common.closeSidebar();
  }
  openSideBar(){
      this.closeAside=false;
      this.openAside=true;
      this.common.openSidebar();
  }

  //loginData1 = { Password: '' };
    passwordFieldType = 'password'; // Initially set to password type

    togglePasswordVisibility(): void {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }
}
