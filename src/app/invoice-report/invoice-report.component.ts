import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.css']
})
export class InvoiceReportComponent {
  constructor(private router: Router, private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.getInvoiceCustomer();
  }

  custInvoices:any=[];
  getInvoiceCustomer() {
    this.api.getInvoicedetailsByCustomerId(2003).subscribe(res=>{
		this.custInvoices=res;
	})
  }
}
