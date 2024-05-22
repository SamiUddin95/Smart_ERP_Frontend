import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']

})
export class InvoicesComponent {
  customerName: any;
  constructor(private router: Router,private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
		this.getInvoiceList();
	}
  invoiceTypes:any=[];

  addInvoice(){
    this.router.navigate(['invoice-form']);
  }
  cancel() {

	}
	getData() {

	}
	clearFilter() {

	}
  editInvoice(id: any) {
		this.router.navigate(['invoice-form/' + id]);
	}

	deleteInvoices(invoice: any) {
		debugger
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				//Actual logic to perform a confirmation
				this.api.deleteInvoicebyId(invoice.id).subscribe(res => {
					this.invoices = this.invoices.filter((item: any) => item.id !== invoice.id);
					this.messageService.add({ severity: 'success', summary: 'Success', detail: "Deleted Successfully" });
					return;
				}, err => { })
			},
			reject: () => {

			}
		});
	  }

  invoices: any = [];

  getInvoiceList() {
    debugger
		this.api.getAllInvoicedetails().subscribe((res: any) => {
			this.invoices = res.map((ele: any) => {
        debugger
			  return {
        id: ele.id,
				date: ele.date,
				invoice1: ele.invoice1,
				customer1: ele.customer1,
				status: ele.status,
				dueDate: ele.dueDate,
				amount: ele.amount,
				balanceDue:ele.balanceDue
			  };
			});
			console.log(this.invoices);
		  });
	}

	getColor(status: string): string {
		switch (status) {
		  case 'PAID':
			return 'green';
		  case 'UN-PAID':
			return 'red';
		  case 'PARTIALLY PAID':
			return 'blue';
		  default:
			return 'black'; // Default color
		}
	  }
	  

}
