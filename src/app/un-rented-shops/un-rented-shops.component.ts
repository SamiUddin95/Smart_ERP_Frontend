import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-un-rented-shops',
  templateUrl: './un-rented-shops.component.html',
  styleUrls: ['./un-rented-shops.component.css']
})
export class UnRentedShopsComponent {
  constructor(private router: Router,private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
		this.getRentedShop();
    this.getShop();
    this.getMonth();
	}
  filter: any = {
		month_id: undefined,
		shop_id: undefined,
	};
  rentedShops:any=[];
  getRentedShop(){
    this.api.getUnRentedshops(this.filter).subscribe((res: any) => {
			this.rentedShops = res;
		})
  }
  getData(){
    this.api.getUnRentedshops(this.filter).subscribe((res: any) => {
			this.rentedShops = res;
		})
  }
  clearFilter(){
    this.filter={
      month_id: undefined,
      shop_id: undefined,
    }
    this.api.getUnRentedshops(this.filter).subscribe((res: any) => {
			this.rentedShops = res;
		})
  }
  shops:any=[];
  getShop(){
    this.api.getAllShop().subscribe(res=>{
      this.shops=res;
    })
  }
  months:any=[];
  getMonth(){
    this.api.getAllMonth().subscribe(res=>{
      this.months=res;
    })
  }

  exportPdf() {
		const doc = new jsPDF('l', 'mm', 'a4');
		const head = [['shopName', 'monthId', 'monthName']]
		let body = this.rentedShops.map((elemento: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(elemento));
			autoTable(doc, {
				head: head,
				body: body,
				didDrawCell: (data) => {
					data = this.rentedShops;
				},
			});

		doc.save('Gro.pdf');
	}

	exportExcel() {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(this.rentedShops);
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
