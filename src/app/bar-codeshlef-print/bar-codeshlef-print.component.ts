import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as JsBarcode from 'jsbarcode';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-bar-codeshlef-print',
  templateUrl: './bar-codeshlef-print.component.html',
  styleUrls: ['./bar-codeshlef-print.component.css']
})
export class BarCodeshlefPrintComponent implements AfterViewInit {
  constructor(private api: ApiService) { }

  @ViewChild('barcode', { static: false }) barcode: ElementRef<SVGElement> | undefined;
  barcodeValue: string = '';
  itemData: any = []
  ngAfterViewInit() {
    // No generation here on init
  }

  generateBarcode() {
    if (this.barcode && this.barcodeValue.trim()) {
      JsBarcode(this.barcode.nativeElement, this.barcodeValue, {
        format: 'CODE128',
        displayValue: true,
        fontSize: 18,
        height: 80,
        width: 2,
      });
    } else if (this.barcode) {
      // Clear the barcode if input is empty
      this.barcode.nativeElement.innerHTML = '';
    }
  }

  printBarcode() {
    if (this.barcode && this.barcodeValue.trim()) {
      const barcodeHtml = this.barcode.nativeElement.outerHTML;

      const printWindow = window.open('', '', 'width=600,height=400');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head><title>Print Barcode</title></head>
            <body style="text-align:center; margin-top: 50px;">
              ${barcodeHtml}
              <script>
                setTimeout(() => { window.print(); window.close(); }, 500);
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  }

  onBarcodeInputChange() {
    this.generateBarcode();
  }

  onKey(event: any, user: any) {
    user.barcode = event.target.value;
    if (user.barcode.length > 4) {
      this.api.getItemDetailbyBarCode(user.barcode).subscribe(res => {
        user.itemName = res[0].itemName;
        user.qty = 1;
        user.purchasePrice = res[0].purchasePrice;
        user.salePrice = res[0].salePrice
        user.netSalePrice = res[0].netSalePrice
      })
    }
  }
  RemoveCol(index: number) {
    this.itemData.splice(index, 1);
  }
  AddData() {
    this.itemData.push({
      no: 0, barCode: '', itemName: '', bonusQty: '',
      salePrice: 0, desc: 0, flatDesconeachQty: 0, gST: 0, gSTPer2: 0, remakrs: '', pricePrint: false
    });
  }
  RemoveData() {
    this.itemData = [];
  }

  printAllBarcodes() {
    let htmlContent = `<div class="container"><div class="row">`;
  
    this.itemData.forEach((item: any) => {
      const count = Number(item.qty) || 0;
      const barCode = item.barCode?.trim();
      if (barCode && count > 0) {
        for (let i = 0; i < count; i++) {
          const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          JsBarcode(tempSvg, barCode, {
            format: 'CODE128',
            displayValue: true,
            fontSize: 16,
            height: 60,
            width: 2,
            margin: 10
          });
  
          const serializer = new XMLSerializer();
          const svgString = serializer.serializeToString(tempSvg);
  
          htmlContent += `
            <div class="col-4 text-center mb-4">
              <div style="
                border: 1px solid #ccc;
                border-radius: 10px;
                padding: 8px;
                box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
              ">
                <div style="font-weight: bold; font-size: 18px; margin-bottom: 2px;">Saving Store</div>
                ${svgString}
                <div style="margin-top: 2px; font-size: 11px;">${barCode}</div>
                <div style="margin-top: 2px; font-size: 13px;">${item.itemName || ''}</div>
                ${
                  !item.pricePrint
                    ? `<div style="font-weight: bold; font-size: 13px; margin-top: 2px;">Price: ₹${item.salePrice || 0}</div>`
                    : ''
                }
              </div>
            </div>
          `;
        }
      }
    });
  
    htmlContent += `</div></div>`;
  
    const printWindow = window.open('', '', 'width=1000,height=800');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Barcodes</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
            <style>
              @media print {
                .col-4 {
                  page-break-inside: avoid;
                }
                svg {
                  width: 100% !important;
                }
                body {
                  margin: 0;
                  padding: 10px;
                }
              }
            </style>
          </head>
          <body>
            ${htmlContent}
            <script>
              window.onload = function() {
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }
  
  
}
