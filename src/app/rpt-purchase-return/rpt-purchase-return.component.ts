import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable, { ColumnInput } from 'jspdf-autotable';
import * as moment from 'moment';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rpt-purchase-return',
  templateUrl: './rpt-purchase-return.component.html',
  styleUrls: ['./rpt-purchase-return.component.css']
})
export class RptPurchaseReturnComponent {
  constructor(private router: Router, private http: HttpClient,private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  currentDate = new Date();
  ngOnInit(): void {
    this.currentDate.setHours(0, 0, 0, 0);
    this.filter.dateTo = moment(this?.currentDate).format('YYYY-MM-DD').toString();
    const dateFrom = moment(this?.currentDate).subtract(10, 'days').toDate();
    this.filter.dateFrom = moment(dateFrom).format('YYYY-MM-DD').toString();
    this.getbrands();
    this.getCategories();
    this.getClass();
  }
  filter: any = {
    month_id: undefined,
    shop_id: undefined,
  };
  rptData: any = [];
  getData() {
    this.filter.dateFrom = moment(this?.filter?.dateFrom).format('YYYY-MM-DD').toString();
		this.filter.dateTo = moment(this?.filter?.dateTo).format('YYYY-MM-DD').toString();
    this.api.getPurchaseReturnReport(
      this.filter?.dateFrom,
      this.filter?.dateTo,
      this.filter?.brandId ? this.filter?.brandId : 0,
      this.filter?.categoryId ? this.filter?.categoryId : 0,
      this.filter?.classId ? this.filter?.classId : 0,
      this.filter?.name ? this.filter?.name : 'All'
    ).subscribe((res: any) => {
      this.rptData = res;
    })
  }
  clearFilter() {  
    this.api.getPurchaseReport(this.filter?.dateFrom,this.filter?.dateTo,0,0,0,'All')
    .subscribe((res: any) => {
      this.rptData = res;
    })
  }
  brands: any = [];
  getbrands() {
    this.api.getAllBrandsdetails().subscribe(res => {
      this.brands = res;
    })
  }
  categories: any = [];
  getCategories() {
    this.api.getAllCategorydetails().subscribe(res => {
      this.categories = res;
    })
  }
  class: any = [];
  getClass() {
    this.api.getAllClassdetails().subscribe(res => {
      this.class = res;
    })
  }
  exportPdf() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoUrl = 'assets/Logo.png'; 

    this.getImageBase64(logoUrl).then(logoBase64 => {
      const logoWidth = 40;
      const logoHeight = 20;
      const logoX = pageWidth - logoWidth - margin;
      const logoY = margin; 
      doc.addImage(logoBase64, 'PNG', logoX, logoY, logoWidth, logoHeight); 
      const headingText = 'BASIC DATA REPORT';
      const headingX = margin;
      const headingY = margin + logoHeight / 2;

      doc.setFontSize(16);
      doc.setTextColor('#000000');
      doc.text(headingText, headingX, headingY); 
      const headingHeight = 15;
      const spaceBetweenHeadingAndTable = 5;
      const tableYPosition = headingY + headingHeight + spaceBetweenHeadingAndTable;
      const tableWidth = pageWidth - 2 * margin; 
      const head = [['ITEM S.NO', 'ITEM NAME', 'BRAND NAME', 'MANUFACTURER', 'SALE PRICE', 'PURCHASE PRICE']];
      const normalizedRptData = this.rptData.map((row: { itemname: any; brandname: any; manufacturername: any; saleprice: any; purchaseprice: any; }, index: number) => ({
        "ITEM S.NO": index + 1,
        "ITEM NAME": row.itemname,
        "BRAND NAME": row.brandname,
        "MANUFACTURER": row.manufacturername,
        "SALE PRICE": row.saleprice,
        "PURCHASE PRICE": row.purchaseprice
      }));

      const columns = [
        { header: 'ITEM S.NO', dataKey: 'ITEM S.NO' },
        { header: 'ITEM NAME', dataKey: 'ITEM NAME' },
        { header: 'BRAND NAME', dataKey: 'BRAND NAME' },
        { header: 'MANUFACTURER', dataKey: 'MANUFACTURER' },
        { header: 'SALE PRICE', dataKey: 'SALE PRICE' },
        { header: 'PURCHASE PRICE', dataKey: 'PURCHASE PRICE' }
      ];

      const options = {
        head: head,
        body: normalizedRptData.map((row: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(row)),
        startY: tableYPosition,
        styles: {
          cellPadding: 3,
          lineWidth: 0.5,
          lineColor: '#dddddd',
          fontSize: 10
        },
        columns: columns,
        margin: { left: margin, right: margin }
      };

      autoTable(doc, options);
      doc.save('Basic Data '+ new Date().getTime()+' .pdf' );
    }).catch(error => {
      console.error('Error loading image:', error);
    });
  }

  private getImageBase64(imagePath: string): Promise<string> {
    return this.http.get(imagePath, { responseType: 'blob' }).toPromise().then(blob => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    });
  }
  

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.rptData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'Basic Data');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
