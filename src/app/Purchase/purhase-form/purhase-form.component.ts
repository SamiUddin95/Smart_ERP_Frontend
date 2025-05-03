import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private api: ApiService, private messageService: MessageService,) { }
  @ViewChild('tableRef') tableRef!: ElementRef;
  formData: any = {};
  visible: boolean = false;
  childItemSearch: any;
  childItems: any = [];
  urlId: any=0;
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
  purcDtl: any[] = [];
  recentItem: any = {};
  ngOnInit(): void {
    this.urlId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCategory();
    this.getItems();
    this.getParty();
    if (this.urlId)
      this.getPurchaseById(this.urlId);
    if(!this.urlId)
      this.getMaxSerialNo();
  }
  getMaxSerialNo(){
    this.api.getPurchaseMaxSerialNo().subscribe(res=>{
      this.formData.id=res;
    })
  }
  getPurchaseById(id: number) {
    this.api.getPurchaseById(id).subscribe(res => {
      var res = JSON.parse(res);
      this.formData.id = res.purchase[0].id;
      this.formData.partyId = res.purchase[0].vendorId;
      this.formData.remarks = res.purchase[0].remarks;
      this.formData.invoiceNo = res.purchase[0].invoiceNo;
      this.purcDtl = res.purchaseDetails;
      console.log(this.purcDtl);
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
    this.router.navigate(['purchase-list']);
  }
  purchasePriceChange(user: any) {
    user.subTotal = parseFloat((user.purchasePrice * user.quantity).toFixed(2));
    user.discountByValue = parseFloat(((user.discountByValue * 100) / user.subTotal).toFixed(2));
    user.discountByPercent = parseFloat(((user.subTotal * user.discountByValue) / 100).toFixed(2));
    user.totalIncDisc = parseFloat((user.subTotal - user.discountByValue).toFixed(2));
    user.total = parseFloat((user.quantity * user.purchasePrice).toFixed(2));
    user.netTotal = user.total;
    this.purcDtl.forEach(x => {
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

  discPerChange(user: any) {
    user.discountByValue = parseFloat(((user.subTotal * user.discountByPercent) / 100).toFixed(2));
    user.totalIncDisc = parseFloat((user.subTotal - user.discountByValue).toFixed(2));
    this.purcDtl.forEach(x => {
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

  discvallueChange(user: any) {
    user.discountByPercent = parseFloat(((user.discountByValue * 100) / user.subTotal).toFixed(2));
    user.totalIncDisc = parseFloat((user.subTotal - user.discountByValue).toFixed(2));
    this.purcDtl.forEach(x => {
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
    this.purcDtl.forEach(x => {
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
    this.purcDtl.forEach(x => {
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
    this.purcDtl.forEach(x => {
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
    this.purcDtl.forEach(x => {
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
    this.netQuantity = 0;
    this.totalDisc = 0;
    this.totalGST = 0;
    this.netCostTotal = 0;
    this.netSaleTotal = 0;
    this.totalSalePrice = 0;
    this.netProfitInValue = 0;
  }

  calculateTotals() {
    this.purcDtl.forEach(x => {
      if (typeof x.netQuantity === 'number' && !isNaN(x.netQuantity)) {
        this.netQuantity += x.netQuantity;
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
    this.purcDtl.push({
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
    this.purcDtl.push({
      no: 0, barCode: '', ItemName: '', quantity: 0,
      bonusQuantity: 0, netQuantity: 0, purchasePrice: 0, subTotal: 0, discountByPercent: 0,
      discountByValue: 0, totalIncDisc: 0, gstByPercent: 0, gstByValue: 0, totalIncGst: 0, netRate: 0, salePrice: 0,
      saleDiscountByValue: 0, netSalePrice: 0, totalSalePrice: 0, marginPercent: 0
    });
  }
  RemoveData() {
    this.purcDtl = [];
    this.resetTotals();
  }
  RemoveCol(index: number) {
    this.purcDtl.splice(index, 1);
    this.resetTotals();
    this.calculateTotals();
  }
  items: any = []
  getItems() {
    this.api.getAllItemsdetails().subscribe(res => {
      this.items = res;
    })
  }
  addPurchase() {
    const requiredFields = [
      { key: 'partyId', message: 'party Name is required.' },
      { key: 'invoiceNo', message: 'Invoice No is required.' },
    ];

    for (const field of requiredFields) {
      if (!this.formData[field.key]) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: field.message });
        return;
      }
    }
    let formData: any = {
      id: this.urlId ? this.urlId : undefined,
      barCode: this.formData.barCode,
      VendorId: this.formData.partyId,
      Remarks: this.formData.remarks,
      InvoiceNo: this.formData.invoiceNo,
      purchasePrice: this.formData.purchasePrice,
      ItemsQuantity: this.totalQty,
      billTotal: this.totalNetSalePrice,
      gstByPercent: this.formData.gstByPercent,
      gstByValue: this.formData.gstByValue,
      netRate: this.formData.netRate,
      salePrice: this.formData.salePrice,
      saleDiscountByValue: this.formData.saleDiscountByValue,
      marginPercent: this.formData.marginPercent,
      netSalePrice: this.formData.netSalePrice,
      netQuantity: this.netQuantity,
      totalDisc: this.totalDisc,
      totalGST: this.totalGST,
      netCostTotal: this.netCostTotal,
      netSaleTotal: this.netSaleTotal,
      netProfitInValue: this.netProfitInValue,
      totalSaleprice: this.totalSalePrice,
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
  barCodes: string = '';
  currentStock: string = '';
  salePrice: string = '';
  purchasePrice: string = '';
  saleDisc: string = '';
  netSalePrice: string = '';
  postPurchase() {
    const name = localStorage.getItem("Name")?.toString() ?? '';
    this.api.postPurchaseNew(name, this.urlId, this.purcDtl).subscribe(res => {
        if (res.status == "OK")
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.msg });
      });
    
  }
  unPostPurchase() {
    debugger
    this.barCodes = this.purcDtl.map(x => x.barcode).join(',');
    this.purchasePrice = this.purcDtl.map(x => x.purchasePrice).join(',');
    this.salePrice = this.purcDtl.map(x => x.netSalePrice).join(',');
    this.currentStock = this.purcDtl.map(x => x.netQuantity).join(',');
    this.saleDisc = this.purcDtl.map(x => x.saleDiscountByValue).join(',');
    this.netSalePrice = this.purcDtl.map(x => x.netSalePrice).join(',');
    const name = localStorage.getItem("Name")?.toString() ?? '';
    this.api.unPostPurchase(name, this.urlId, this.barCodes, this.currentStock, this.salePrice,
      this.purchasePrice, this.saleDisc, this.netSalePrice).subscribe(res => {
        if (res.status == "OK")
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.msg });
      });
    
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
    doc.save('purchase-details-with-summary.pdf');
  }
  itemSearchDialog: boolean = false;
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
      event.preventDefault();
      this.itemSearchDialog = true;
    }
  }
  itemNotFound: boolean = false;
  itemDtl: any = [];
  searchedItemName: string = '';
  itemSearchFromDialog(e: any) {
    this.api.getAllItemsdetailsFilterbased(this.searchedItemName, 'All', 0, 0).subscribe(res => {
      this.itemDtl = res;
    });
  }
  onSearchDialogEnter(e: any) {
    this.searchedItemName = e.target.value;
    setTimeout(() => {
      this.scrollToHighlightedRow();
    }, 100);
  }
  scrollToHighlightedRow() {
    const selectedRow = document.querySelector('.highlighted') as HTMLElement;
    if (selectedRow && this.tableRef) {
      selectedRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    this.itemSearchDialog = false;
  }

  highlightedRowId: number | null = null;

  selectItemFromSearch(item: any) {
    this.highlightedRowId = item.purchaseId; // Store the ID of the selected purchase
    this.itemSearchDialog = false; // Close the search dialog
    this.searchedItemName="";
  }

}
