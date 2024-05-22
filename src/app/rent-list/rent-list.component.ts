import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.css']
})
export class RentListComponent  {
  constructor(private router: Router,private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  title = 'BMSFrontEnd';
  ngOnInit(): void {
	  this.getMonth();
	  this.getAgreementType();
	  this.getShops();
	  this.getRentList();
	}
	agreementTypes:any=[];
	getAgreementType(){
		this.api.getAllAgreementTypes().subscribe(res=>{
		  this.agreementTypes=res;
		})
	  }
  rents:any=[];
  getRentList(){
    this.api.getAllRentTypes().subscribe((res: any) => {
			this.rents = res.map((ele: any)=>{
				return{
					rentId:ele.rentId,
					agreementTypeId:this.agreementTypes.find((item: { agreementTypeId: any; }) => item?.agreementTypeId == ele.agreementTypeId)?.agreementName,
					monthId:this.month.find((item: { monthId: any; }) => item.monthId == ele.monthId)?.monthName,
					shopId:this.shops.find((item: { shopId: any; }) => item.shopId == ele.shopId)?.shopName,
					monthRent:ele.monthRent,
					date:ele.date,
					electricityBill:ele.electricityBill,
					maintenance:ele.maintenance,
					year:ele.year
				}
			});
	})
  }
  shops:any=[];
  getShops() {
	  this.api.getAllShop().subscribe(res => {
		this.shops = res;
	  })
  }
  month:any=[];
  getMonth() {
	  this.api.getAllMonth().subscribe(res => {
		this.month = res;
	  })
  }
  addRent(){
    this.router.navigate(['rent-form']);
  }
  cancel(){
    
  }

  getData() {

	}
	clearFilter() {

	}
	editRent(id: any) {
		
		this.router.navigate(['rent-form/' + id]);
	}
	deleteRent(rent: any) {
		debugger
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				//Actual logic to perform a confirmation
				this.api.deleteRentbyId(rent.rentId).subscribe(res => {
					this.rents = this.rents.filter((item: any) => item.rentId !== rent.rentId);
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
		const head = [['rentId', 'Shop', 'Month', 'Rent', 'Date', 'Year', 'agreementType','electricityBill','maintenace']]
		let body = this.rents.map((elemento: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(elemento));
			autoTable(doc, {
				head: head,
				body: body,
				didDrawCell: (data) => {
					data = this.rents;
				},
			});

		doc.save('Gro.pdf');
	}

	exportExcel() {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(this.rents);
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
