import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment'; 
import { formatDate } from '@angular/common';

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
  locationId : any;
  originalPurchOrderDtlData: any[] = [];
  purchOrderDtlData: any[] = [];
  tableNames: { label: string; value: string }[] = [];
 selectedTable: string = '';
 zeroQty: string = '';
  tableData: { label: string; value: number }[] = [];
  //formData: any = { tableItemId: null };
  selectedItem: any;

  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id'); 
    this.getParty();
    this.getUserGroup();
    this.getGoDown();
    this.getManufact();
    this.getlocation();
    if (this.urlId) {
      this.getUserById(this.urlId);
    }
    
	}

  onTableChange() {
    debugger
    if (!this.selectedTable) return;
  debugger
    this.api.getTableData(this.selectedTable).subscribe((res: any[]) => {
      console.log("Received table data:", res); // DEBUG
      this.tableData = res.map(item => ({
        label: item.name || item.partyName,  // lowercase keys
        value: item.id
      }));
    }, err => {
      console.error("Error fetching table data", err); // DEBUG
    });
  }
  fetchDataByDate() {
    if (!this.formData.startDate || !this.formData.endDate) {
      alert("Please select both Start Date and End Date.");
      return;
    }
  
    const formattedStart = formatDate(this.formData.startDate, 'yyyy-MM-dd', 'en-US');
    const formattedEnd = formatDate(this.formData.endDate, 'yyyy-MM-dd', 'en-US');
  
    this.api.fetchPurchaseOrdersByDate(formattedStart, formattedEnd, this.zeroQty)
      .subscribe(res => {
        const result = JSON.parse(res);
        this.originalPurchOrderDtlData = result.purchaseOrderDetails;
        this.purchOrderDtlData = [...result.purchaseOrderDetails];
  
        if (result.purchaseOrders.length > 0) {
          const firstOrder = result.purchaseOrders[0];
          this.formData = { ...this.formData, ...firstOrder };
        }
      });
  }
  getUserById(id: any) {
		this.api.getPurchaseOrderById(id).subscribe(res => {
      debugger;
      var res=JSON.parse(res); 

      this.originalPurchOrderDtlData = res.purchaseOrderDetails;

      this.purchOrderDtlData=res.purchaseOrderDetails;
      this.formData.partyId=res.purchaseOrders[0].partyId;
      this.formData.dateOfInvoice=res.purchaseOrders[0].dateOfInvoice;
      this.formData.endDate=res.purchaseOrders[0].endDate;
      this.formData.startDate=res.purchaseOrders[0].startDate;
      this.formData.remarks=res.purchaseOrders[0].remarks; 
      this.formData.projectionDays=res.purchaseOrders[0].projectionDays; 
      this.formData.paCategory=res.purchaseOrders[0].paCategory; 
      this.formData.location=res.purchaseOrders[0].location; 
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
      partyType: this.selectedTable,
      dateOfInvoice:moment(this.formData.dateOfInvoice).format('YYYY-MM-DD').toString(),
      remarks:this.formData.remarks, 
      endDate:moment(this.formData.endDate).format('YYYY-MM-DD').toString(),
      startDate:moment(this.formData.startDate).format('YYYY-MM-DD').toString(),
      projectionDays:this.formData.projectionDays, 
      paCategoryId:this.formData.paCategory,
      purcOrderDtlModel:this.purchOrderDtlData,
      location:this.formData.location,
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
  barCodes: string = '';
  currentStock: string = '';
  salePrice: string = '';
  purchasePrice: string = '';
  saleDisc: string = '';
  netSalePrice: string = '';
  postPurchase() {
    debugger
    this.barCodes = this.purchOrderDtlData.map(x => x.barcode).join(',');
    this.purchasePrice = this.purchOrderDtlData.map(x => x.purchasePrice).join(',');
    this.salePrice = this.purchOrderDtlData.map(x => x.netSalePrice).join(',');
    this.currentStock = this.purchOrderDtlData.map(x => x.netQuantity).join(',');
    this.saleDisc = this.purchOrderDtlData.map(x => x.saleDiscountByValue).join(',');
    this.netSalePrice = this.purchOrderDtlData.map(x => x.netSalePrice).join(',');
    const name = localStorage.getItem("Name")?.toString() ?? '';
    this.api.postPurchasePrder(name, this.urlId, this.barCodes, this.currentStock, this.salePrice,
      this.purchasePrice, this.saleDisc, this.netSalePrice).subscribe(res => {
        if (res.status == "OK")
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.msg });
      });
    
  }
  unPostPurchase() {
    debugger
    this.barCodes = this.purchOrderDtlData.map(x => x.barcode).join(',');
    this.purchasePrice = this.purchOrderDtlData.map(x => x.purchasePrice).join(',');
    this.salePrice = this.purchOrderDtlData.map(x => x.netSalePrice).join(',');
    this.currentStock = this.purchOrderDtlData.map(x => x.netQuantity).join(',');
    this.saleDisc = this.purchOrderDtlData.map(x => x.saleDiscountByValue).join(',');
    this.netSalePrice = this.purchOrderDtlData.map(x => x.netSalePrice).join(',');
    const name = localStorage.getItem("Name")?.toString() ?? '';
    this.api.unPostPurchaseOrder(name, this.urlId, this.barCodes, this.currentStock, this.salePrice,
      this.purchasePrice, this.saleDisc, this.netSalePrice).subscribe(res => {
        if (res.status == "OK")
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.msg });
      });
    
  }

    itemSearchDialog: boolean = false;
    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
      if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        this.itemSearchDialog=true;
      }
    }
    itemDtl:any=[];
    searchedItemName:string='';
    itemSearchFromDialog(e:any){
      debugger
      this.api.getAllItemsdetailsFilterbased(e.target.value,'All',0,0).subscribe(res=>{
        this.itemDtl=res;
  
      })
    }
    location:any=[];
    getlocation(){
      this.api.getAllLocation().subscribe(res=>{
        this.location=res;
      })
    }
}
