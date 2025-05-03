import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment'; 
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-minimun-qty-alert',
  templateUrl: './minimun-qty-alert.component.html',
  styleUrls: ['./minimun-qty-alert.component.css']
})
export class MinimunQtyAlertComponent {
constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
formData: any = {  };
  selectedTable: string = '';
  tableData: { label: string; value: number }[] = [];
  originalPurchOrderDtlData: any[] = [];
  purchOrderDtlData: any[] = [];

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
  
    this.api.fetchPurchaseOrdersByDate(formattedStart, formattedEnd, null)
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
  cancel(){
    this.router.navigate(['purch-order-list']);
  }

  addPurchaseOrder(){
      let formData:any={
        //id:this.urlId?this.formData.id=this.urlId:undefined,
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

    itemDtl:any=[];
    searchedItemName:string='';
    itemSearchFromDialog(e:any){
      debugger
      this.api.getAllItemsdetailsFilterbased(e.target.value,'All',0,0).subscribe(res=>{
        this.itemDtl=res;
  
      })
    }

    itemSearchDialog: boolean = false;
    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
      if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        this.itemSearchDialog=true;
      }
    }
    AddData(){
      this.purchOrderDtlData.push({no:0,barCode:'',itemName:'',bonusQty:'',
      salePrice:0,desc:0,flatDesconeachQty:0,gST:0,gSTPer2:0,remakrs:''});
    }
    
    RemoveCol(index:number){ 
      this.purchOrderDtlData.splice(index,1);
    }
}
