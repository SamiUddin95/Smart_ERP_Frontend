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


interface InvoiceItem {
  barcode: string;
  description: string;
  quantity: number;
  purchaseUnit: number;
  price: number;
  discountPercentage: number;
  flatDiscount: number;
  gst: number;
  value: number;
  netRate: number;
  netTotal: number;
}

interface Invoice {
  invoiceNumber: string;
  party: string;
  invoiceType: string;
  date: string;
  userName: string;
  remarks: string;
  amountInWords: string;
  total: number;
  gst: number;
  discPercentageValue: number;
  discFlat: number;
  discFlat2: number;
  misc: number;
  misc2: number;
  items: InvoiceItem[];
  page: number;
}


@Component({
  selector: 'app-rpt-purchase',
  templateUrl: './rpt-purchase.component.html',
  styleUrls: ['./rpt-purchase.component.css']
})

export class RptPurchaseComponent {
  constructor(private router: Router, private http: HttpClient,private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  currentDate = new Date();
  invoices: Invoice[] = [];
  ngOnInit(): void {
    this.currentDate.setHours(0, 0, 0, 0);
    this.filter.dateTo = moment(this?.currentDate).format('YYYY-MM-DD').toString();
    const dateFrom = moment(this?.currentDate).subtract(10, 'days').toDate();
    this.filter.dateFrom = moment(dateFrom).format('YYYY-MM-DD').toString();
    this.getbrands();
    this.getCategories();
    this.getClass();
  }
  filter: any = {};
  rptData: any = [];
  getData() {
    this.filter.dateFrom = moment(this?.filter?.dateFrom).format('YYYY-MM-DD').toString();
		this.filter.dateTo = moment(this?.filter?.dateTo).format('YYYY-MM-DD').toString();
    this.api.getPurchaseReport(
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
  isPrint:boolean=false;
  exportPdf() { 
    this.isPrint = true; 
    this.invoices = [
      {
        invoiceNumber: '6,370',
        party: 'VISION MARKETING (VITAL TEA)',
        invoiceType: 'Credit',
        date: '01-Oct-2024 13:22',
        userName: 'DANISH',
        remarks: 'Post Y',
        amountInWords: 'Eleven Thousand Four Hundred Twenty-Seven Only',
        total: 11427,
        gst: 0.00,
        discPercentageValue: 0.00,
        discFlat: 0.00,
        discFlat2: 0.00,
        misc: 0.00,
        misc2: 0.00,
        items: [
          { barcode: '8964000008027', description: 'VITAL TEA POUCH 475G', quantity: 1, purchaseUnit: 825, price: 825, discountPercentage: 2.50, flatDiscount: 0, gst: 0, value: 804.38, netRate: 804.38, netTotal: 4826.25 },
          { barcode: '8964000008072', description: 'VITAL TEA 385G', quantity: 2, purchaseUnit: 680, price: 680, discountPercentage: 2.50, flatDiscount: 0, gst: 0, value: 663, netRate: 663, netTotal: 1326 }
        ],
        page: 1
      },
      {
        invoiceNumber: '6,371',
        party: 'ABC MARKETING',
        invoiceType: 'Credit',
        date: '02-Oct-2024 14:22',
        userName: 'ALI',
        remarks: 'Post Z',
        amountInWords: 'Twenty Thousand Five Hundred Only',
        total: 20500,
        gst: 500.00,
        discPercentageValue: 2.00,
        discFlat: 200.00,
        discFlat2: 100.00,
        misc: 0.00,
        misc2: 0.00,
        items: [
          { barcode: '8964000009123', description: 'ABC TEA POUCH 250G', quantity: 3, purchaseUnit: 550, price: 550, discountPercentage: 2.00, flatDiscount: 10, gst: 50, value: 540, netRate: 540, netTotal: 1650 },
          { barcode: '8964000009150', description: 'ABC TEA 1KG', quantity: 1, purchaseUnit: 1050, price: 1050, discountPercentage: 3.00, flatDiscount: 25, gst: 100, value: 1020, netRate: 1020, netTotal: 1050 }
        ],
        page: 2
      },      {
        invoiceNumber: '6,370',
        party: 'VISION MARKETING (VITAL TEA)',
        invoiceType: 'Credit',
        date: '01-Oct-2024 13:22',
        userName: 'DANISH',
        remarks: 'Post Y',
        amountInWords: 'Eleven Thousand Four Hundred Twenty-Seven Only',
        total: 11427,
        gst: 0.00,
        discPercentageValue: 0.00,
        discFlat: 0.00,
        discFlat2: 0.00,
        misc: 0.00,
        misc2: 0.00,
        items: [
          { barcode: '8964000008027', description: 'VITAL TEA POUCH 475G', quantity: 1, purchaseUnit: 825, price: 825, discountPercentage: 2.50, flatDiscount: 0, gst: 0, value: 804.38, netRate: 804.38, netTotal: 4826.25 },
          { barcode: '8964000008072', description: 'VITAL TEA 385G', quantity: 2, purchaseUnit: 680, price: 680, discountPercentage: 2.50, flatDiscount: 0, gst: 0, value: 663, netRate: 663, netTotal: 1326 }
        ],
        page: 1
      },
      {
        invoiceNumber: '6,371',
        party: 'ABC MARKETING',
        invoiceType: 'Credit',
        date: '02-Oct-2024 14:22',
        userName: 'ALI',
        remarks: 'Post Z',
        amountInWords: 'Twenty Thousand Five Hundred Only',
        total: 20500,
        gst: 500.00,
        discPercentageValue: 2.00,
        discFlat: 200.00,
        discFlat2: 100.00,
        misc: 0.00,
        misc2: 0.00,
        items: [
          { barcode: '8964000009123', description: 'ABC TEA POUCH 250G', quantity: 3, purchaseUnit: 550, price: 550, discountPercentage: 2.00, flatDiscount: 10, gst: 50, value: 540, netRate: 540, netTotal: 1650 },
          { barcode: '8964000009150', description: 'ABC TEA 1KG', quantity: 1, purchaseUnit: 1050, price: 1050, discountPercentage: 3.00, flatDiscount: 25, gst: 100, value: 1020, netRate: 1020, netTotal: 1050 }
        ],
        page: 2
      }
    ];
    setTimeout(() => {
      const printArea = document.querySelector('.print-area'); 
      if (printArea) {
        html2canvas(printArea as HTMLElement).then(canvas => {
          const pdf = new jsPDF('p', 'mm', 'a4'); // Initialize jsPDF
          const imgData = canvas.toDataURL('image/png'); // Convert canvas to image
          
          const imgWidth = 210; // A4 width in mm
          const pageHeight = 295; // A4 height in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
  
          let position = 0;
  
          // First page
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
  
          // Add more pages if necessary
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
  
          pdf.save('purchase-report.pdf'); 
          this.isPrint=false;
        });
      }
    }, 1000);
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
