import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-sales-man-list',
  templateUrl: './sales-man-list.component.html',
  styleUrls: ['./sales-man-list.component.css']
})
export class SalesManListComponent {
  constructor(private router: Router, private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
	title = 'BMSFrontEnd';
	ngOnInit(): void {
		this.getUserList();
	}
	saleMan: any = [];
	getUserList() {
		this.api.getAllSalesMan().subscribe((res: any) => { 
			this.saleMan = res;
		})
	}
	addUser() {
		this.router.navigate(['sales-man-form']);
	}
	cancel() {

	}
	getData() {

	}
	clearFilter() {

	}
	editUser(id: any) {
		this.router.navigate(['sales-man-form/' + id]);
	}
	deleteUser(user: any) {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				//Actual logic to perform a confirmation
				this.api.deleteSalesManById(user.id).subscribe(res => {
					this.saleMan = this.saleMan.filter((item: any) => item.id !== user.id);
					this.messageService.add({ severity: 'success', summary: 'Success', detail: "Deleted Successfully" });
					return;
				}, err => { })
			},
			reject: () => {

			}
		});
	}
	exportPdf() {
		const doc = new jsPDF('l', 'mm', 'a4');
		const head = [['userId', 'Name', 'Is Active', 'Name', 'Email', 'joiningDate', 'Phone']]
		let body = this.saleMan.map((elemento: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(elemento));
			autoTable(doc, {
				head: head,
				body: body,
				didDrawCell: (data) => {
					data = this.saleMan;
				},
			});

		doc.save('Gro.pdf');
	}

	exportExcel() {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(this.saleMan);
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
