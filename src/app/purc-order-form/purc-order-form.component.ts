import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-purc-order-form',
  templateUrl: './purc-order-form.component.html',
  styleUrls: ['./purc-order-form.component.css']
})
export class PurcOrderFormComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  formData: any = {  };
  userTypes:any=[];
  genders:any=[{label:'Male',value:'Male'},{label:'Female',value:'Female'}];
  urlId: any;
  purchOrderDtlData: any[] = [];
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id'); 
    this.getParty();
    this.getUserGroup();
    this.getGoDown();
    this.getManufact();
    if (this.urlId) {
      this.getUserById(this.urlId);
    }
	}
  getUserById(id: any) {
		this.api.getPurchaseOrderById(id).subscribe(res => {
      debugger;
      var res=JSON.parse(res); 
      this.purchOrderDtlData=res.purchaseOrderDetails;
      this.formData.partyId=res.purchaseOrders[0].partyId;
      this.formData.dateOfInvoice=res.purchaseOrders[0].dateOfInvoice;
      this.formData.remarks=res.purchaseOrders[0].remarks; 
		})
	}
  cancel(){
    this.router.navigate(['purch-order-list']);
  }
  party:any=[]
  getParty(){
    this.api.getAllParty().subscribe(res=>{
      this.party=res;
    })
  }
  item:any=[]
  getGoDown(){
    this.api.getAllItemsdetails().subscribe(res=>{
      this.item=res;
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
      partyId:this.formData.partyId,
      dateOfInvoice:this.formData.dateOfInvoice,
      remarks:this.formData.remarks, 
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
