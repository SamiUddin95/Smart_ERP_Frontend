import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  userData: any = {  };
  userTypes:any=[];
  genders:any=[{label:'Male',value:'Male'},{label:'Female',value:'Female'}];
  urlId: any;
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getUserType();
    if (this.urlId) {
      this.getUserById(this.urlId);
    }
	}
  getUserById(id: any) {
		this.api.getUserById(String(id)).subscribe(res => {
			this.userData = res[0];
		})
	}
  cancel(){
    this.router.navigate(['user-list']);
  }
  addUser(){

	this.urlId?this.userData.id=this.urlId:undefined;
	this.api.createUser(this.userData).subscribe(res=>{
		this.router.navigate(['user-list']);
		this.messageService.add({ severity: 'success', summary: 'Success', detail: "User Saved Successfully" });	
		},err=>{
	
		})

  }
  getUserType(){
    this.api.getAllUserType().subscribe(res=>{
      this.userTypes=res;
    })
  }

}
