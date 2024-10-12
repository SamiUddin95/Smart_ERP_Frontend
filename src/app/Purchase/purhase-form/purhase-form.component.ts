import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-purhase-form',
  templateUrl: './purhase-form.component.html',
  styleUrls: ['./purhase-form.component.css']
})
export class PurhaseFormComponent {

  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  
  formData: any = {  };
  urlId: any;
  party:any=[];
  qtyPack:number=0;
  disc:number=0;
  totalQty:number=0;
  totalDisc:number=0;
  misc:number=0;
  grandTotal:number=0;
  return:number=0;
  earnedPoints:number=0;
  netAmount:number=0;
  totalExcTax:number=0;
  totalIncTax:number=0;
  looseQty:number=0;
  bonusQty:number=0;
  flatDisc:number=0;
  purcDtl: any[] = [];
ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getCategory();
    this.getItems();
    this.getParty();
    if(this.urlId)
      this.getPurchaseById(this.urlId);
	}
  getPurchaseById(id:number){
    debugger
    this.api.getPurchaseById(id).subscribe(res=>{
      var res=JSON.parse(res); 
      this.formData.formData=res.purchase[0].vendorId;
      this.purcDtl=res.purchaseDetails;
      this.grandTotal = 0;
      this.totalExcTax = 0;
      this.totalIncTax = 0;
      this.totalQty = 0;
      this.purcDtl.forEach(x => { 
        this.grandTotal += x.total;
        this.totalIncTax += x.total; // Assuming totalIncTax is same as netTotal
        this.totalExcTax += x.total; // Adjust this based on your tax logic
    
        if (typeof x.quantity === 'number' && !isNaN(x.quantity)) {
          this.totalQty += x.quantity;
        }
      });
    })
  }
  onKey(event: any,user:any) { 
    debugger
    user.barcode=event.target.value;
    if(user.barCode.length>4){ 
      this.api.getItemDetailbyBarCode(user.barCode).subscribe(res=>{
        user.itemName=res[0].itemName;
        user.purchasePrice=res[0].purchasePrice;
        user.salePrice=res[0].salePrice
      })
    }
  }
  barCodeChange(user:any){
    debugger 
    

  }
  cancel(){
    this.router.navigate(['purchase-list']);
  }
  fullRateChange(purcDtl:any){ 
    purcDtl.total=purcDtl.quantity*purcDtl.purchasePrice;
    purcDtl.netTotal=purcDtl.quantity*purcDtl.purchasePrice;
    this.grandTotal=0;
    this.totalExcTax=0;
    this.totalIncTax=0;
    this.purcDtl.forEach(x=>{
      this.grandTotal+=x.total;
      this.totalIncTax+=x.total;
      this.totalExcTax+=x.total;
    })
  }
  discChange(purcDtl: any) {  
    purcDtl.total = (purcDtl.fullRate * purcDtl.quantity) * (1 - purcDtl.disc / 100);
    this.grandTotal = 0; 
    this.totalIncTax = 0; 
    this.totalExcTax = 0; 
    this.purcDtl.forEach(x => {
      this.grandTotal += x.total;
      this.totalIncTax += x.total;
      this.totalExcTax += x.total;
    });
  }

  flAtdiscChange(purcDtl:any){ 
    purcDtl.total = purcDtl.fullRate * purcDtl.qty; 
    purcDtl.total = purcDtl.total - purcDtl.flatDisc;
    this.grandTotal = 0; 
    this.totalIncTax = 0; 
    this.totalExcTax = 0; 
    this.purcDtl.forEach(x => {
      this.grandTotal += x.total;
      this.totalIncTax += x.total;
      this.totalExcTax += x.total;
    });
  }
  qtyChange(user:any) {  
    this.totalQty = 0; 
    user.total=user.quantity*user.purchasePrice;
    user.netTotal=user.quantity*user.purchasePrice;
    this.grandTotal=0;
    this.totalExcTax=0;
    this.totalIncTax=0;
    this.purcDtl.forEach(x => {
      if (typeof x.total === 'number' && !isNaN(x.total)) {
          this.grandTotal += x.total;
          this.totalIncTax += x.total; // Assuming tax included is the same
          this.totalExcTax += x.total; // Adjust as necessary
          if (typeof x.quantity === 'number' && !isNaN(x.quantity)) {
              this.totalQty += x.quantity;
          }
      }
  });
  
}

  earnedPointsChange(){
    this.netAmount=this.earnedPoints-this.return;
  }
  getParty(){
    this.api.getAllParty().subscribe(res=>{
      this.party=res;
    })
  }
  PurchaseDetailModel: any[] = [];
  AddData(){
    this.purcDtl.push({no:0,barCode:'',itemName:'',bonusQty:'',
    salePrice:0,desc:0,flatDesconeachQty:0,gST:0,gSTPer2:0,remakrs:''});
  }
  RemoveData(){
    this.purcDtl=[];
  }
  RemoveCol(index:number){ 
    this.purcDtl.splice(index,1);
  }
  items:any=[]
  getItems(){
    this.api.getAllItemsdetails().subscribe(res=>{
      this.items=res;
    })
  }
  addPurchase() { 
    let formData: any = {
      id: this.urlId ? this.urlId : undefined, 
      barCode: this.formData.barCode,
      VendorId:this.formData.partyId, 
      Remarks: this.formData.remarks,
      InvoiceNo: this.formData.invoiceNo,
      purchasePrice: this.formData.purchasePrice,
      ItemsQuantity: this.totalQty,
      billTotal: this.grandTotal,
      gstByPercent: this.formData.gstByPercent,
      gstByValue: this.formData.gstByValue,
      netRate: this.formData.netRate,
      salePrice: this.formData.salePrice,
      saleDiscountByValue: this.formData.saleDiscountByValue,
      marginPercent: this.formData.marginPercent,
      netSalePrice: this.formData.netSalePrice,
      PurchaseDetailModel: this.purcDtl
    };
  
    this.api.createPurchase(formData).subscribe(res => {
      if(res.msg="Purchase Order processed successfully"){
        this.router.navigate(['purchase-list']);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Purchase Saved Successfully" });
      }
    }, err => {
      console.error("Error saving purchase", err);
    });
  }
        cat:any=[];
        getCategory(){
          this.api.getAllCategorydetails().subscribe(res=>{
            this.cat=res;
          })
        }
  

}
