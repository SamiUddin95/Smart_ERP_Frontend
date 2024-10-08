import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  constructor(private router: Router,private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  filter: any = {};
  ngOnInit(): void {
    this.getItemList();
	}

  item: any = [];

  getItemList() {
		this.api.getAllItemsdetailsFilterbased(
      this.filter.itemName?this.filter.itemName:'All',
      this.filter.aliasName?this.filter.aliasName:'All'
      ,this.filter.purchasePrice?this.filter.purchasePrice:0
      ,this.filter.salePrice?this.filter.salePrice:0

    ).subscribe((res: any) => {
			this.item = res.map((ele: any) => {
			  return {
        id: ele.id,
        aliasName: ele.aliasName,
        itemName: ele.itemName,
        purchasePrice: ele.purchasePrice,
        salePrice: ele.salePrice,
        categoryId: ele.categoryId,
        classId: ele.classId,
        manufacturerId: ele.manufacturerId,
        remarks: ele.remarks,
        recentPurchase: ele.recentPurchase,
        brandId: ele.brandId,
        discFlat: ele.discFlat,
        lockDisc: ele.lockDisc
			  };
			});
		  });
	}

  deleteItems(items: any) {
		debugger
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				this.api.deleteItemsById(items.id).subscribe(res => {
					this.item = this.item.filter((item: any) => item.id !== items.id);
					this.messageService.add({ severity: 'success', summary: 'Success', detail: "Deleted Successfully" });
					return;
				}, err => { })
			},
			reject: () => {

			}
		});
	  }

    editItem(id: any) {
      this.router.navigate(['item-form/' + id]);
    }

    addItem(){
      this.router.navigate(['item-form']);
    }
    cancel() {
  
    }
    getData() {
  
    }
    clearFilter() {
  
    }
}
