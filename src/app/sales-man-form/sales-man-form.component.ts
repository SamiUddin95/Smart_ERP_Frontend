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
    const requiredFields = [
      { key: 'name', message: 'Name is required.' },
      { key: 'salesManTypeId', message: 'Type is required.' },
      { key: 'isActive', message: 'Active is required.' }
  ];

      for (const field of requiredFields) {
          if (!this.formData[field.key]) {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: field.message });
              return; 
          }
      }
	this.urlId?this.formData.id=this.urlId:undefined;
	this.api.createSalesMan(this.formData).subscribe(res=>{
		this.router.navigate(['sales-man-list']);
		this.messageService.add({ severity: 'success', summary: 'Success', detail: "Sales Man Added Successfully" });	
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
