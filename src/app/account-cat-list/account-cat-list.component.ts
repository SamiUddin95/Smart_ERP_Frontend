import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-account-cat-list',
  templateUrl: './account-cat-list.component.html',
  styleUrls: ['./account-cat-list.component.css']
})
export class AccountCatListComponent {
  constructor(private router: Router, private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
	title = 'BMSFrontEnd';
	ngOnInit(): void {
		this.getUserList();
	}
	accCat: any = [];
	getUserList() {
		this.api.getAllAccountCat().subscribe((res: any) => { 
			this.accCat = res;
		})
	}
	addUser() {
		this.router.navigate(['account-cat-form']);
	}
	cancel() {

	}
	getData() {

	}
	clearFilter() {

	}
	editUser(id: any) {
		this.router.navigate(['account-cat-form/' + id]);
	}
	deleteUser(user: any) {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				//Actual logic to perform a confirmation
				this.api.deleteUserById(user.userId).subscribe(res => {
					this.accCat = this.accCat.filter((item: any) => item.userId !== user.userId);
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
		let body = this.accCat.map((elemento: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(elemento));
			autoTable(doc, {
				head: head,
				body: body,
				didDrawCell: (data) => {
					data = this.accCat;
				},
			});

		doc.save('Gro.pdf');
	}

	exportExcel() {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(this.accCat);
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
