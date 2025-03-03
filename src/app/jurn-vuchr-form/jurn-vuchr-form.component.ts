import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import * as moment from 'moment';

@Component({
  selector: 'app-jurn-vuchr-form',
  templateUrl: './jurn-vuchr-form.component.html',
  styleUrls: ['./jurn-vuchr-form.component.css']
})
export class JurnVuchrFormComponent {
  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private messageService: MessageService,) { }
  formData: any = {};
  visible: boolean = false;
  childItemSearch: any;
  childItems: any = [];
  urlId: any;
  party: any = [];
  totalQty: number = 0;
  totalDisc: number = 0;
  totalNetSalePrice: number = 0;
  netAmount: number = 0;
  totalGST: number = 0;
  netQuantity: number = 0;
  netCostTotal: number = 0;
  netSaleTotal: number = 0;
  netProfitInValue: number = 0;
  totalSalePrice: number = 0;
  jurnalVuchrDtl: any[] = [];
  recentItem: any = {};
  accountBalance:number=0;
  totalAmount:number=0;
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
      this.jurnalVuchrDtl = res.purchaseDetails;
      console.log(this.jurnalVuchrDtl);
      this.resetTotals();
      this.calculateTotals();
    })
  }
  @HostListener('document:keydown.F8', ['$event'])
  onF8Pressed(event: any, user: any) {
    this.visible = true;
  }
  searchChildItem(barCode: string) {
    if (barCode.length > 2) {
      this.api.getAllItemDetailbyBarCode(barCode).subscribe(res => {
        this.childItems = res;
      })
    }

  }
  onKey(event: any, user: any) {
    user.barcode = event.target.value;
    if (user.barcode.length >= 2) {
      this.api.getItemDetailbyBarCode(user.barcode).subscribe(res => {
        if (res != null) {
          this.recentItem = res;
          user.ItemName = user.ItemName = res[0]?.itemName || res[0]?.alternateItemName || res[0]?.childName;
          user.purchasePrice = res[0]?.purchasePrice ? res[0]?.purchasePrice : 0;
          //user.netRate = res[0]?.salePrice;
          //user.quantity = res[0]?.qty
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "No data found" });
          return;
        }


      })
    }
  }
  tdChange(user: any) {
    if (user.barcode.length >= 2) {
      this.api.getItemDetailbyBarCode(user.barcode).subscribe(res => {
        this.recentItem = res;
        user.ItemName = res[0]?.itemName;
        user.purchasePrice = res[0]?.purchasePrice;
        // user.netRate = res[0]?.salePrice
      })
    }
  }
  barCodeChange(user: any) {


  }
  cancel() {
    this.router.navigate(['jurn-vuchr-list']);
  }
  purchasePriceChange(user: any) {
    user.subTotal = parseFloat((user.purchasePrice * user.quantity).toFixed(2));
    user.discountByValue = parseFloat(((user.discountByValue * 100) / user.subTotal).toFixed(2));
    user.discountByPercent = parseFloat(((user.subTotal * user.discountByValue) / 100).toFixed(2));
    user.totalIncDisc = parseFloat((user.subTotal - user.discountByValue).toFixed(2));
    user.total = parseFloat((user.quantity * user.purchasePrice).toFixed(2));
    user.netTotal = user.total;
    this.jurnalVuchrDtl.forEach(x => {
      if (typeof x.netQuantity === 'number' && !isNaN(x.netQuantity)) {
        this.netQuantity += x.netQuantity;
      }
    });
    user.totalIncGst = parseFloat((user.totalIncDisc + user.gstByValue).toFixed(2));
    user.netRate = parseFloat((user.totalIncGst / user.netQuantity).toFixed(2));
    user.salePrice = Number(user.netRate.toFixed(2));
    user.netSalePrice = parseFloat((user.salePrice - user.saleDiscountByValue).toFixed(2));
    user.totalSalePrice = parseFloat((user.netQuantity * user.netSalePrice).toFixed(2));
    user.marginPercent = parseFloat((((user.netSalePrice - user.netRate) / user.netRate) * 100).toFixed(2));
    this.resetTotals();
    this.calculateTotals();

  }

  amountChange(user: any) {
    // user.discountByValue = parseFloat(((user.subTotal * user.discountByPercent) / 100).toFixed(2));
    // user.totalIncDisc = parseFloat((user.subTotal - user.discountByValue).toFixed(2));
    // this.jurnalVuchrDtl.forEach(x => {
    //   if (typeof x.netQuantity === 'number' && !isNaN(x.netQuantity)) {
    //     this.netQuantity += x.netQuantity;
    //   }
    // });

    // user.netRate = parseFloat((user.totalIncGst / user.netQuantity).toFixed(2));
    // user.salePrice = Number(user.netRate.toFixed(2));
    // user.netSalePrice = parseFloat((user.salePrice - user.saleDiscountByValue).toFixed(2));
    // user.totalSalePrice = parseFloat((user.netQuantity * user.netSalePrice).toFixed(2));
    // user.marginPercent = parseFloat((((user.netSalePrice - user.netRate) / user.netRate) * 100).toFixed(2));
    this.resetTotals();
    this.calculateTotals();
  }

  discvallueChange(user: any) {
    user.discountByPercent = parseFloat(((user.discountByValue * 100) / user.subTotal).toFixed(2));
    user.totalIncDisc = parseFloat((user.subTotal - user.discountByValue).toFixed(2));
    this.jurnalVuchrDtl.forEach(x => {
      if (typeof x.netQuantity === 'number' && !isNaN(x.netQuantity)) {
        this.netQuantity += x.netQuantity;
      }
    });
    user.totalIncGst = parseFloat((user.totalIncDisc + user.gstByValue).toFixed(2));
    user.netRate = parseFloat((user.totalIncGst / user.netQuantity).toFixed(2));
    user.salePrice = Number(user.netRate.toFixed(2));
    user.netSalePrice = parseFloat((user.salePrice - user.saleDiscountByValue).toFixed(2));
    user.totalSalePrice = parseFloat((user.netQuantity * user.netSalePrice).toFixed(2));
    user.marginPercent = parseFloat((((user.netSalePrice - user.netRate) / user.netRate) * 100).toFixed(2));
    this.resetTotals();
    this.calculateTotals();
  }

  qtyChange(user: any) {
    user.netQuantity = parseFloat((user.quantity + user.bonusQuantity).toFixed(2));
    user.subTotal = parseFloat((user.purchasePrice * user.quantity).toFixed(2));
    user.discountByValue = isNaN(parseFloat(((user.discountByPercent * 100) / user.subTotal).toFixed(2))) ? 0 : parseFloat(((user.discountByPercent * 100) / user.subTotal).toFixed(2));
    user.discountByPercent = isNaN(parseFloat(((user.subTotal * user.discountByValue) / 100).toFixed(2))) ? 0 : parseFloat(((user.subTotal * user.discountByValue) / 100).toFixed(2));
    user.totalIncDisc = parseFloat((user.subTotal - user.discountByValue).toFixed(2));
    this.jurnalVuchrDtl.forEach(x => {
      if (typeof x.netQuantity === 'number' && !isNaN(x.netQuantity)) {
        this.netQuantity += x.netQuantity;
      }
    });
    user.totalIncGst = parseFloat((user.totalIncDisc + user.gstByValue).toFixed(2));
    user.netRate = parseFloat((user.totalIncGst / user.netQuantity).toFixed(2));
    user.salePrice = Number(user.netRate.toFixed(2));
    user.netSalePrice = parseFloat((user.salePrice - user.saleDiscountByValue).toFixed(2));
    user.totalSalePrice = parseFloat((user.netQuantity * user.netSalePrice).toFixed(2));
    user.marginPercent = parseFloat((((user.netSalePrice - user.netRate) / user.netRate) * 100).toFixed(2));
    this.resetTotals();
    this.calculateTotals();
  }

  bonusQtyChange(user: any) {
    user.netQuantity = parseFloat((user.quantity + user.bonusQuantity).toFixed(2));
    user.subTotal = parseFloat((user.purchasePrice * user.quantity).toFixed(2));
    user.discountByValue = isNaN(parseFloat(((user.discountByPercent * 100) / user.subTotal).toFixed(2))) ? 0 : parseFloat(((user.discountByPercent * 100) / user.subTotal).toFixed(2));
    user.discountByPercent = isNaN(parseFloat(((user.subTotal * user.discountByValue) / 100).toFixed(2))) ? 0 : parseFloat(((user.subTotal * user.discountByValue) / 100).toFixed(2));
    user.totalIncDisc = parseFloat((user.subTotal - user.discountByValue).toFixed(2));
    this.jurnalVuchrDtl.forEach(x => {
      if (typeof x.netQuantity === 'number' && !isNaN(x.netQuantity)) {
        this.netQuantity += x.netQuantity;
      }
    });
    user.totalIncGst = parseFloat((user.totalIncDisc + user.gstByValue).toFixed(2));
    user.netRate = parseFloat((user.totalIncGst / user.netQuantity).toFixed(2));
    user.salePrice = Number(user.netRate.toFixed(2));
    user.netSalePrice = parseFloat((user.salePrice - user.saleDiscountByValue).toFixed(2));
    user.totalSalePrice = parseFloat((user.netQuantity * user.netSalePrice).toFixed(2));
    user.marginPercent = parseFloat((((user.netSalePrice - user.netRate) / user.netRate) * 100).toFixed(2));
    this.resetTotals();
    this.calculateTotals();
  }

  discountChange(user: any) {
    user.netQuantity = parseFloat((user.quantity + user.bonusQuantity).toFixed(2));
    user.subTotal = parseFloat((user.purchasePrice * user.quantity).toFixed(2));
    user.discountByValue = parseFloat(((user.discountByPercent / 100) * user.purchasePrice).toFixed(2));
    user.discountByPercent = parseFloat(((user.subTotal * user.discountByValue) / 100).toFixed(2));
    user.totalIncDisc = parseFloat((user.subTotal - user.discountByValue).toFixed(2));
    this.jurnalVuchrDtl.forEach(x => {
      if (typeof x.netQuantity === 'number' && !isNaN(x.netQuantity)) {
        this.netQuantity += x.netQuantity;
      }
    });
    user.totalIncGst = parseFloat((user.totalIncDisc + user.gstByValue).toFixed(2));
    user.netRate = parseFloat((user.totalIncGst / user.netQuantity).toFixed(2));
    user.salePrice = Number(user.netRate.toFixed(2));
    user.netSalePrice = parseFloat((user.salePrice - user.saleDiscountByValue).toFixed(2));
    user.totalSalePrice = parseFloat((user.netQuantity * user.netSalePrice).toFixed(2));
    user.marginPercent = parseFloat((((user.netSalePrice - user.netRate) / user.netRate) * 100).toFixed(2));
    this.resetTotals();
    this.calculateTotals();

  }

  gstPerChange(user: any) {
    user.gstByValue = parseFloat(((user.gstByPercent * user.totalIncDisc) / 100).toFixed(2));
    user.totalIncGst = parseFloat((user.totalIncDisc + user.gstByValue).toFixed(2));
    user.netRate = parseFloat((user.totalIncGst / user.netQuantity).toFixed(2));
    user.salePrice = Number(user.netRate.toFixed(2));
    user.netSalePrice = parseFloat((user.salePrice - user.saleDiscountByValue).toFixed(2));
    user.totalSalePrice = parseFloat((user.netQuantity * user.netSalePrice).toFixed(2));
    user.marginPercent = parseFloat((((user.netSalePrice - user.netRate) / user.netRate) * 100).toFixed(2));
    this.resetTotals();
    this.calculateTotals();
  }

  gstValueChange(user: any) {
    user.gstByPercent = parseFloat(((user.gstByValue * 100) / user.totalIncDisc).toFixed(2));
    user.totalIncGst = parseFloat((user.totalIncDisc + user.gstByValue).toFixed(2));
    this.jurnalVuchrDtl.forEach(x => {
      if (typeof x.netQuantity === 'number' && !isNaN(x.netQuantity)) {
        this.netQuantity += x.netQuantity;
      }
    });
    user.netRate = parseFloat((user.totalIncGst / user.netQuantity).toFixed(2));
    user.salePrice = Number(user.netRate.toFixed(2));
    user.netSalePrice = parseFloat((user.salePrice - user.saleDiscountByValue).toFixed(2));
    user.totalSalePrice = parseFloat((user.netQuantity * user.netSalePrice).toFixed(2));
    user.marginPercent = parseFloat((((user.netSalePrice - user.netRate) / user.netRate) * 100).toFixed(2));
    this.resetTotals();
    this.calculateTotals();
  }

  saleDiscountByValueChange(user: any) {
    user.discountByValue = parseFloat(((user.discountByPercent / 100) * user.purchasePrice).toFixed(2));
    user.netRate = parseFloat((user.totalIncGst / user.netQuantity).toFixed(2));
    //user.salePrice = Number(user.netRate.toFixed(2));
    user.netSalePrice = parseFloat((user.salePrice - user.saleDiscountByValue).toFixed(2));
    user.totalSalePrice = parseFloat((user.netQuantity * user.netSalePrice).toFixed(2));
    user.marginPercent = parseFloat((((user.netSalePrice - user.netRate) / user.netRate) * 100).toFixed(2));
    this.resetTotals();
    this.calculateTotals();

  }

  netSalePriceChange(user: any) {
    user.netRate = parseFloat((user.totalIncGst / user.netQuantity).toFixed(2));
    //user.salePrice = Number(user.netRate.toFixed(2));
    user.netSalePrice = parseFloat((user.salePrice - user.saleDiscountByValue).toFixed(2));
    user.totalSalePrice = parseFloat((user.netQuantity * user.netSalePrice).toFixed(2));
    user.marginPercent = parseFloat((((user.netSalePrice - user.netRate) / user.netRate) * 100).toFixed(2));
    this.resetTotals();
    this.calculateTotals();
  }

  resetTotals() {
    this.formData.amount = 0;
    this.totalDisc = 0;
    this.totalGST = 0;
    this.netCostTotal = 0;
    this.netSaleTotal = 0;
    this.totalSalePrice = 0;
    this.netProfitInValue = 0;
  }

  calculateTotals() {
    this.jurnalVuchrDtl.forEach(x => {
      if (typeof x.amount === 'number' && !isNaN(x.amount)) {
        this.formData.amount += x.amount;
      }
      if (typeof x.discountByValue === 'number' && !isNaN(x.discountByValue)) {
        this.totalDisc += x.discountByValue;
      }
      if (typeof x.totalIncGst === 'number' && !isNaN(x.totalIncGst)) {
        this.totalGST += x.totalIncGst;
      }
      if (typeof x.totalIncGst === 'number' && !isNaN(x.totalIncGst)) {
        this.netCostTotal += x.totalIncGst;
        if (typeof x.totalSalePrice === 'number' && !isNaN(x.totalSalePrice)) {
          this.totalSalePrice += x.totalSalePrice;
        }
      }
    });
    this.netProfitInValue = this.netSaleTotal - this.netCostTotal;
    this.netProfitInValue = Number(Math.abs(this.netProfitInValue).toFixed(2));
  }
  addChildItemToPurchaseList(item: any) {
    this.jurnalVuchrDtl.push({
      no: 0, barcode: item.barCode, ItemName: item.itemName, quantity: 0,
      bonusQuantity: 0, netQuantity: 0, purchasePrice: 0, subTotal: 0, discountByPercent: 0,
      discountByValue: 0, totalIncDisc: 0, gstByPercent: 0, gstByValue: 0, totalIncGst: 0, netRate: 0, salePrice: 0,
      saleDiscountByValue: 0, netSalePrice: 0, totalSalePrice: 0, marginPercent: 0
    });
  }

  getParty() {
    this.api.getAllParty().subscribe(res => {
      this.party = res;
    })
  }
  salePriceChange(user: any) {
    //user.discountByValue = parseFloat(((user.discountByPercent / 100) * user.purchasePrice).toFixed(2));
    // user.netSalePrice = parseFloat(((user.salePrice * user.quantity)).toFixed(2));
    user.netSalePrice = parseFloat((user.salePrice - user.saleDiscountByValue).toFixed(2));
    user.totalSalePrice = parseFloat((user.netQuantity * user.netSalePrice).toFixed(2));
    user.marginPercent = parseFloat((((user.netSalePrice - user.netRate) / user.netRate) * 100).toFixed(2));
    this.resetTotals();
    this.calculateTotals();
  }
  marginPerentChange(user: any) {
    //user.netQuantity = parseFloat((user.quantity + user.bonusQuantity).toFixed(2));
    //user.subTotal = parseFloat((user.purchasePrice * user.quantity).toFixed(2));
    //user.discountByValue = parseFloat(((user.discountByPercent / 100) * user.purchasePrice).toFixed(2));
    //user.discountByPercent = parseFloat(((user.subTotal * user.discountByValue) / 100).toFixed(2));
    //user.totalIncDisc = parseFloat((user.subTotal - user.discountByValue).toFixed(2));
    //user.totalIncGst = parseFloat((user.totalIncDisc + user.gstByValue).toFixed(2));
    //user.netRate = parseFloat((user.totalIncGst / user.netQuantity).toFixed(2));
    user.salePrice = parseFloat((((user.netRate * user.marginPercent) / 100) + user.netRate).toFixed(2));
    user.netSalePrice = parseFloat((user.salePrice - user.saleDiscountByValue).toFixed(2));
    user.totalSalePrice = parseFloat((user.netQuantity * user.netSalePrice).toFixed(2));
    //user.marginPercent = parseFloat((((user.netSalePrice - user.netRate) / user.netSalePrice) * 100).toFixed(2));
    this.resetTotals();
    this.calculateTotals();
  }
  PurchaseDetailModel: any[] = [];
  AddData() {
    this.jurnalVuchrDtl.push({
      no: 0, barCode: '', ItemName: '', quantity: 0,
      bonusQuantity: 0, netQuantity: 0, purchasePrice: 0, subTotal: 0, discountByPercent: 0,
      discountByValue: 0, totalIncDisc: 0, gstByPercent: 0, gstByValue: 0, totalIncGst: 0, netRate: 0, salePrice: 0,
      saleDiscountByValue: 0, netSalePrice: 0, totalSalePrice: 0, marginPercent: 0
    });
  }
  RemoveData() {
    this.jurnalVuchrDtl = [];
    this.resetTotals();
  }
  RemoveCol(index: number) {
    this.jurnalVuchrDtl.splice(index, 1);
    this.resetTotals();
    this.calculateTotals();
  }
  items: any = []
  getItems() {
    this.api.getAllItemsdetails().subscribe(res => {
      this.items = res;
    })
  }
  addJurnlVuchr() {
    // const requiredFields = [
    //   { key: 'partyId', message: 'party Name is required.' },
    //   { key: 'invoiceNo', message: 'Invoice No is required.' },
    // ];

    // for (const field of requiredFields) {
    //   if (!this.formData[field.key]) {
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: field.message });
    //     return;
    //   }
    // }
    let formData: any = {
      id: this.urlId ? this.urlId : undefined,
      accountBalance: this.formData.accountBalance,
      location: this.formData.location,
      creationDate:moment(this.formData.creationDate).format('YYYY-MM-DD').toString(),
      postingDate: moment(this.formData.postingDate).format('YYYY-MM-DD').toString(),
      Amount: this.formData.amount,
      dateTime: moment(this.formData.dateTime).format('YYYY-MM-DD').toString(),
      CreatedBy: this.formData.CreatedBy,
      postedBy: this.formData.postedBy,
      Description: this.formData.description,
      ReferenceNo: this.formData.referenceNo,
      jurnlVuchrDtl: this.jurnalVuchrDtl
    };

    this.api.createJournalVoucher(formData).subscribe(res => {
      if (res.id >0) {
        this.router.navigate(['jurn-vuchr-list']);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Journal Voucher Saved Successfully" });
      }
    }, err => {
      console.error("Error saving Journal Voucher", err);
    });
  }
  cat: any = [];
  getCategory() {
    this.api.getAllCategorydetails().subscribe(res => {
      this.cat = res;
    })
  }
  barCodes: string = '';
  currentStock: string = '';
  salePrice: string = '';
  purchasePrice: string = '';
  saleDisc: string = '';
  netSalePrice: string = '';
  postPurchase() {
    this.barCodes = this.jurnalVuchrDtl.map(x => x.barcode).join(',');
    this.purchasePrice = this.jurnalVuchrDtl.map(x => x.purchasePrice).join(',');
    this.salePrice = this.jurnalVuchrDtl.map(x => x.netSalePrice).join(',');
    this.currentStock = this.jurnalVuchrDtl.map(x => x.netQuantity).join(',');
    this.saleDisc = this.jurnalVuchrDtl.map(x => x.saleDiscountByValue).join(',');
    this.netSalePrice = this.jurnalVuchrDtl.map(x => x.netSalePrice).join(',');
    this.api.postPurchase(this.barCodes, this.currentStock, this.salePrice,
      this.purchasePrice, this.saleDisc, this.netSalePrice).subscribe(res => {
        if (res.status == "OK")
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.msg });
      })
  }
  exportPdf() {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(16);
    doc.text('Purchase Report', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
    const headers = [
      'No', 'Bar Code', 'Item Name', 'Quantity', 'Bonus Quantity', 'Purchase Price',
      'Disc %', 'Disc Value', 'Total', 'GST %', 'GST Value', 'Net Rate', 'Sale Price',
      'Sale Disc', 'Margin %', 'Net Sale Price'
    ];
    const tableData = this.jurnalVuchrDtl.map(user => [
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
    const totals = {
      quantity: this.jurnalVuchrDtl.reduce((sum, item) => sum + (item.quantity || 0), 0),
      bonusQuantity: this.jurnalVuchrDtl.reduce((sum, item) => sum + (item.bonusQuantity || 0), 0),
      purchasePrice: this.jurnalVuchrDtl.reduce((sum, item) => sum + (item.purchasePrice || 0), 0),
      discountByPercent: this.jurnalVuchrDtl.reduce((sum, item) => sum + (item.discountByPercent || 0), 0),
      discountByValue: this.jurnalVuchrDtl.reduce((sum, item) => sum + (item.discountByValue || 0), 0),
      total: this.jurnalVuchrDtl.reduce((sum, item) => sum + (item.total || 0), 0),
      gstByPercent: this.jurnalVuchrDtl.reduce((sum, item) => sum + (item.gstByPercent || 0), 0),
      gstByValue: this.jurnalVuchrDtl.reduce((sum, item) => sum + (item.gstByValue || 0), 0),
      netRate: this.jurnalVuchrDtl.reduce((sum, item) => sum + (item.netRate || 0), 0),
      salePrice: this.jurnalVuchrDtl.reduce((sum, item) => sum + (item.salePrice || 0), 0),
      saleDiscountByValue: this.jurnalVuchrDtl.reduce((sum, item) => sum + (item.saleDiscountByValue || 0), 0),
      marginPercent: this.jurnalVuchrDtl.reduce((sum, item) => sum + (item.marginPercent || 0), 0),
      netSalePrice: this.jurnalVuchrDtl.reduce((sum, item) => sum + (item.netSalePrice || 0), 0)
    };
    autoTable(doc, {
      head: [headers],
      body: tableData,
      margin: { top: 30 },
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
    doc.save('journal-voucher.pdf');
  }

}
