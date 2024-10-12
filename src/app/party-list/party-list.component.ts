import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent {
  constructor(private router: Router, private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
	title = 'BMSFrontEnd';
	filter: any = {};
	ngOnInit(): void {
		this.getUserList();
	}
	party: any = [];
	getUserList() {
		this.api.getAllPartyFilterBased(this.filter.partyName?this.filter.partyName:'All',
			this.filter.mobileNo?this.filter.mobileNo:'All',
			this.filter.telephoneNo?this.filter.telephoneNo:'All', 
			this.filter.nicNo?this.filter.nicNo:'All',
			this.filter.contactPerson?this.filter.contactPerson:'All').subscribe((res: any) => { 
			this.party = res;
		})
	}
	addUser() {
		this.router.navigate(['party-form']);
	}
	cancel() {

	}
	getData() {

	}
	clearFilter() {

	}
	editUser(id: any) {
		this.router.navigate(['party-form/' + id]);
	}
	deleteUser(user: any) {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				//Actual logic to perform a confirmation
				this.api.deletePartyById(user.id).subscribe(res => {
					this.party = this.party.filter((item: any) => item.id !== user.id);
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
		let body = this.party.map((elemento: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(elemento));
			autoTable(doc, {
				head: head,
				body: body,
				didDrawCell: (data) => {
					data = this.party;
				},
			});

		doc.save('Gro.pdf');
	}

	exportExcel() {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(this.party);
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
