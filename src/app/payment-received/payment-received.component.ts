import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment-received',
  templateUrl: './payment-received.component.html',
  styleUrls: ['./payment-received.component.css']
})
export class PaymentReceivedComponent {
  constructor(private router: Router,private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
		this.getPayReceivedList();
	}

  invoiceTypes:any=[];

  addPayreceived(){
    this.router.navigate(['payment-received-form']);
  }
  cancel() {

	}
	getData() {

	}
	clearFilter() {

	}
  editInvoice(id: any) {
		this.router.navigate(['payment-received-form/' + id]);
	}

	deletePayReceived(invoice: any) {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				//Actual logic to perform a confirmation
				this.api.deleteReceivedPaymentsById(invoice.id).subscribe(res => {
					this.payreceived = this.payreceived.filter((item: any) => item.id !== invoice.id);
					this.messageService.add({ severity: 'success', summary: 'Success', detail: "Deleted Successfully" });
					return;
				}, err => { })
			},
			reject: () => {

			}
		});
	  }

	  payreceived: any = [];

  getPayReceivedList() {
	debugger
		this.api.getAllReceivedPaymentsdetails().subscribe((res: any) => {
			this.payreceived = res.map((ele: any) => {
			  return {
        		id: ele.id,
				date: ele.date,
				receiptNo: ele.receiptNo,
				paymentNo: ele.paymentNo,
				type1: ele.type1,
				referenceNumber: ele.referenceNumber,
				customername1: ele.customername1,
				invoice1: ele.invoice1,
				mode1: ele.mode1,
				amount: ele.amount
			  };
			});
			console.log(this.payreceived);
		  });
	}
}
