import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment'; 

@Component({
  selector: 'app-purc-order-form',
  templateUrl: './purc-order-form.component.html',
  styleUrls: ['./purc-order-form.component.css']
})
export class PurcOrderFormComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
    @ViewChild('tableRef') tableRef!: ElementRef;
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
      this.formData.endDate=res.purchaseOrders[0].endDate;
      this.formData.startDate=res.purchaseOrders[0].startDate;
      this.formData.remarks=res.purchaseOrders[0].remarks; 
      this.formData.projectionDays=res.purchaseOrders[0].projectionDays; 
      this.formData.paCategory=res.purchaseOrders[0].paCategory; 
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
  onKey(event: any, user: any) {
    debugger
    user.barcode = event.target.value;
    if (user.barcode.length > 4) {
      this.api.getItemDetailbyBarCode(user.barcode).subscribe(res => {
        user.itemName = res[0].itemName;
        user.purchasePrice = res[0].purchasePrice;
        user.salePrice = res[0].salePrice
      })
    }
  }
  addPurchaseOrder(){
    let formData:any={
      id:this.urlId?this.formData.id=this.urlId:undefined,
      orderNo:this.formData.orderNo,
      partyId:this.formData.partyId,
      dateOfInvoice:moment(this.formData.dateOfInvoice).format('YYYY-MM-DD').toString(),
      remarks:this.formData.remarks, 
      endDate:moment(this.formData.endDate).format('YYYY-MM-DD').toString(),
      startDate:moment(this.formData.startDate).format('YYYY-MM-DD').toString(),
      projectionDays:this.formData.projectionDays, 
      paCategoryId:this.formData.paCategory,
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
