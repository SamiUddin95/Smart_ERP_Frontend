import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-sale-till-close',
  templateUrl: './sale-till-close.component.html',
  styleUrls: ['./sale-till-close.component.css']
})
export class SaleTillCloseComponent {
  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private messageService: MessageService,) { }
  urlId: any;
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getCurrentUser();
    this.getLocation();
    // this.getAllTodaysCreditSale();
  }
  location: any = [];
  getLocation() {
    this.api.getAllLocation().subscribe(res => {
      this.location = res;
    })
  }
  todaysCashIn: any = [];
  getAllTodaysCashIn() {
    this.api.getAllTodaysCashIn().subscribe(res => {
      this.todaysCashIn = res;
    })
  }
  todaysCashOut: any = [];
  getAllTodaysCashOut() {
    this.api.getAllTodaysCashOut().subscribe(res => {
      this.todaysCashOut = res;
    })
  }
  getAllTodaysCreditSale() {
    this.api.getAllTodaysCreditSale().subscribe(res => {

    })
  }
  createSaleTIll() {
    this.formData.userId = this.currentUser.userId;
    this.formData.id = Number(this.urlId);
    this.api.createSaleTillClose(this.formData).subscribe(res => {
      if (res.id > 0) {
        this.router.navigate(['till-close-list']);
      }
      // else
      // if(res.msg=="Till already Open")
      // {
      //   this.messageService.add({ severity: 'error', summary: 'Error', detail: "There should be one till open for a day!" });
      // }
    })
  }
  dummyTillClose() {
    this.api.getDummyTillClose().subscribe(res => {
      this.formData.cashIn = res[0].cashIn;
      this.formData.cashOut = res[0].cashOut;
      this.formData.grossSale = res[0].grossSale;
      this.formData.misc = res[0].misc;
      this.formData.netCash = res[0].netCash;
      this.formData.netSale = res[0].netSale;
      this.formData.shortage = res[0].shortage;
      this.formData.tillOpenAmount = res[0].tillOpenAmount;
      this.formData.totalCreditAmount = res[0].totalCreditAmount;
      this.formData.totalDisc = res[0].totalDisc;
      this.formData.totalGst = res[0].totalGst;
      this.formData.totalSaleReturn = res[0].totalSaleReturn;
      this.formData.cashSaleReturn = res[0].cashSaleReturn;
    })
    this.getAllTodaysCashIn();
    this.getAllTodaysCashOut();
  }
  currentUser: any = {};
  getCurrentUser() {
    this.api.getUserById(Number(localStorage.getItem("loginId"))).subscribe(res => {
      this.currentUser = res[0];
      this.formData.userId = this.currentUser.name;
    })
  }
  tillCloseForm: any = {
    five000: 5000, five000v: 0, five000t: 0, one0000: 1000, one0000v: 0, one0000t: 0,
    five00: 500, five00v: 0, five00t: 0, one00: 100,
    one00v: 0, one00t: 0, five0: 50,
    five0v: 0, five0t: 0, two0: 20, two0v: 0, two0t: 0,
    one0: 10, one0v: 0, one0t: 0, five: 5, fivev: 0,
    fivet: 0, two: 2, twov: 0, twot: 0, one: 1, onev: 0,
    onet: 0
  };
  formData: any = { grossSale: 0 };
  updateTotal() {
    this.formData.tillCloseAmount = this.tillCloseForm.five000t + this.tillCloseForm.one0000t +
      this.tillCloseForm.five00t + this.tillCloseForm.one00t +
      this.tillCloseForm.five0t + this.tillCloseForm.two0t +
      this.tillCloseForm.one0t + this.tillCloseForm.fivet +
      this.tillCloseForm.twot + this.tillCloseForm.onet;
  }
  amountfive000Changes(e: any) {
    this.tillCloseForm.five000t = 0;
    this.tillCloseForm.five000t = e.target.value * 5000;
    this.updateTotal();
  }
  amountone000Changes(e: any) {
    this.tillCloseForm.one0000t = 0;
    this.tillCloseForm.one0000t = e.target.value * 1000;
    this.updateTotal();
  }
  amountfive00Changes(e: any) {
    this.tillCloseForm.five00t = 0;
    this.tillCloseForm.five00t = e.target.value * 500;
    this.updateTotal();
  }
  amountone00Changes(e: any) {
    this.tillCloseForm.one00t = 0;
    this.tillCloseForm.one00t = e.target.value * 100;
    this.updateTotal();
  }
  amount50Changes(e: any) {
    this.tillCloseForm.five0t = 0;
    this.tillCloseForm.five0t = e.target.value * 50;
    this.updateTotal();
  }
  amounttwo0Changes(e: any) {
    this.tillCloseForm.two0t = 0;
    this.tillCloseForm.two0t = e.target.value * 20;
    this.updateTotal();
  }
  amountfiveChanges(e: any) {
    this.tillCloseForm.fivet = 0;
    this.tillCloseForm.fivet = e.target.value * 5;
    this.updateTotal();
  }
  amounttwoChanges(e: any) {
    this.tillCloseForm.twot = 0;
    this.tillCloseForm.twot = e.target.value * 2;
    this.updateTotal();
  }
  amountOne0Changes(e: any) {
    this.tillCloseForm.one0t = 0;
    this.tillCloseForm.one0t = e.target.value * 10;
    this.updateTotal();
  }
  amountOneChanges(e: any) {
    this.tillCloseForm.onet = 0;
    this.tillCloseForm.onet = e.target.value * 1;
    this.updateTotal();
  }
  add() { }
  cancel() {
    this.router.navigate(['till-close-list']);
  }
}
