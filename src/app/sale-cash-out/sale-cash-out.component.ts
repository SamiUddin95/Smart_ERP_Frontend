import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-sale-cash-out',
  templateUrl: './sale-cash-out.component.html',
  styleUrls: ['./sale-cash-out.component.css']
})
export class SaleCashOutComponent {
    constructor(private route: ActivatedRoute,private router: Router, private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  
  cashOutForm:any={
    five000: 5000,five000v: 0,    five000t: 0,    one0000: 1000,    one0000v: 0,    one0000t: 0,
    five00: 500,    five00v: 0,    five00t: 0,    one00: 100,
    one00v: 0,    one00t: 0,    five0: 50,
    five0v: 0,    five0t: 0,    two0: 20,    two0v: 0,    two0t: 0,
    one0: 10,    one0v: 0,    one0t: 0,    five: 5,    fivev: 0,
    fivet: 0,    two: 2,
    twov: 0,    twot: 0,
    one: 1,    onev: 0,
    onet: 0
  };
  urlId: any;
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id'); 
    this.getCurrentUser();
  }
  currentUser:any={};
  getCurrentUser(){
    this.api.getUserById(Number(localStorage.getItem("loginId"))).subscribe(res=>{
      this.currentUser=res[0];
      this.formData.userId=this.currentUser.name;
    })
  }
  formData:any={};
  createCashIn(){
    this.formData.userId=this.currentUser.userId;
    this.formData.id=this.urlId?this.urlId:0;
    this.api.createCashOut(this.formData).subscribe(res=>{
      if(res.id>0){
        this.router.navigate(['cash-out-list']);
      } else
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "There should be one cash out for a day!" });
  
    })
  }
  updateTotal() {
    this.formData.cashOutAmount = this.cashOutForm.five000t + this.cashOutForm.one0000t + 
                           this.cashOutForm.five00t + this.cashOutForm.one00t + 
                           this.cashOutForm.five0t + this.cashOutForm.two0t + 
                           this.cashOutForm.one0t + this.cashOutForm.fivet + 
                           this.cashOutForm.twot + this.cashOutForm.onet;
  }
  amountfive000Changes(e:any){ 
    this.cashOutForm.five000t=0; 
    this.cashOutForm.five000t=e.target.value*5000;
    this.updateTotal();
  }
  amountone000Changes(e:any){ 
    this.cashOutForm.one0000t=0; 
    this.cashOutForm.one0000t=e.target.value*1000;
    this.updateTotal();

  }
  amountfive00Changes(e:any){
    this.cashOutForm.five00t=0; 
    this.cashOutForm.five00t=e.target.value*500;
    this.updateTotal();
  }
  amountone00Changes(e:any){
    this.cashOutForm.one00t=0; 
    this.cashOutForm.one00t=e.target.value*100;
    this.updateTotal();
  }
  amount50Changes(e:any){
    this.cashOutForm.five0t=0; 
    this.cashOutForm.five0t=e.target.value*50;
  }
  amounttwo0Changes(e:any){
    this.cashOutForm.two0t=0; 
    this.cashOutForm.two0t=e.target.value*20;
    this.updateTotal();
  }
  // amountone0Changes(e:any){
  //   this.cashOutForm.one0t=0; 
  //   this.cashOutForm.one0t=e.target.value*500;
  // }
  amountfiveChanges(e:any){
    this.cashOutForm.fivet=0; 
    this.cashOutForm.fivet=e.target.value*5;
    this.updateTotal();
  }
  amounttwoChanges(e:any){
    this.cashOutForm.twot=0; 
    this.cashOutForm.twot=e.target.value*2;
    this.updateTotal();
  }
  amountOne0Changes(e:any){
    this.cashOutForm.one0t=0; 
    this.cashOutForm.one0t=e.target.value*10;
    this.updateTotal();
  }
  amountOneChanges(e:any){
    this.cashOutForm.onet=0; 
    this.cashOutForm.onet=e.target.value*1;
    this.updateTotal();
  }
  add(){}
  cancel(){
    this.router.navigate(['cash-out-list']);
  }
}
