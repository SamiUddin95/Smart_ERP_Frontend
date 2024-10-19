import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-purhase-form',
  templateUrl: './purhase-form.component.html',
  styleUrls: ['./purhase-form.component.css']
})
export class PurhaseFormComponent {

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private messageService: MessageService,) { }

  formData: any = {};
  urlId: any;
  party: any = [];
  qtyPack: number = 0;
  disc: number = 0;
  totalQty: number = 0;
  totalDisc: number = 0;
  misc: number = 0;
  grandTotal: number = 0;
  return: number = 0;
  earnedPoints: number = 0;
  netAmount: number = 0;
  totalExcTax: number = 0;
  totalIncTax: number = 0;
  looseQty: number = 0;
  bonusQty: number = 0;
  flatDisc: number = 0;
  purcDtl: any[] = [];
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getCategory();
    this.getItems();
    this.getParty();
    if (this.urlId)
      this.getPurchaseById(this.urlId);
  }
  getPurchaseById(id: number) { 
    this.api.getPurchaseById(id).subscribe(res => {
      var res = JSON.parse(res);
      this.formData.partyId = res.purchase[0].vendorId;
      this.formData.remarks = res.purchase[0].remarks;
      this.formData.invoiceNo = res.purchase[0].invoiceNo;
      this.purcDtl = res.purchaseDetails;
      this.grandTotal = 0;
      this.totalExcTax = 0;
      this.totalIncTax = 0;
      this.totalQty = 0;
      this.purcDtl.forEach(x => {
        this.grandTotal += x.total;
        this.totalIncTax += x.total; // Assuming totalIncTax is same as netTotal
        this.totalExcTax += x.total; // Adjust this based on your tax logic

        if (typeof x.quantity === 'number' && !isNaN(x.quantity)) {
          this.totalQty += x.quantity;
        }
      });
    })
  }
  onKey(event: any, user: any) { 
    user.barcode = event.target.value;
    if (user.barcode.length > 4) {
      this.api.getItemDetailbyBarCode(user.barcode).subscribe(res => {
        user.ItemName = res[0].itemName;
        user.purchasePrice = res[0].purchasePrice;
        user.salePrice = res[0].salePrice
      })
    }
  }
  barCodeChange(user: any) { 


  }
  cancel() {
    this.router.navigate(['purchase-list']);
  }
  fullRateChange(purcDtl: any) {
    purcDtl.total = purcDtl.quantity * purcDtl.purchasePrice;
    purcDtl.netTotal = purcDtl.quantity * purcDtl.purchasePrice;
    this.grandTotal = 0;
    this.totalExcTax = 0;
    this.totalIncTax = 0;
    this.purcDtl.forEach(x => {
      this.grandTotal += x.total;
      this.totalIncTax += x.total;
      this.totalExcTax += x.total;
    })
  }
  discChange(purcDtl: any) {
    purcDtl.total = (purcDtl.fullRate * purcDtl.quantity) * (1 - purcDtl.disc / 100);
    this.grandTotal = 0;
    this.totalIncTax = 0;
    this.totalExcTax = 0;
    this.purcDtl.forEach(x => {
      this.grandTotal += x.total;
      this.totalIncTax += x.total;
      this.totalExcTax += x.total;
    });
  }

  flAtdiscChange(purcDtl: any) {
    purcDtl.total = purcDtl.fullRate * purcDtl.qty;
    purcDtl.total = purcDtl.total - purcDtl.flatDisc;
    this.grandTotal = 0;
    this.totalIncTax = 0;
    this.totalExcTax = 0;
    this.purcDtl.forEach(x => {
      this.grandTotal += x.total;
      this.totalIncTax += x.total;
      this.totalExcTax += x.total;
    });
  }
  qtyChange(user: any) {
    this.totalQty = 0;
    user.total = user.quantity * user.purchasePrice;
    user.netTotal = user.quantity * user.purchasePrice;
    this.grandTotal = 0;
    this.totalExcTax = 0;
    this.totalIncTax = 0;
    this.purcDtl.forEach(x => {
      if (typeof x.total === 'number' && !isNaN(x.total)) {
        this.grandTotal += x.total;
        this.totalIncTax += x.total; // Assuming tax included is the same
        this.totalExcTax += x.total; // Adjust as necessary
        if (typeof x.quantity === 'number' && !isNaN(x.quantity)) {
          this.totalQty += x.quantity;
        }
      }
    });

  }
  bonusQtyChange(user:any){
    this.totalQty = 0;
    user.total = user.quantity * user.purchasePrice;
    user.netTotal = user.quantity * user.purchasePrice;
    this.grandTotal = 0;
    this.totalExcTax = 0;
    this.totalIncTax = 0;
    this.bonusQty=0;
    this.purcDtl.forEach(x => {
      if (typeof x.total === 'number' && !isNaN(x.total)) {
        this.grandTotal += x.total;
        this.totalIncTax += x.total; // Assuming tax included is the same
        this.totalExcTax += x.total; // Adjust as necessary
        if (typeof x.quantity === 'number' && !isNaN(x.quantity)) {
          this.totalQty += x.quantity;
        }
        if (typeof x.bonusQuantity === 'number' && !isNaN(x.bonusQuantity)) {
          this.bonusQty += x.bonusQuantity;
        }
      }
    });

  }
  discountChange(user:any){
    user.total = user.quantity * user.purchasePrice;
    user.netTotal = user.quantity * user.purchasePrice;
    user.total=user.total-(user.discountByPercent/100)*user.purchasePrice;
    user.discountByValue=(user.discountByPercent/100)*user.purchasePrice;
    this.totalQty = 0;
    this.grandTotal = 0;
    this.totalExcTax = 0;
    this.totalIncTax = 0;
    this.bonusQty=0;
    this.disc=0;
    this.purcDtl.forEach(x => {
      if (typeof x.total === 'number' && !isNaN(x.total)) {
        this.grandTotal += x.total;
        this.totalIncTax += x.total; // Assuming tax included is the same
        this.totalExcTax += x.total; // Adjust as necessary
        if (typeof x.quantity === 'number' && !isNaN(x.quantity)) {
          this.totalQty += x.quantity;
        }
        if (typeof x.bonusQuantity === 'number' && !isNaN(x.bonusQuantity)) {
          this.bonusQty += x.bonusQuantity;
        }
        if (typeof x.discountByValue === 'number' && !isNaN(x.discountByValue)) {
          this.disc += x.discountByValue;
        }
      }
    });
  }
  earnedPointsChange() {
    this.netAmount = this.earnedPoints - this.return;
  }
  getParty() {
    this.api.getAllParty().subscribe(res => {
      this.party = res;
    })
  }
  PurchaseDetailModel: any[] = [];
  AddData() {
    this.purcDtl.push({
      no: 0, barCode: '', ItemName: '', bonusQty: '',
      salePrice: 0, desc: 0, flatDesconeachQty: 0, gST: 0, gSTPer2: 0, remakrs: ''
    });
  }
  RemoveData() {
    this.purcDtl = [];
    this.totalQty = 0;
    this.grandTotal = 0;
    this.totalExcTax = 0;
    this.totalIncTax = 0;
    this.bonusQty=0;
    this.disc=0;
  }
  RemoveCol(index: number) {
    this.purcDtl.splice(index, 1);
  }
  items: any = []
  getItems() {
    this.api.getAllItemsdetails().subscribe(res => {
      this.items = res;
    })
  }
  addPurchase() {
    let formData: any = {
      id: this.urlId ? this.urlId : undefined,
      barCode: this.formData.barCode,
      VendorId: this.formData.partyId,
      Remarks: this.formData.remarks,
      InvoiceNo: this.formData.invoiceNo,
      purchasePrice: this.formData.purchasePrice,
      ItemsQuantity: this.totalQty,
      billTotal: this.grandTotal,
      gstByPercent: this.formData.gstByPercent,
      gstByValue: this.formData.gstByValue,
      netRate: this.formData.netRate,
      salePrice: this.formData.salePrice,
      saleDiscountByValue: this.formData.saleDiscountByValue,
      marginPercent: this.formData.marginPercent,
      netSalePrice: this.formData.netSalePrice,
      PurchaseDetailModel: this.purcDtl
    };

    this.api.createPurchase(formData).subscribe(res => {
      if (res.msg = "Purchase Order processed successfully") {
        this.router.navigate(['purchase-list']);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Purchase Saved Successfully" });
      }
    }, err => {
      console.error("Error saving purchase", err);
    });
  }
  cat: any = [];
  getCategory() {
    this.api.getAllCategorydetails().subscribe(res => {
      this.cat = res;
    })
  }
  exportPdf() {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(16);
  doc.text('Purchase Report', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
  
    
    // Define the table headers
    const headers = [
      'No', 'Bar Code', 'Item Name', 'Quantity', 'Bonus Quantity', 'Purchase Price', 
      'Disc %', 'Disc Value', 'Total', 'GST %', 'GST Value', 'Net Rate', 'Sale Price', 
      'Sale Disc', 'Margin %', 'Net Sale Price'
    ];

    // Prepare table data
    const tableData = this.purcDtl.map(user => [
      user.no,
      user.barcode,
      user.itemName,
      user.quantity,
      user.bonusQuantity,
      user.purchasePrice,
      user.discountByPercent,
      user.discountByValue,
      user.total,
      user.gstByPercent,
      user.gstByValue,
      user.netRate,
      user.salePrice,
      user.saleDiscountByValue,
      user.marginPercent,
      user.netSalePrice
    ]);

    // Calculate totals
    const totals = {
      quantity: this.purcDtl.reduce((sum, item) => sum + (item.quantity || 0), 0),
      bonusQuantity: this.purcDtl.reduce((sum, item) => sum + (item.bonusQuantity || 0), 0),
      purchasePrice: this.purcDtl.reduce((sum, item) => sum + (item.purchasePrice || 0), 0),
      discountByPercent: this.purcDtl.reduce((sum, item) => sum + (item.discountByPercent || 0), 0),
      discountByValue: this.purcDtl.reduce((sum, item) => sum + (item.discountByValue || 0), 0),
      total: this.purcDtl.reduce((sum, item) => sum + (item.total || 0), 0),
      gstByPercent: this.purcDtl.reduce((sum, item) => sum + (item.gstByPercent || 0), 0),
      gstByValue: this.purcDtl.reduce((sum, item) => sum + (item.gstByValue || 0), 0),
      netRate: this.purcDtl.reduce((sum, item) => sum + (item.netRate || 0), 0),
      salePrice: this.purcDtl.reduce((sum, item) => sum + (item.salePrice || 0), 0),
      saleDiscountByValue: this.purcDtl.reduce((sum, item) => sum + (item.saleDiscountByValue || 0), 0),
      marginPercent: this.purcDtl.reduce((sum, item) => sum + (item.marginPercent || 0), 0),
      netSalePrice: this.purcDtl.reduce((sum, item) => sum + (item.netSalePrice || 0), 0)
    };

    // Generate main table
    autoTable(doc, {
      head: [headers],
      body: tableData,
      margin: { top: 30 }, // Add margin below the title
      styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak', halign: 'center' },
      theme: 'striped',
      didDrawPage: (dataArg) => {
        doc.text('Purchase Details', dataArg.settings.margin.left, 25);
      }
    });

    // Add a space between the tables
    doc.addPage();

    // Create the totals table
    const summaryHeaders = [
      'Quantity', 'Bonus Quantity', 'Purchase Price', 'Disc %', 'Disc Value', 'Total', 'GST %', 'GST Value', 'Net Rate', 'Sale Price', 'Sale Disc', 'Margin %', 'Net Sale Price'
    ];

    const summaryData = [[
      totals.quantity, totals.bonusQuantity, totals.purchasePrice, totals.discountByPercent, 
      totals.discountByValue, totals.total, totals.gstByPercent, totals.gstByValue, 
      totals.netRate, totals.salePrice, totals.saleDiscountByValue, totals.marginPercent, totals.netSalePrice
    ]];

    // Generate summary table
    autoTable(doc, {
      head: [summaryHeaders],
      body: summaryData,
      margin: { top: 10 },
      styles: { fontSize: 10, cellPadding: 3 },
      theme: 'grid',
      didDrawPage: (dataArg: { settings: { margin: { left: any; }; }; }) => {
        doc.text('Summary Totals', dataArg.settings.margin.left, 5);
      }
    });

    // Save the PDF
    doc.save('purchase-details-with-summary.pdf');
  }

}
