import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  urlId: any;
  invoiceData: any = {  };
  getcustomer:any=[];

  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getCustomerType();
    if (this.urlId) {
      this.getInvoiceById(this.urlId);
    }
}
getInvoiceById(id: any) {
  this.api.getInvoicedetailsById(String(id)).subscribe(res => {
    this.invoiceData = res[0];
  })
}
  cancel(){
    this.router.navigate(['invoices']);
  }

  createInvoice(){
    debugger
    this.urlId?this.invoiceData.id=this.urlId:undefined;
    this.api.createInvoicedetails(this.invoiceData).subscribe(res=>{
      this.router.navigate(['invoices']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Added Successfully" });	
    },err=>{

    })
  }

  getCustomerType(){
    this.api.getAllCustomers().subscribe(res=>{
      this.getcustomer=res;
    })
  }

}
