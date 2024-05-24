import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.css']
})
export class SaleFormComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  formData: any = {  };
  userTypes:any=[];
  genders:any=[{label:'Male',value:'Male'},{label:'Female',value:'Female'}];
  urlId: any;
  saleDtl: any[] = [];
  grossSale:number=0;
  disc:number=0;
  flatDisc:number=0;
  totalDisc:number=0;
  misc:number=0;
  grandTotal:number=0;
  return:number=0;
  earnedPoints:number=0;
  netAmount:number=0;
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id'); 
    this.getAllItem();
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

  salePriceChange(saleDtl:any){
    debugger
    saleDtl.total=saleDtl.qty*saleDtl.salePrice;
    saleDtl.netTotal=saleDtl.qty*saleDtl.salePrice;
    this.grossSale=0;
    this.saleDtl.forEach(x=>{
      this.grossSale=this.grossSale+x.netTotal;
    })
    this.grandTotal=this.grossSale-this.disc;
  }
  discChange(saleDtl:any){
    debugger
    saleDtl.netTotal=saleDtl.total-saleDtl.disc;
    this.disc=0;
    this.saleDtl.forEach(x=>{
      this.disc=this.disc+x.disc;
    })
    this.grandTotal=this.grossSale-this.disc;
  }
  earnedPointsChange(){
    this.netAmount=this.earnedPoints-this.return;
  }
  AddData(){
    this.saleDtl.push({no:0,barCode:'',itemId:0,qty:'',
    salePrice:0,disc:0,total:0,netTotal:0});
  }
  RemoveData(){
    this.saleDtl=[];
  }
  RemoveCol(index:number){
    debugger
    this.saleDtl.splice(index,1);
  }
  cancel(){
    this.router.navigate(['account-cat-list']);
  }
  party:any=[]
  getParty(){
    this.api.getAllParty().subscribe(res=>{
      this.party=res;
    })
  }
  items:any=[]
  getAllItem(){
    this.api.getAllItemsdetails().subscribe(res=>{
      this.items=res;
    })
  }
  addSale(){ 
    debugger
    this.urlId?this.formData.id=this.urlId:undefined;
    let formData:any={
      id:this.urlId?this.formData.id=this.urlId:undefined,
      grossSale:this.grossSale,
      disc:this.disc,
      flatDisc:this.flatDisc,
      totalDisc:this.totalDisc,
      misc:this.misc,
      grandTotal:this.grandTotal,
      return:this.return,
      earnedPoints:this.earnedPoints,
      counterSaleDetails:this.saleDtl

    }
	this.api.createCounterSale(formData).subscribe(res=>{
    debugger
    this.messageService.add({ severity: 'success', summary: 'Success', detail: "Sale Detail Saved Successfully" });	
		this.router.navigate(['counter-sales']);
		},err=>{
	
		})

  }

}
