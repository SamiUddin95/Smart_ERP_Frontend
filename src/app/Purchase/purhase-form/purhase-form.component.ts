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
	}

  cancel(){
    this.router.navigate(['purchase']);
  }
  fullRateChange(purcDtl:any){ 
    debugger
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
  qtyChange() {  
    this.totalQty = 0; 
    this.purcDtl.forEach(x => { 
        this.totalQty += x.quantity
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
    debugger
    let formData: any = {
      id: this.urlId ? this.urlId : undefined, 
      barcode: this.formData.barcode,
      // itemName: this.formData.itemName,
      quantity: this.formData.quantity,
      bonusQuantity: this.formData.bonusQuantity,
      purchasePrice: this.formData.purchasePrice,
      discountByPercent: this.formData.discountByPercent,
      discountByValue: this.formData.discountByValue,
      total: this.formData.total,
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
      this.router.navigate(['purchase']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Purchase Saved Successfully" });
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
