import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  urlId: any;
  customerData: any = {  };

  paymentterms: any = [];
  
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getPaymentTerms();
    if (this.urlId) {
      this.getCustomerById(this.urlId);
    }
}
getCustomerById(id: any) {
  this.api.getCustomerById(String(id)).subscribe(res => {
    this.customerData = res[0];
  })
}
  cancel(){
    this.router.navigate(['customers']);
  }

  createCustomer(){
    debugger
    this.urlId?this.customerData.id=this.urlId:undefined;
    this.api.createCustomerdetails(this.customerData).subscribe(res=>{
      this.router.navigate(['customers']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Added Successfully" });	
    },err=>{

    })
  }

  getPaymentTerms(){
    this.api.getAllPaymentTerms().subscribe(res=>{
      this.paymentterms=res;
    })
  }
}
