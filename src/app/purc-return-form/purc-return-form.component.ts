import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-purc-return-form',
  templateUrl: './purc-return-form.component.html',
  styleUrls: ['./purc-return-form.component.css']
})
export class PurcReturnFormComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  formData: any = {  };
  userTypes:any=[];
  genders:any=[{label:'Male',value:'Male'},{label:'Female',value:'Female'}];
  urlId: any;
  purchOrderDtlData: any[] = [];
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id'); 
    this.getAccountType();
    this.getUserGroup();
    this.getGoDown();
    this.getManufact();
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
    this.router.navigate(['purch-order-list']);
  }
  poCat:any=[]
  getAccountType(){
    this.api.getPurchaseOrderCategory().subscribe(res=>{
      this.poCat=res;
    })
  }
  goDown:any=[]
  getGoDown(){
    this.api.getGoDown().subscribe(res=>{
      this.goDown=res;
    })
  }
  manufact:any=[]
  getManufact(){
    this.api.getAllIManufacturerdetails().subscribe(res=>{
      this.manufact=res;
    })
  }
  addUser(){ 
	this.urlId?this.formData.id=this.urlId:undefined;
	this.api.createSalesMan(this.formData).subscribe(res=>{
		this.router.navigate(['purch-order-list']);
		this.messageService.add({ severity: 'success', summary: 'Success', detail: "User Saved Successfully" });	
		},err=>{
	
		})

  }
  addPurchaseOrder(){
    let formData:any={
      id:this.urlId?this.formData.id=this.urlId:undefined,
      orderNo:this.formData.orderNo,
      poCategoryId:this.formData.poCategoryId,
      date:this.formData.date,
      fromDate:this.formData.fromDate,
      toDate:this.formData.toDate,
      goDownId:this.formData.goDownId,
      vehicle:this.formData.vehicle,
      projectionDays:this.formData.projectionDays,
      purcOrderDtlModel:this.purchOrderDtlData
    }
    this.api.createPurchaseOrder(formData).subscribe((res: any)=>{
    
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Purchase Order Saved Successfully" });	
      this.router.navigate(['purch-order-list']);
      },(err: any)=>{
    
      })
  }
  AddData(){
    this.purchOrderDtlData.push({no:0,barCode:'',itemName:'',bonusQty:'',
    salePrice:0,desc:0,flatDesconeachQty:0,gST:0,gSTPer2:0,remakrs:''});
  }
  RemoveData(){
    this.purchOrderDtlData=[];
  }
  RemoveCol(index:number){ 
    this.purchOrderDtlData.splice(index,1);
  }

  usrGrpCat:any=[];
  getUserGroup(){
    this.api.getAllAccountCat().subscribe(res=>{
      this.usrGrpCat=res;
    })
  }
}
