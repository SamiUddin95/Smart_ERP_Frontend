import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent {
  constructor(private router: Router, private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.getPurhaseList();
  }
  item: any = [];

  getPurhaseList() {
    this.api.getAllPurhasedetails().subscribe((res: any) => {
      this.item=res;
    });
  }



  
 
  deleteItems(items: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.api.deletePurhaseById(items.purchaseId).subscribe(res => {
          this.item = this.item.filter((item: any) => item.purchaseId !== items.purchaseId);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Deleted Successfully" });
          return;
        }, err => { })
      },
      reject: () => {

      }
    });
  }

  editItem(id: any) {
    this.router.navigate(['purchase-form/' + id]);
  }

  addItem() {
    this.router.navigate(['purchase-form']);
  }
  cancel() {

  }
  getData() {

  }
  clearFilter() {

  }
}
