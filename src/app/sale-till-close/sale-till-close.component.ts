import { Component } from '@angular/core';

@Component({
  selector: 'app-sale-till-close',
  templateUrl: './sale-till-close.component.html',
  styleUrls: ['./sale-till-close.component.css']
})
export class SaleTillCloseComponent {
  tillCloseForm:any={    
    five000: 5000,five000v: 0,    five000t: 0,    one0000: 1000,    one0000v: 0,    one0000t: 0,
    five00: 500,    five00v: 0,    five00t: 0,    one00: 100,
    one00v: 0,    one00t: 0,    five0: 50,
    five0v: 0,    five0t: 0,    two0: 20,    two0v: 0,    two0t: 0,
    one0: 10,    one0v: 0,    one0t: 0,    five: 5,    fivev: 0,
    fivet: 0,    two: 2,
    twov: 0,    twot: 0,
    one: 1,    onev: 0,
    onet: 0};
    formData:any={};
    updateTotal() {
      this.formData.amount = this.tillCloseForm.five000t + this.tillCloseForm.one0000t + 
                             this.tillCloseForm.five00t + this.tillCloseForm.one00t + 
                             this.tillCloseForm.five0t + this.tillCloseForm.two0t + 
                             this.tillCloseForm.one0t + this.tillCloseForm.fivet + 
                             this.tillCloseForm.twot + this.tillCloseForm.onet;
    }
  amountfive000Changes(e:any){ 
    this.tillCloseForm.five000t=0; 
    this.tillCloseForm.five000t=e.target.value*5000;
    this.updateTotal();
  }
  amountone000Changes(e:any){ 
    this.tillCloseForm.one0000t=0; 
    this.tillCloseForm.one0000t=e.target.value*1000;
    this.updateTotal();
  }
  amountfive00Changes(e:any){
    this.tillCloseForm.five00t=0; 
    this.tillCloseForm.five00t=e.target.value*500;
    this.updateTotal();
  }
  amountone00Changes(e:any){
    this.tillCloseForm.one00t=0; 
    this.tillCloseForm.one00t=e.target.value*100;
    this.updateTotal();
  }
  amount50Changes(e:any){
    this.tillCloseForm.five0t=0; 
    this.tillCloseForm.five0t=e.target.value*50;
    this.updateTotal();
  }
  amounttwo0Changes(e:any){
    this.tillCloseForm.two0t=0; 
    this.tillCloseForm.two0t=e.target.value*20;
    this.updateTotal();
  }
  amountfiveChanges(e:any){
    this.tillCloseForm.fivet=0; 
    this.tillCloseForm.fivet=e.target.value*5;
    this.updateTotal();
  }
  amounttwoChanges(e:any){
    this.tillCloseForm.twot=0; 
    this.tillCloseForm.twot=e.target.value*2;
    this.updateTotal();
  }
  amountOne0Changes(e:any){
    this.tillCloseForm.one0t=0; 
    this.tillCloseForm.one0t=e.target.value*10;
    this.updateTotal();
  }
  amountOneChanges(e:any){
    this.tillCloseForm.onet=0; 
    this.tillCloseForm.onet=e.target.value*1;
    this.updateTotal();
  }
  add(){}
  cancel(){}
}
