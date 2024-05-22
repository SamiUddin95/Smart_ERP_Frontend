import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-ledger',
  templateUrl: './customer-ledger.component.html',
  styleUrls: ['./customer-ledger.component.css']
})
export class CustomerLedgerComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
custLedger:any=[];
custLedgerFilter:any={};
custLedgerDtl:any=[];

ngOnInit(): void {
  this.getCustomers();
}
exportPdf(){

}
exportExcel(){

}
ledgerDialog:boolean=false;
getData(){
  if(!(this.custLedgerFilter.customerId||this.custLedgerFilter.startdate||this.custLedgerFilter.customerName)){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please fill all the required fields!" });
  }else{
    this.api.getCustomerLedgerByCustomerId(this.custLedgerFilter.customerId).subscribe(res=>{
      this.custLedgerDtl=res;
      this.ledgerDialog=true
    })
  }
}
clearFilter(){}
getcustomer:any=[];
getCustomers(){
  this.api.getAllCustomers().subscribe(res=>{
    this.getcustomer=res;
  })
}
}
