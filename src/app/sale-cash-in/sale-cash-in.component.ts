import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-sale-cash-in',
  templateUrl: './sale-cash-in.component.html',
  styleUrls: ['./sale-cash-in.component.css']
})
export class SaleCashInComponent {
  constructor(private route: ActivatedRoute,private router: Router, private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  cashInForm = {
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
formData:any={};
createCashIn(){
  this.formData.userId=this.currentUser.userId;
  this.formData.id=this.urlId?this.urlId:0;
  this.api.createCashIn(this.formData).subscribe(res=>{
    if(res.id>0){
      this.router.navigate(['cash-in-list']);
    } else
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "There should be one cash in for a day!" });

  })
}
currentUser:any={};
getCurrentUser(){
  this.api.getUserById(Number(localStorage.getItem("loginId"))).subscribe(res=>{
    this.currentUser=res[0];
    this.formData.userId=this.currentUser.name;
  })
}
updateTotal() {
  this.formData.cashInAmount = this.cashInForm.five000t + this.cashInForm.one0000t + 
                         this.cashInForm.five00t + this.cashInForm.one00t + 
                         this.cashInForm.five0t + this.cashInForm.two0t + 
                         this.cashInForm.one0t + this.cashInForm.fivet + 
                         this.cashInForm.twot + this.cashInForm.onet;
}
amountfive000Changes(e:any){  
    this.cashInForm.five000t=0; 
    this.cashInForm.five000t=e.target.value*5000;
    this.updateTotal();
  }
  amountone000Changes(e:any){ 
    this.cashInForm.one0000t=0; 
    this.cashInForm.one0000t=e.target.value*1000;
    this.updateTotal();
  }
  amountfive00Changes(e:any){
    this.cashInForm.five00t=0; 
    this.cashInForm.five00t=e.target.value*500;
    this.updateTotal();
  }
  amountone00Changes(e:any){
    this.cashInForm.one00t=0; 
    this.cashInForm.one00t=e.target.value*100;
    this.updateTotal();
  }
  amount50Changes(e:any){
    this.cashInForm.five0t=0; 
    this.cashInForm.five0t=e.target.value*50;
    this.updateTotal();
  }
  amounttwo0Changes(e:any){
    this.cashInForm.two0t=0; 
    this.cashInForm.two0t=e.target.value*20;
    this.updateTotal();
  }
  amountfiveChanges(e:any){
    this.cashInForm.fivet=0; 
    this.cashInForm.fivet=e.target.value*5;
    this.updateTotal();
  }
  amounttwoChanges(e:any){
    this.cashInForm.twot=0; 
    this.cashInForm.twot=e.target.value*2;
    this.updateTotal();
  }
  amountOne0Changes(e:any){
    this.cashInForm.one0t=0; 
    this.cashInForm.one0t=e.target.value*10;
    this.updateTotal();
  }
  amountOneChanges(e:any){
    this.cashInForm.onet=0; 
    this.cashInForm.onet=e.target.value*1;
    this.updateTotal();
  }
  add(){}
  cancel(){
    this.router.navigate(['cash-in-list']);
  }
}
