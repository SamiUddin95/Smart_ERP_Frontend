import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
  @ViewChild('tableRef') tableRef!: ElementRef;
  formData: any = {  };
  userTypes:any=[];
  genders:any=[{label:'Male',value:'Male'},{label:'Female',value:'Female'}];
  urlId: any;
  purcRetDtl: any = [];
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
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id'); 
    this.getAllItem();
    this.getParty(); 
    if (this.urlId) {
      this.getUserById(this.urlId);
    }
	}
  onKey(event: any, user: any) { 
    user.barcode = event.target.value;
    if (user.barcode.length > 4) {
      this.api.getItemDetailbyBarCode(user.barcode).subscribe(res => {
        user.itemName = res[0].itemName;
        user.purchasePrice = res[0].purchasePrice;
        user.salePrice = res[0].salePrice
      })
    }
  }
  getUserById(id: any) {
		this.api.getPurchaseReturnById(String(id)).subscribe(res => { 
      var res=JSON.parse(res); 
      this.purcRetDtl=res.purchaseOrderDetails;
      this.formData.partyId=res.purchaseOrders[0].partyId;
      this.bonusQty=res.purchaseOrders[0].bonusQty;
      this.grandTotal=res.purchaseOrders[0].grandTotal;
      this.totalExcTax=res.purchaseOrders[0].totalExcTax;
      this.totalIncTax=res.purchaseOrders[0].totalIncTax;
      this.formData.qtyPack=res.purchaseOrders[0].qtyPack;
      this.totalQty=res.purchaseOrders[0].totalQty;
		})
	}

  fullRateChange(purcRetDtl:any){ 
    purcRetDtl.total=purcRetDtl.qty*purcRetDtl.fullRate;
    purcRetDtl.netTotal=purcRetDtl.qty*purcRetDtl.fullRate;
    this.grandTotal=0;
    this.totalExcTax=0;
    this.totalIncTax=0;
    this.purcRetDtl.forEach((x: { total: number; })=>{
      this.grandTotal+=x.total;
      this.totalIncTax+=x.total;
      this.totalExcTax+=x.total;
    })
  }
  discChange(purcRetDtl: any) {  
    purcRetDtl.total = (purcRetDtl.fullRate * purcRetDtl.qty) * (1 - purcRetDtl.disc / 100);
    this.grandTotal = 0; 
    this.totalIncTax = 0; 
    this.totalExcTax = 0; 
    this.purcRetDtl.forEach((x: { total: number; }) => {
      this.grandTotal += x.total;
      this.totalIncTax += x.total;
      this.totalExcTax += x.total;
    });
  }

  flAtdiscChange(purcRetDtl:any){ 
    purcRetDtl.total = purcRetDtl.fullRate * purcRetDtl.qty; 
    purcRetDtl.total = purcRetDtl.total - purcRetDtl.flatDisc;
    this.grandTotal = 0; 
    this.totalIncTax = 0; 
    this.totalExcTax = 0; 
    this.purcRetDtl.forEach((x: { total: number; }) => {
      this.grandTotal += x.total;
      this.totalIncTax += x.total;
      this.totalExcTax += x.total;
    });
  }
  qtyChange() {  
    this.totalQty = 0; 
    this.purcRetDtl.forEach((x: { qty: number; }) => { 
        this.totalQty += x.qty
    }); 
}

  earnedPointsChange(){
    this.netAmount=this.earnedPoints-this.return;
  }
  AddData(){
    this.purcRetDtl.push({no:0,barCode:'',itemId:0,qty:'',
    salePrice:0,disc:0,total:0,netTotal:0});
  }
  RemoveData(){
    this.purcRetDtl=[];
  }
  RemoveCol(index:number){
    
    this.purcRetDtl.splice(index,1);
  }
  cancel(){
    this.router.navigate(['purch-return-list']);
  }
  party:any=[]
  getParty(){
    this.api.getAllParty().subscribe(res=>{
      this.party=res;
    })
  }
  items:any=[]
  getAllItem(){
    this.api.getAllItemsdetails().subscribe((res: any)=>{
      this.items=res;
    })
  }
  addSale(){ 
    
    this.urlId?this.formData.id=this.urlId:undefined;
    let formData:any={
      id:this.urlId?this.formData.id=this.urlId:undefined,
      qtyPack:this.purcRetDtl.length,
      partyId:this.formData.partyId,
      disc:this.disc,
      totalQty:this.totalQty,
      totalDisc:this.totalDisc, 
      grandTotal:this.grandTotal,
      totalExcTax:this.totalExcTax,
      totalIncTax:this.totalIncTax,   
      flatDisc:this.flatDisc,
      purcOrderDtlModel:this.purcRetDtl 
    }
	this.api.createPurchaseReturn(formData).subscribe((res: any)=>{
    
    this.messageService.add({ severity: 'success', summary: 'Success', detail: "Sale Detail Saved Successfully" });	
		this.router.navigate(['purch-return-list']);
		},(err: any)=>{
	
		})

  }

  itemSearchDialog: boolean = false;
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
      event.preventDefault();
      this.itemSearchDialog = true;
    }
  }
  itemNotFound: boolean = false;
  itemDtl: any = [];
  searchedItemName: string = '';
  itemSearchFromDialog(e: any) {
    this.api.getAllItemsdetailsFilterbased(this.searchedItemName, 'All', 0, 0).subscribe(res => {
      this.itemDtl = res;
    });
  }
  onSearchDialogEnter(e: any) {
    this.searchedItemName = e.target.value;
    setTimeout(() => {
      this.scrollToHighlightedRow();
    }, 100);
  }
  scrollToHighlightedRow() {
    const selectedRow = document.querySelector('.highlighted') as HTMLElement;
    if (selectedRow && this.tableRef) {
      selectedRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    this.itemSearchDialog = false;
  }

  highlightedRowId: number | null = null;

  selectItemFromSearch(item: any) {
    this.highlightedRowId = item.purchaseId; // Store the ID of the selected purchase
    this.itemSearchDialog = false; // Close the search dialog
    this.searchedItemName="";
  }
  
}
