import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  formData: any = {  };
  userTypes:any=[];
  genders:any=[{label:'Male',value:'Male'},{label:'Female',value:'Female'}];
  urlId: any;
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id'); 
    this.getAccountType();
    this.getUserGroup();
    this.getAccCat();
    if (this.urlId) {
      this.getUserById(this.urlId);
    }
	}
  getUserById(id: any) {
		this.api.getAccountById(String(id)).subscribe(res => {
			this.formData = res[0];
		})
	}
  cancel(){
    this.router.navigate(['account-list']);
  }
  addUser(){
  if(this.formData.taxLimit>this.formData.taxAmount){
		this.messageService.add({ severity: 'error', summary: 'Error', detail: "Tax Limit should not be greater then Tax Amount" });	
    return;
  }
	this.urlId?this.formData.id=this.urlId:undefined;
	this.api.createAccount(this.formData).subscribe(res=>{
		this.router.navigate(['account-list']);
		this.messageService.add({ severity: 'success', summary: 'Success', detail: "Account Saved Successfully" });	
		},err=>{
	
		})

  }
  accType:any=[]
  getAccountType(){
    this.api.getAllAccountType().subscribe(res=>{
      this.accType=res;
    })
  }
  usrGrp:any=[];
  getUserGroup(){
    this.api.getAllAccountGroup().subscribe(res=>{
      this.usrGrp=res;
    })
  }
  accCat:any=[];
  getAccCat(){
    this.api.getAllAccountCat().subscribe(res=>{
      this.accCat=res;
    })
  }

}
