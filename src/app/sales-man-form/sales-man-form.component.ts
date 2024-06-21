import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sales-man-form',
  templateUrl: './sales-man-form.component.html',
  styleUrls: ['./sales-man-form.component.css']
})
export class SalesManFormComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  formData: any = {  };
  userTypes:any=[];
  genders:any=[{label:'Male',value:'Male'},{label:'Female',value:'Female'}];
  urlId: any;
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id'); 
    this.getAccountType();
    this.getUserGroup();
    if (this.urlId) {
      this.getUserById(this.urlId);
    }
	}
  getUserById(id: any) {
		this.api.getSalesManById(String(id)).subscribe(res => {
			this.formData = res[0];
		})
	}
  cancel(){
    this.router.navigate(['sales-man-list']);
  }
  type:any=[]
  getAccountType(){
    this.api.getAllSalesManType().subscribe(res=>{
      this.type=res;
    })
  }
  addUser(){ 
	this.urlId?this.formData.id=this.urlId:undefined;
	this.api.createSalesMan(this.formData).subscribe(res=>{
		this.router.navigate(['sales-man-list']);
		this.messageService.add({ severity: 'success', summary: 'Success', detail: "User Saved Successfully" });	
		},err=>{
	
		})

  }

  usrGrpCat:any=[];
  getUserGroup(){
    this.api.getAllAccountCat().subscribe(res=>{
      this.usrGrpCat=res;
    })
  }
}
