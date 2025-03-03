import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sale-till-open',
  templateUrl: './sale-till-open.component.html',
  styleUrls: ['./sale-till-open.component.css']
})
export class SaleTillOpenComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }

  urlId: any;
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id'); 
    this.getCurrentUser();
  }
  createSaleTIll(){
    this.formData.userId=this.currentUser.userId;
    this.formData.id=this.urlId?this.urlId:0;
    this.api.createSaleTillOpen(this.formData).subscribe(res=>{
      if(res.id>0){
        this.router.navigate(['till-open-list']);
      } else
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "There should be one sale open for a day!" });

    })
  }
  currentUser:any={};
  getCurrentUser(){
    this.api.getUserById(Number(localStorage.getItem("loginId"))).subscribe(res=>{
      this.currentUser=res[0];
      this.formData.userId=this.currentUser.name;
    })
  }
  tillOpenForm:any={    five000: 5000,five000v: 0,    five000t: 0,    one0000: 1000,    one0000v: 0,    one0000t: 0,
    five00: 500,    five00v: 0,    five00t: 0,    one00: 100,
    one00v: 0,    one00t: 0,    five0: 50,
    five0v: 0,    five0t: 0,    two0: 20,    two0v: 0,    two0t: 0,
    one0: 10,    one0v: 0,    one0t: 0,    five: 5,    fivev: 0,
    fivet: 0,    two: 2,    twov: 0,    twot: 0,    one: 1,    onev: 0,
    onet: 0};
    formData:any={};
    updateTotal() {
      this.formData.tillOpenAmount = this.tillOpenForm.five000t + this.tillOpenForm.one0000t + 
                             this.tillOpenForm.five00t + this.tillOpenForm.one00t + 
                             this.tillOpenForm.five0t + this.tillOpenForm.two0t + 
                             this.tillOpenForm.one0t + this.tillOpenForm.fivet + 
                             this.tillOpenForm.twot + this.tillOpenForm.onet;
    }
  amountfive000Changes(e:any){ 
    this.tillOpenForm.five000t=0; 
    this.tillOpenForm.five000t=e.target.value*5000;
    this.updateTotal();
  }
  amountone000Changes(e:any){ 
    this.tillOpenForm.one0000t=0; 
    this.tillOpenForm.one0000t=e.target.value*1000;
    this.updateTotal();
  }
  amountfive00Changes(e:any){
    this.tillOpenForm.five00t=0; 
    this.tillOpenForm.five00t=e.target.value*500;
    this.updateTotal();
  }
  amountone00Changes(e:any){
    this.tillOpenForm.one00t=0; 
    this.tillOpenForm.one00t=e.target.value*100;
    this.updateTotal();
  }
  amount50Changes(e:any){
    this.tillOpenForm.five0t=0; 
    this.tillOpenForm.five0t=e.target.value*50;
    this.updateTotal();
  }
  amounttwo0Changes(e:any){
    this.tillOpenForm.two0t=0; 
    this.tillOpenForm.two0t=e.target.value*20;
    this.updateTotal();
  }
  amountfiveChanges(e:any){
    this.tillOpenForm.fivet=0; 
    this.tillOpenForm.fivet=e.target.value*5;
    this.updateTotal();
  }
  amounttwoChanges(e:any){
    this.tillOpenForm.twot=0; 
    this.tillOpenForm.twot=e.target.value*2;
    this.updateTotal();
  }
  amountOne0Changes(e:any){
    this.tillOpenForm.one0t=0; 
    this.tillOpenForm.one0t=e.target.value*10;
    this.updateTotal();
  }
  amountOneChanges(e:any){
    this.tillOpenForm.onet=0; 
    this.tillOpenForm.onet=e.target.value*1;
    this.updateTotal();
  }
  add(){}
  cancel(){
    this.router.navigate(['till-open-list']);
  }
}
