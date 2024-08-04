import { Component } from '@angular/core';

@Component({
  selector: 'app-sale-till-open',
  templateUrl: './sale-till-open.component.html',
  styleUrls: ['./sale-till-open.component.css']
})
export class SaleTillOpenComponent {
  tillOpenForm:any={};

  amountfive000Changes(e:any){ 
    this.tillOpenForm.five000t=0; 
    this.tillOpenForm.five000t=e.target.value*5000;
  }
  amountone000Changes(e:any){ 
    this.tillOpenForm.one0000t=0; 
    this.tillOpenForm.one0000t=e.target.value*1000;

  }
  amountfive00Changes(e:any){
    this.tillOpenForm.five00t=0; 
    this.tillOpenForm.five00t=e.target.value*500;
  }
  amountone00Changes(e:any){
    this.tillOpenForm.one00t=0; 
    this.tillOpenForm.one00t=e.target.value*100;
  }
  amount50Changes(e:any){
    this.tillOpenForm.five0t=0; 
    this.tillOpenForm.five0t=e.target.value*50;
  }
  amounttwo0Changes(e:any){
    this.tillOpenForm.two0t=0; 
    this.tillOpenForm.two0t=e.target.value*20;
  }
  // amountone0Changes(e:any){
  //   this.tillOpenForm.one0t=0; 
  //   this.tillOpenForm.one0t=e.target.value*500;
  // }
  amountfiveChanges(e:any){
    this.tillOpenForm.fivet=0; 
    this.tillOpenForm.fivet=e.target.value*5;
  }
  amounttwoChanges(e:any){
    this.tillOpenForm.twot=0; 
    this.tillOpenForm.twot=e.target.value*2;
  }
  amountOne0Changes(e:any){
    this.tillOpenForm.one0t=0; 
    this.tillOpenForm.one0t=e.target.value*10;
  }
  amountOneChanges(e:any){
    this.tillOpenForm.onet=0; 
    this.tillOpenForm.onet=e.target.value*1;
  }
  add(){}
  cancel(){}
}
