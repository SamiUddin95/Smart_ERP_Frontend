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
  urlId: any;

  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id'); 
    
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
    if (!this.formData.partyId || !this.selectedTable) {
      alert("Please select Supplier.");
      return;
    }
    const partyId = this.formData.partyId;
    const partyName = this.selectedTable;
  debugger
    this.api.fetchGetItemsBySupplier(partyId, partyName)
      .subscribe(res => {
        const result = JSON.parse(res);
        this.originalPurchOrderDtlData = result.getItem;
        this.purchOrderDtlData = [...result.getItem];
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

  addMinimumOrder(){
    debugger
    const formData = this.purchOrderDtlData.map(item => ({
      barcode: item.barcode,
      itemName: item.itemName,
      currentStock: item.currentStock,
      netRate: item.netCost,
      minimumQty1: item.minQty,
      updatedBy: this.urlId 
    }));
  
    this.api.createMinimumQty(formData).subscribe(
      (res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Minimum Qty Saved Successfully" });
      },
      (err: any) => {
        // handle error if needed
      }
    );
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
