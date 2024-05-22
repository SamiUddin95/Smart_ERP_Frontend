import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonService } from '../service/common.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  constructor(private router: Router,private common : CommonService, private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService,private authService : AuthService) { }
  loginData: any = {};
  login() {
    this.api.login(this.loginData).subscribe(res=>{
      if(res.userType){
        const dataString = JSON.stringify(res.userType);
        localStorage.setItem("userType",dataString);
        this.router.navigate(['dashboard']); 
        this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Login successfully'});
      }
      else {
				this.messageService.add({ severity: 'error', summary: 'Error', detail: res.msg })
			}
    },err=>{
				this.messageService.add({ severity: 'error', summary: 'Error', detail: err.msg })
      
    })
    }

}
