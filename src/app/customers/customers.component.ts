import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  constructor(private router: Router,private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
		this.getCustomerList();
	}
  customersTypes:any=[];

  addCustomer(){
    this.router.navigate(['customerform']);
  }
  cancel() {

	}
	getData() {

	}
	clearFilter() {

	}
  editCustomers(id: any) {
		this.router.navigate(['customerform/' + id]);
	}

	deleteCustomers(customer: any) {
		debugger
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				this.api.deleteCustomerbyId(customer.id).subscribe(res => {
					this.customers = this.customers.filter((item: any) => item.id !== customer.id);
					this.messageService.add({ severity: 'success', summary: 'Success', detail: "Deleted Successfully" });
					return;
				}, err => { })
			},
			reject: () => {

			}
		});
	  }

  customers: any = [];
  getCustomerList() {
    debugger
		this.api.getAllCustomers().subscribe((res: any) => {
			this.customers = res.map((ele: any) => {
        debugger
			  return {
        id: ele.id,
				code: ele.code,
				shopName: ele.shopName,
				shopNumber: ele.shopNumber,
				contactperson: ele.contactperson,
				billTo: ele.billTo,
				shipTo: ele.shipTo,
				email:ele.email,
				phone:ele.phone,
				customerBalance:ele.customerBalance,
				paymentterms:ele.paymentTerms,
        bankDetails:ele.bankDetails,
        facebook:ele.facebook,
        instagram:ele.instagram,
        tiktok:ele.tiktok,
        linkedin:ele.linkedin,
        twitter:ele.twitter,
        website:ele.website
			  };
			});
			console.log(this.customers);
		  });
	}
}
