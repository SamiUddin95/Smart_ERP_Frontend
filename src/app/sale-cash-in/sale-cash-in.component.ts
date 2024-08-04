import { Component } from '@angular/core';

@Component({
  selector: 'app-sale-cash-in',
  templateUrl: './sale-cash-in.component.html',
  styleUrls: ['./sale-cash-in.component.css']
})
export class SaleCashInComponent {
cashInForm:any={};

amountfive000Changes(e:any){ 
    this.cashInForm.five000t=0; 
    this.cashInForm.five000t=e.target.value*5000;
  }
  amountone000Changes(e:any){ 
    this.cashInForm.one0000t=0; 
    this.cashInForm.one0000t=e.target.value*1000;

  }
  amountfive00Changes(e:any){
    this.cashInForm.five00t=0; 
    this.cashInForm.five00t=e.target.value*500;
  }
  amountone00Changes(e:any){
    this.cashInForm.one00t=0; 
    this.cashInForm.one00t=e.target.value*100;
  }
  amount50Changes(e:any){
    this.cashInForm.five0t=0; 
    this.cashInForm.five0t=e.target.value*50;
  }
  amounttwo0Changes(e:any){
    this.cashInForm.two0t=0; 
    this.cashInForm.two0t=e.target.value*20;
  }
  // amountone0Changes(e:any){
  //   this.cashInForm.one0t=0; 
  //   this.cashInForm.one0t=e.target.value*500;
  // }
  amountfiveChanges(e:any){
    this.cashInForm.fivet=0; 
    this.cashInForm.fivet=e.target.value*5;
  }
  amounttwoChanges(e:any){
    this.cashInForm.twot=0; 
    this.cashInForm.twot=e.target.value*2;
  }
  amountOne0Changes(e:any){
    this.cashInForm.one0t=0; 
    this.cashInForm.one0t=e.target.value*10;
  }
  amountOneChanges(e:any){
    this.cashInForm.onet=0; 
    this.cashInForm.onet=e.target.value*1;
  }
  add(){}
  cancel(){}
}
