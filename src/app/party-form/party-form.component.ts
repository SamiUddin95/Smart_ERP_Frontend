import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-party-form',
  templateUrl: './party-form.component.html',
  styleUrls: ['./party-form.component.css']
})
export class PartyFormComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  formData: any = {  };
  userTypes:any=[];
  genders:any=[{label:'Male',value:'Male'},{label:'Female',value:'Female'}];
  urlId: any;
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id'); 
    this.getAccountType();
    this.getAccCat();
    this.getArea();
    this.getSubArea();
    this.getCity();
    if (this.urlId) {
      this.getUserById(this.urlId);
    }
	}
  getUserById(id: any) {
		this.api.getPartyById(Number(id)).subscribe(res => {
			this.formData = res[0];
		})
	}
  cancel(){
    this.router.navigate(['party-list']);
  }
  type:any=[]
  getAccountType(){
    this.api.getAllSalesManType().subscribe(res=>{
      this.type=res;
    })
  }
  area:any=[]
  getArea(){
    this.api.getAllArea().subscribe(res=>{
      this.area=res;
    })
  }
  subArea:any=[]
  getSubArea(){
    this.api.getAllSubArea().subscribe(res=>{
      this.subArea=res;
    })
  }
  city:any=[]
  getCity(){
    this.api.getAllCity().subscribe(res=>{
      this.city=res;
    })
  }
  
  addParty(){ 
    const requiredFields = [
      { key: 'partyName', message: 'Party Name is required.' },
    ];

      for (const field of requiredFields) {
          if (!this.formData[field.key]) {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: field.message });
              return; 
          }
      }
	this.urlId?this.formData.id=this.urlId:undefined;
	this.api.createParty(this.formData).subscribe(res=>{
		this.router.navigate(['party-list']);
		this.messageService.add({ severity: 'success', summary: 'Success', detail: "User Saved Successfully" });	
		},err=>{
	
		})

  }

  accCat:any=[];
  getAccCat(){
    this.api.getAllAccountCat().subscribe(res=>{
      this.accCat=res;
    })
  }
}
