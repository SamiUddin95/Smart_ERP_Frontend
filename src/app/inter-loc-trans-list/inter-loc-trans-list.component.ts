import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import * as moment from 'moment';

@Component({
  selector: 'app-inter-loc-trans-list',
  templateUrl: './inter-loc-trans-list.component.html',
  styleUrls: ['./inter-loc-trans-list.component.css']
})
export class InterLocTransListComponent {
constructor(private router: Router, private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  currentDate = new Date();
  ngOnInit(): void {
    this.currentDate.setHours(0, 0, 0, 0);
    this.filter.dateTo = moment(this?.currentDate).format('YYYY-MM-DD').toString();
    const dateFrom = moment(this?.currentDate).subtract(10, 'days').toDate();
    this.filter.dateFrom = moment(dateFrom).format('YYYY-MM-DD').toString();
    this.getPurhaseList();
    this.getParty();
  }
  item: any = [];
  party: any = [];
  filter: any = {
  };
  getParty() {
    this.api.getAllParty().subscribe(res => {
      this.party = res;
    })
  }
  getPurhaseList() {
    this.filter.dateFrom = moment(this?.filter?.dateFrom).format('YYYY-MM-DD').toString();
    this.filter.dateTo = moment(this?.filter?.dateTo).format('YYYY-MM-DD').toString();;
    this.filter.postedDate = this.filter.postedDate ? moment(this.filter.postedDate).format('YYYY-MM-DD').toString() : '';
    this.api.getAllStockAdjustment(
      // this.filter?.dateFrom,
      // this.filter?.dateTo,
      // this.filter?.postedDate,
      // this.filter?.postedBy ? this.filter?.postedBy : '',
      // this.filter?.partyId ? this.filter?.partyId : 0,
      // this.filter?.invoiceNo ? this.filter?.invoiceNo : 0,
    ).subscribe((res: any) => {
      this.item = res;
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
    this.router.navigate(['inter-loc-trans-form/' + id]);
  }

  addItem() {
    this.router.navigate(['inter-loc-trans-form']);
  }
  cancel() {

  }
  getData() {
    this.getPurhaseList();
  }
  clearFilter() {

  }
}
