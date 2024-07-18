import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-party-price-form',
  templateUrl: './party-price-form.component.html',
  styleUrls: ['./party-price-form.component.css']
})
export class PartyPriceFormComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  formData: any = {  };
  userTypes:any=[];
  genders:any=[{label:'Male',value:'Male'},{label:'Female',value:'Female'}];
  urlId: any;
  partyDtl: any[] = [];
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id'); 
    this.getParty(); 
    if (this.urlId) {
      this.getUserById(this.urlId);
    }
	}
  getUserById(id: any) {
		this.api.getSalesManById(String(id)).subscribe(res => {
			this.formData = res[0];
		})
	}
  AddData(){
    this.partyDtl.push({no:0,barCode:'',itemName:'',bonusQty:'',
    salePrice:0,desc:0,flatDesconeachQty:0,gST:0,gSTPer2:0,remakrs:''});
  }
  RemoveData(){
    this.partyDtl=[];
  }
  RemoveCol(index:number){
    debugger
    this.partyDtl.splice(index,1);
  }
  cancel(){
    this.router.navigate(['party-price-list']);
  }
  party:any=[]
  getParty(){
    this.api.getAllParty().subscribe(res=>{
      this.party=res;
    })
  }
  addParty(){ 
    debugger
    this.urlId?this.formData.id=this.urlId:undefined;
    let formData:any={
      id:this.urlId?this.formData.id=this.urlId:undefined,
      partyId:this.formData.partyId,
      partyPriceData:this.partyDtl

    }
	this.api.createPartyPrice(formData).subscribe(res=>{
    this.messageService.add({ severity: 'success', summary: 'Success', detail: "User Saved Successfully" });	
		this.router.navigate(['party-price-list']);
		},err=>{
	
		})

  }

}
