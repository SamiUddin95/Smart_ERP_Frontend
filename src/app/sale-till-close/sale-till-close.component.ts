import { Component } from '@angular/core';

@Component({
  selector: 'app-sale-till-close',
  templateUrl: './sale-till-close.component.html',
  styleUrls: ['./sale-till-close.component.css']
})
export class SaleTillCloseComponent {
  tillCloseForm:any={};

  amountfive000Changes(e:any){ 
    this.tillCloseForm.five000t=0; 
    this.tillCloseForm.five000t=e.target.value*5000;
  }
  amountone000Changes(e:any){ 
    this.tillCloseForm.one0000t=0; 
    this.tillCloseForm.one0000t=e.target.value*1000;

  }
  amountfive00Changes(e:any){
    this.tillCloseForm.five00t=0; 
    this.tillCloseForm.five00t=e.target.value*500;
  }
  amountone00Changes(e:any){
    this.tillCloseForm.one00t=0; 
    this.tillCloseForm.one00t=e.target.value*100;
  }
  amount50Changes(e:any){
    this.tillCloseForm.five0t=0; 
    this.tillCloseForm.five0t=e.target.value*50;
  }
  amounttwo0Changes(e:any){
    this.tillCloseForm.two0t=0; 
    this.tillCloseForm.two0t=e.target.value*20;
  }
  // amountone0Changes(e:any){
  //   this.tillCloseForm.one0t=0; 
  //   this.tillCloseForm.one0t=e.target.value*500;
  // }
  amountfiveChanges(e:any){
    this.tillCloseForm.fivet=0; 
    this.tillCloseForm.fivet=e.target.value*5;
  }
  amounttwoChanges(e:any){
    this.tillCloseForm.twot=0; 
    this.tillCloseForm.twot=e.target.value*2;
  }
  amountOne0Changes(e:any){
    this.tillCloseForm.one0t=0; 
    this.tillCloseForm.one0t=e.target.value*10;
  }
  amountOneChanges(e:any){
    this.tillCloseForm.onet=0; 
    this.tillCloseForm.onet=e.target.value*1;
  }
  add(){}
  cancel(){}
}
