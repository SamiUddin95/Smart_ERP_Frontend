import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
	selector: 'app-shop-list',
	templateUrl: './shop-list.component.html',
	styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent {
	constructor(private router: Router, private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
	title = 'BMSFrontEnd';
	ngOnInit(): void {
		this.getShopType();
		this.getShopList();
	}
	shopTypes:any=[];
	getShopType() {
		this.api.getAllShopsType().subscribe(res => {
		  this.shopTypes = res;
		})
	}
	shops: any = [];
	getShopList() {
		this.api.getAllShop().subscribe((res: any) => {
			this.shops = res.map((ele: any) => {
			  return {
				shopId: ele.shopId,
				shopTypeId:  this.shopTypes.find((item: { shopTypeId: any; }) => item.shopTypeId == ele.shopTypeId).shopType1,
				agreementTypeId: ele.agreementTypeId,
				electricityBill: ele.electricityBill,
				maintenance: ele.maintenance,
				monthRent: ele.monthRent,
				year: ele.year,
				shopName: ele.shopName,
				shopLocation:ele.shopLocation,
				shopNumber:ele.shopNumber,
				shopSize:ele.shopSize,
				agreementStartDate:ele.agreementStartDate
			  };
			});
			console.log(this.shops);
		  });
	}
	addShop() {
		this.router.navigate(['shop-form']);
	}
	cancel() {

	}
	getData() {

	}
	clearFilter() {

	}
	editShop(id: any) {
		this.router.navigate(['shop-form/' + id]);
	}
	deleteShop(shop: any) {
		console.log(shop)
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				//Actual logic to perform a confirmation
				this.api.deleteShopById(shop.shopId).subscribe(res => {
					this.shops = this.shops.filter((item: any) => item.shopId !== shop.shopId);
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
		const head = [['shopId', 'shopName', 'shopSize', 'shopLocation', 'shopTypeId', 'agreementStartDate']]
		let body = this.shops.map((elemento: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(elemento));
		autoTable(doc, {
			head: head,
			body: body,
			didDrawCell: (data) => {
				data = this.shops;
			},
		});

		doc.save('Gro.pdf');
	}
	exportExcel() {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(this.shops);
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
