import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment-received-form',
  templateUrl: './payment-received-form.component.html',
  styleUrls: ['./payment-received-form.component.css']
})
export class PaymentReceivedFormComponent {
  filteredInvoices: any;
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  urlId: any;
  payrecivedData: any = {  };
  getcustomer:any=[];
  getinvoice:any=[];
  getpaymenttype:any=[];
  getpaymentmode:any=[];
  getinvdetlsbycus:any=[];

  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getCustomerType();
    this.getInvoiceType();
    this.getPaymentType();
    this.getPaymentMode();
    if (this.urlId) {
      this.getPayreceivedById(this.urlId);
    }
}
getPayreceivedById(id: any) {
  this.api.getReceivedPaymentsById(String(id)).subscribe(res => {
    this.payrecivedData = res[0];
  })
}
  cancel(){
    this.router.navigate(['paymentreceived']);
  }

  createPayReceived(){
    debugger
    this.urlId?this.payrecivedData.id=this.urlId:undefined;
    this.api.createReceivedPayments(this.payrecivedData).subscribe(res=>{
      this.router.navigate(['paymentreceived']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Added Successfully" });	
    },err=>{

    })
  }

  getCustomerType(){
    this.api.getAllCustomers().subscribe(res=>{
      this.getcustomer=res;
    })
  }
  getInvoiceNumByCustomer(e:any){
    this.api.getbyinvoicedetailsbycustomer(e.value).subscribe(res=>{
      this.getinvoice=res;
    })
  }

  getInvoiceType(){
    this.api.getAllInvoicedetails().subscribe(res=>{
      this.getinvoice=res;
    })
}

getPaymentType(){
  this.api.getAllPaymentTypes().subscribe(res=>{
    this.getpaymenttype=res;
  })
}

getPaymentMode(){
  this.api.getAllPaymentModes().subscribe(res=>{
    this.getpaymentmode=res;
  })
}


}
