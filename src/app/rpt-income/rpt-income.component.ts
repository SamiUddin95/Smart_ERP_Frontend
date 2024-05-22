import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-rpt-income',
  templateUrl: './rpt-income.component.html',
  styleUrls: ['./rpt-income.component.css']
})
export class RptIncomeComponent {
  constructor(private router: Router,private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
		this.getIncome();
    this.getMonth();
	}
  filter: any = {
		month_id: undefined,
		shop_id: undefined,
	};
  income:any=[];
  getIncome(){
    this.api.getIncomeReport(this.filter).subscribe((res: any) => {
			this.income = res;
		})
  }
  getData(){
    this.api.getIncomeReport(this.filter).subscribe((res: any) => {
			this.income = res;
		})
  }
  clearFilter(){
    this.filter={
      month_id: undefined,
      shop_id: undefined,
    }
    this.api.getRentedshops(this.filter).subscribe((res: any) => {
			this.income = res;
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
		const head = [['rent', 'electricityBill', 'maintenance', 'totalAmount']]
		let body = this.income.map((elemento: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(elemento));
			autoTable(doc, {
				head: head,
				body: body,
				didDrawCell: (data) => {
					data = this.income;
				},
			});

		doc.save('Gro.pdf');
	}

	exportExcel() {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(this.income);
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
