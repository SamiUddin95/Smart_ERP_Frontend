import { Component } from '@angular/core';

@Component({
  selector: 'app-sale-cash-out',
  templateUrl: './sale-cash-out.component.html',
  styleUrls: ['./sale-cash-out.component.css']
})
export class SaleCashOutComponent {
  cashOutForm:any={};

  amountfive000Changes(e:any){ 
    this.cashOutForm.five000t=0; 
    this.cashOutForm.five000t=e.target.value*5000;
  }
  amountone000Changes(e:any){ 
    this.cashOutForm.one0000t=0; 
    this.cashOutForm.one0000t=e.target.value*1000;

  }
  amountfive00Changes(e:any){
    this.cashOutForm.five00t=0; 
    this.cashOutForm.five00t=e.target.value*500;
  }
  amountone00Changes(e:any){
    this.cashOutForm.one00t=0; 
    this.cashOutForm.one00t=e.target.value*100;
  }
  amount50Changes(e:any){
    this.cashOutForm.five0t=0; 
    this.cashOutForm.five0t=e.target.value*50;
  }
  amounttwo0Changes(e:any){
    this.cashOutForm.two0t=0; 
    this.cashOutForm.two0t=e.target.value*20;
  }
  // amountone0Changes(e:any){
  //   this.cashOutForm.one0t=0; 
  //   this.cashOutForm.one0t=e.target.value*500;
  // }
  amountfiveChanges(e:any){
    this.cashOutForm.fivet=0; 
    this.cashOutForm.fivet=e.target.value*5;
  }
  amounttwoChanges(e:any){
    this.cashOutForm.twot=0; 
    this.cashOutForm.twot=e.target.value*2;
  }
  amountOne0Changes(e:any){
    this.cashOutForm.one0t=0; 
    this.cashOutForm.one0t=e.target.value*10;
  }
  amountOneChanges(e:any){
    this.cashOutForm.onet=0; 
    this.cashOutForm.onet=e.target.value*1;
  }
  add(){}
  cancel(){}
}
