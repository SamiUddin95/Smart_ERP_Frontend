import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-purc-order-dashboard',
  templateUrl: './purc-order-dashboard.component.html',
  styleUrls: ['./purc-order-dashboard.component.css']
})
export class PurcOrderDashboardComponent {
  constructor(private router: Router, private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
	selectedRows: any[] = [];
	ngOnInit(): void {
		this.getUserList();
	}
	purchOrder: any = [];
	getUserList() { 	
		this.api.getAllPurchaseOrderDashboard().subscribe((res: any) => { 
			this.purchOrder = res;
		})
	}
	cancel() {

	}
	getData() {

	}
	clearFilter() {

	}
	ChangeDeliveryStatus(){
		let ids:string="";
		this.selectedRows.forEach(x=>{
			ids+=x.id+",";
		})
		ids = ids.slice(0, -1);
		this.api.changeDeliveryStatus(ids).subscribe(res=>{
			
		})
	}
	exportPdf() {
		const doc = new jsPDF('l', 'mm', 'a4');
		const head = [['userId', 'Name', 'Is Active', 'Name', 'Email', 'joiningDate', 'Phone']]
		let body = this.purchOrder.map((elemento: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(elemento));
			autoTable(doc, {
				head: head,
				body: body,
				didDrawCell: (data) => {
					data = this.purchOrder;
				},
			});

		doc.save('Gro.pdf');
	}

	exportExcel() {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(this.purchOrder);
			const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
			const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
			this.saveAsExcelFile(excelBuffer, 'products');
		});
	}

	saveAsExcelFile(buffer: any, fileName: string): void {
		let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
		let EXCEL_EXTENSION = '.xlsx';
		const data: Blob = new Blob([buffer], {
			type: EXCEL_TYPE
		});
		FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
	}
}
