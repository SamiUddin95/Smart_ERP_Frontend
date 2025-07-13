import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.css']
})
export class SaleFormComponent {
  @ViewChild('tableRef') tableRef!: ElementRef;
  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private messageService: MessageService,) { }
  formData: any = {};
  userTypes: any = [];
  genders: any = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }];
  urlId: any;
  saleDtl: any[] = [];
  grossSale: number = 0;
  disc: number = 0;
  flatDisc: number = 0;
  totalDisc: number = 0;
  misc: number = 0;
  netSaleTotal: number = 0;
  discValue: number = 0;
  discPerc: number = 0;
  grandTotal: number = 0;
  return: number = 0;
  earnedPoints: number = 0;
  cashBack: number = 0;
  cashCharged: number = 0;
  cashReceived: number = 0;
  netAmount: number = 0;
  remainingAmount: number = 0;
  finalAmount: number = 0;
  invoiceBalance: number = 0;
  invoiceType: string = "";
  invoiceTypes: any = [{ label: 'Cash', value: 'Cash' }, { label: 'Credit', value: 'Credit' }];
  displayCashWin: boolean = false;
  displayCredWin: boolean = false;
  displayModal: boolean = false;
  amountInNumber: number = 0;
  extraChargesPer: number = 0;
  extraCharges: number = 0;
  amountInWords: string = '';
  cardNumber: string = '';
  cardName: string = '';
  machineName: string = '';
  amountWords: string = '';

  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getMaxSerialNo();
    if (this.urlId) {
      this.getUserById(this.urlId);
    }
    if (!this.urlId)
      this.AddData();
  }
  convertToWords() {
    this.amountInWords = this.numberToWords(this.cashCharged);
  }
  numberToWords(num: number): string {
    if (num === 0) {
      return 'Zero';
    }

    const ones: string[] = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens: string[] = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands: string[] = ['', 'Thousand', 'Million', 'Billion'];

    let word = '';
    let i = 0;

    while (num > 0) {
      if (num % 1000 !== 0) {
        word = this.convertHundreds(num % 1000) + thousands[i] + ' ' + word;
      }
      num = Math.floor(num / 1000);
      i++;
    }

    return word.trim();
  }
  convertHundreds(num: number): string {
    const ones: string[] = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens: string[] = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    let str = '';

    if (num > 99) {
      str += ones[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }

    if (num > 19) {
      str += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    }

    if (num > 0) {
      str += ones[num] + ' ';
    }

    return str;
  }
  cashReceivedChange() {
    debugger
    if (this.cashReceived > this.grandTotal) {
      this.cashBack = this.cashReceived - this.grandTotal;
      this.cashCharged = this.grandTotal;
      this.remainingAmount = 0;
    }
    if (this.cashReceived < this.grandTotal) {
      this.cashCharged = this.cashReceived;
      this.remainingAmount = this.grandTotal - this.cashReceived;
      this.cashBack = 0;
      this.finalAmount = this.remainingAmount;
    }
    this.convertToWords();
  }

  opnCrdtWinLessAmnt() {
    if (this.cashReceived < this.grandTotal) {
      this.invoiceType = "Credit";
      this.invoiceTypeChange({ value: "Credit" });
    }
  }
  @ViewChild('cashReceivedInput') cashReceivedInput!: ElementRef;
  shouldFocusCashInput = false;

  ngAfterViewChecked(): void {
    if (this.shouldFocusCashInput && this.cashReceivedInput) {
      this.cashReceivedInput.nativeElement.focus();
      this.shouldFocusCashInput = false;
    }
  }
  opnCashCreditMdlbyShrtKey(event: KeyboardEvent): void {
    this.searchedItemName = '';
    if (event.key === 'F1') {
      event.preventDefault();
      this.openCashCreditModal();
      this.invoiceType = "Cash";
      this.invoiceTypeChange({ value: "Cash" });
    }
    if (event.key === 'F2') {
      event.preventDefault();
      this.openCashCreditModal();
      this.invoiceType = "Credit";
      this.invoiceTypeChange({ value: "Credit" });
    }
    this.shouldFocusCashInput = true;
  }

  onCashModalShow() {
    setTimeout(() => {
      if (this.invoiceType === 'Cash' && this.cashReceivedInput) {
        this.cashReceivedInput.nativeElement.focus();
      }
    }, 50);
  }

  cashChargedChange() {
    this.cashBack = this.cashReceived - this.cashCharged;
    this.invoiceBalance = this.grandTotal - this.cashCharged;
  }
  cashBackChange() {
    this.invoiceBalance = this.grandTotal - this.cashCharged;
  }
  extraChargePerChange() {
    this.extraCharges = (this.extraChargesPer / 100) * this.grandTotal;
    this.finalAmount = this.grandTotal + this.extraCharges;
    let creditDetails = this.paymentDetails.find(item => item.account === 'Credit');
    if (creditDetails) {
      creditDetails.extraChargesPer = this.extraChargesPer;
      creditDetails.extraCharges = this.extraCharges;
      creditDetails.total = this.finalAmount;
    }
  }
  extraChargeChange() {
    this.extraChargesPer = (this.extraCharges / this.grandTotal) * 100;
    this.finalAmount = this.grandTotal + this.extraCharges;
    let creditDetails = this.paymentDetails.find(item => item.account === 'Credit');
    if (creditDetails) {
      creditDetails.extraChargesPer = this.extraChargesPer;
      creditDetails.extraCharges = this.extraCharges;
      creditDetails.total = this.finalAmount;
    }
  }
  invoiceTypeChange(e: any) {
    if (e.value == "Cash") {
      this.displayCashWin = true;
      this.displayCredWin = false;

    } else if (e.value == "Credit") {
      this.displayCashWin = false;
      this.displayCredWin = true;
    }
  }
  NewData() {
    if (this.saleDtl.length == 0)
      this.ngOnInit();
    else
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please remove item first!" });
  }
  recentItem: any = {};
  salePriceGlobal: number = 0;
  saleDiscGlobal: number = 0;
  onKey(event: any, user: any) {
    user.barcode = event.target.value;
    this.searchedItemName = '';
    // if (user.barcode.length >= 2 && this.saleDtl.length > 1) {
    //   const matchedIndexes = this.saleDtl
    //     .map((item, index) => item.barcode === user.barcode ? index : -1)
    //     .filter(index => index !== -1);

    //   if (matchedIndexes.length > 1) {
    //     // Duplicate exists
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'Item already exists, please choose a different one!'
    //     });

    //     // Remove second-last duplicate
    //     const secondLastIndex = matchedIndexes[matchedIndexes.length - 2];
    //     this.saleDtl.splice(secondLastIndex, 1);
    //     return;
    //   }
    // }

    if (user.barcode.length >= 2) {
      this.api.getItemDetailbyBarCode(user.barcode).subscribe(res => {
        if (res != null) {
          user.disableBarcode = true;
          this.recentItem = res;
          user.itemName = user.ItemName = res[0]?.itemName || res[0]?.alternateItemName || res[0]?.childName;
          user.discount = res[0]?.discflat ? res[0]?.discflat : 0;
          user.salePrice = res[0]?.salePrice ? res[0]?.salePrice : 0;
          user.purchasePrice = res[0]?.purchasePrice ? res[0]?.purchasePrice : 0;
          user.qty = 1;
          this.salePriceGlobal = res[0]?.salePrice;
          this.saleDiscGlobal = res[0]?.discflat;
          setTimeout(() => {
            const currentInput = event.target as HTMLElement;
            const row = currentInput.closest('tr');
            if (row) {
              const quantityInput = row.querySelectorAll('input[appFocusNavigation]')[2] as HTMLElement;
              quantityInput?.focus();
            }
          }, 100);
          this.saleDtl.push({
            no: 0, barCode: '', itemName: '', qty: 1, disableBarcode: false,
            salePrice: 0, discount: 0, netSalePrice: 0, purchasePrice: 0
          });
          this.qtyChange(user);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "No data found" });
          return;
        }


      })
    }
  }
  getMaxSerialNo() {
    this.api.getSaleMaxSerialNo().subscribe(res => {
      this.formData.id = res;
    })
  }
  getUserById(id: any) {
    this.api.getSalesManById(String(id)).subscribe(res => {
      this.formData = res[0];
    })
  }
  qtyChange(saleDtl: any) {
    saleDtl.salePrice = this.salePriceGlobal * saleDtl.qty;
    saleDtl.discount = this.saleDiscGlobal * saleDtl.qty;
    saleDtl.netSalePrice = (saleDtl.salePrice - saleDtl.discount);
    this.resetTotal();
    this.calculateTotal();
    // if(saleDtl.qty>1){
    //   this.saleDtl.push({no:0,barCode:'',itemName:0,qty:1,
    //     salePrice:0,discount:0,netSalePrice:0});
    // }
  }
  salePriceChange(saleDtl: any) {
    debugger
    saleDtl.netSalePrice = saleDtl.salePrice - saleDtl.discount;
    this.resetTotal();
    this.calculateTotal();
  }
  discChange(saleDtl: any) {
    saleDtl.netSalePrice = (saleDtl.salePrice - saleDtl.discount);
    this.resetTotal();
    this.calculateTotal();
  }
  netSalePriceChange() {
    this.resetTotal();
    this.calculateTotal();
  }
  returnChange() {
    this.grandTotal = this.netSaleTotal - (this.return + this.flatDisc);
  }
  flatDiscChange() {
    this.grandTotal = this.netSaleTotal - (this.return + this.flatDisc);
  }
  resetTotal() {
    this.grossSale = 0;
    this.discValue = 0;
    this.grandTotal = 0;
    this.discPerc = 0;
    this.netSaleTotal = 0;
    this.remainingAmount = 0
  }
  calculateTotal() {
    this.saleDtl.forEach(x => {

      this.grossSale += x.salePrice;
      this.discValue += x.discount;
      this.netSaleTotal += x.netSalePrice;
    });
    this.discPerc = (this.netSaleTotal && this.discValue) ? parseFloat(((this.discValue / this.netSaleTotal) * 100).toFixed(2)) : 0;
    this.grandTotal = this.netSaleTotal - (this.return + this.flatDisc);
    this.remainingAmount = this.netSaleTotal - (this.return + this.flatDisc);
  }
  earnedPointsChange() {
    this.netAmount = this.earnedPoints - this.return;
  }
  AddData() {
    this.saleDtl.push({
      no: 0, barCode: '', itemName: 0, qty: 1,
      salePrice: 0, discount: 0, netSalePrice: 0
    });
  }
  RemoveData() {
    this.saleDtl = [];
    this.resetTotal();
  }
  RemoveCol(index: number) {

    this.saleDtl.splice(index, 1);
    this.resetTotal();
    this.calculateTotal();
  }
  cancel() {
    this.router.navigate(['counter-sales']);
  }
  paymentDetails = [{ account: '', amount: 0, extraChargesPer: 0, extraCharges: 0, total: 0, remarks: '' }];
  openCashCreditModal() {
    const barcodeMap = new Map<string, number[]>();
    const duplicateInfo: { row: number, itemName: string }[] = [];
    const lowPriceInfo: { row: number, itemName: string, salePrice: number, purchasePrice: number }[] = [];

    // Scan the saleDtl
    this.saleDtl.forEach((e, index) => {
      // 1. Check barcode duplicates
      if (e.barCode) {
        if (!barcodeMap.has(e.barCode)) {
          barcodeMap.set(e.barCode, []);
        }
        barcodeMap.get(e.barCode)!.push(index);
      }

      // 2. Check salePrice < purchasePrice
      if (e.salePrice < e.purchasePrice) {
        lowPriceInfo.push({
          row: index + 1,
          itemName: e.itemName,
          salePrice: e.salePrice,
          purchasePrice: e.purchasePrice
        });
      }
    });

    // Collect duplicate barcode info
    barcodeMap.forEach((indexes) => {
      if (indexes.length > 1) {
        indexes.slice(1).forEach(i => {
          duplicateInfo.push({ row: i + 1, itemName: this.saleDtl[i].itemName });
        });
      }
    });

    // Show duplicate barcode error
    if (duplicateInfo.length > 0) {
      const message = duplicateInfo.map(d => `Row ${d.row} (${d.itemName})`).join(', ');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Duplicate Items at: ' + message
      });
      return;
    }

    // Show sale price < purchase price error
    if (lowPriceInfo.length > 0) {
      const message = lowPriceInfo.map(d =>
        `Row ${d.row} (${d.itemName}) - Sale: ${d.salePrice}, Purchase: ${d.purchasePrice}`
      ).join(', ');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Sale Price less than Purchase Price at: ' + message
      });
      return;
    }

    this.displayModal = true;
    const lastItem = this.saleDtl[this.saleDtl.length - 1];
    if (lastItem.itemName === '')
      this.saleDtl.pop();
    this.paymentDetails = [];
    debugger
    this.invoiceType = "Cash";
    this.invoiceTypeChange({ value: "Cash" });
  }
  addSale() {
    debugger
    this.searchedItemName = '';
    if (this.saleDtl.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please Add Item first!" });
      return;
    }
    if ((this.cashReceived < this.grandTotal) && (this.cardNumber == "")) {
      this.displayCashWin = false;
      this.displayCredWin = true;
      // if(this.invoiceType=="Credit")
      this.paymentDetails.push({
        account: "Cash", amount: this.cashReceived, extraChargesPer: this.extraChargesPer,
        extraCharges: this.extraCharges, total: this.cashReceived, remarks: ''
      });
      // if(this.invoiceType=="Cash")
      this.paymentDetails.push({
        account: 'Credit', amount: this.remainingAmount, extraChargesPer: 0,
        extraCharges: 0, total: this.remainingAmount, remarks: ''
      });
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please fill Card Detail" });
      this.cardNumber = "Test";
      return;
    }
    if (this.cashReceived != 0 && this.remainingAmount != 0) {
      this.invoiceType = "Both";
    }


    this.urlId ? this.formData.id = this.urlId : undefined;
    let formData: any = {
      id: this.urlId ? this.formData.id = this.urlId : undefined,
      grossSale: this.grossSale,
      netSaleTotal: this.netSaleTotal,
      discountPerc: this.discPerc,
      discountValue: this.discValue,
      disc: this.disc,
      flatDisc: this.flatDisc,
      grandTotal: this.grandTotal,
      return: this.return,
      earnedPoints: this.earnedPoints,
      cashBack: this.cashBack,
      cashCharged: this.cashCharged,
      cashReceived: this.cashReceived,
      invoiceBalance: this.invoiceBalance,
      invoiceType: this.invoiceType,
      cardNumber: this.cardNumber,
      cardName: this.invoiceType,
      machineName: this.machineName,
      amountWords: this.amountInWords,
      extraChargePer: this.extraChargesPer,
      extraCharge: this.extraCharges,
      finalAmount: this.finalAmount,
      remainingCreditAmount: this.remainingAmount,
      counterSaleDetails: this.saleDtl

    }
    this.api.createCounterSale(formData).subscribe((res: any) => {
      if (res.id > 0) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Sale Detail Saved Successfully" });
        // if(this.invoiceType=="Credit")
        //   this.paymentDetails.push({account:this.cardNumber,amount:this.cashCharged,extraChargesPer:this.extraChargesPer,
        //     extraCharges:this.extraCharges,total:this.finalAmount,remarks:''});
        // if(this.invoiceType=="Cash")
        //   this.paymentDetails.push({account:'',amount:this.cashCharged,extraChargesPer:0,
        //     extraCharges:0,total:this.cashReceived,remarks:''});
        this.displayModal = false;
        this.saleDtl = [];
        this.resetTotal();
      } else if (res.id == 0) {
        this.messageService.add({ severity: 'error', summary: 'Success', detail: "Please Till Open First!" });
      }
    }, (err: any) => {

    })

  }

  saleRtnDtl: any = [];
  grossSaleReturn: number = 0;
  netSaleReturnTotal: number = 0;
  saleReturnDiscValue: number = 0;
  saleReturnDeduction: number = 0;
  grandSaleRtnTotal: number = 0;
  saleRtnDiscPerc: number = 0;
  addSaleReturnData() {
    this.saleRtnDtl.push({
      no: 0, barCode: '', itemId: 0, qty: 0, discount: 0, netSalePrice: 0,
      salePrice: 0, disc: 0, total: 0, netTotal: 0
    });
  }
  RemoveSaleReturnData() {
    this.saleRtnDtl = [];
    this.rtnResetTotal();
    this.rtnCalculateTotal();
  }
  RemoveSaleRtnCol(index: number) {
    this.saleRtnDtl.splice(index, 1);
    this.rtnResetTotal();
    this.rtnCalculateTotal();
  }
  saleReturnDeductionChange() { }
  recentRtnItem: any = {};
  rtnsalePriceGlobal: number = 0;
  rtnsaleDiscGlobal: number = 0;
  onSaleRtnKey(event: any, user: any) {
    user.barcode = event.target.value;
    if (user.barcode.length >= 2) {
      this.api.getItemDetailbyBarCode(user.barcode).subscribe(res => {
        if (res != null) {
          this.recentItem = res;
          user.ItemName = user.ItemName = res[0]?.itemName || res[0]?.alternateItemName || res[0]?.childName;
          user.purchasePrice = res[0]?.purchasePrice ? res[0]?.purchasePrice : 0;
          user.salePrice = res[0]?.salePrice || 0;
          user.discount = res[0]?.discount || 0;
          user.netSalePrice = res[0]?.netSalePrice || 0;
          this.rtnsalePriceGlobal = res[0]?.salePrice;
          this.rtnsaleDiscGlobal = res[0]?.discflat;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "No data found" });
          return;
        }


      })
    }
  }
  rtnQtyChange(saleRtnDtl: any) {
    // saleRtnDtl.total=saleRtnDtl.qty*saleRtnDtl.salePrice;
    // saleRtnDtl.netTotal=saleRtnDtl.qty*saleRtnDtl.salePrice;
    saleRtnDtl.salePrice = this.rtnsalePriceGlobal * saleRtnDtl.qty;
    saleRtnDtl.discount = this.rtnsaleDiscGlobal * saleRtnDtl.qty;
    saleRtnDtl.netSalePrice = (saleRtnDtl.salePrice - saleRtnDtl.discount);
    // saleRtnDtl.netSalePrice=saleRtnDtl.salePrice-saleRtnDtl.discount;
    this.rtnResetTotal();
    this.rtnCalculateTotal();
  }
  rtnSalePriceChange(saleRtnDtl: any) {
    saleRtnDtl.netSalePrice = saleRtnDtl.salePrice - saleRtnDtl.discount;
    this.rtnResetTotal();
    this.rtnCalculateTotal();
  }
  rtnDiscChange(saleRtnDtl: any) {
    saleRtnDtl.netSalePrice = saleRtnDtl.salePrice - saleRtnDtl.discount;
    this.rtnResetTotal();
    this.rtnCalculateTotal();
  }
  rtnResetTotal() {
    this.grossSaleReturn = 0;
    this.saleReturnDiscValue = 0;
    this.grandTotal = 0;
    this.saleRtnDiscPerc = 0;
    this.saleReturnDeduction = 0
    this.netSaleReturnTotal = 0;
    this.grandSaleRtnTotal = 0;
  }
  rtnCalculateTotal() {
    this.grossSaleReturn = 0;
    this.saleReturnDiscValue = 0;
    this.grandSaleRtnTotal = 0;
    this.saleRtnDtl.forEach((x: any) => {
      console.log(x); // Check the structure of each item
      this.grossSaleReturn += x.salePrice;
      this.saleReturnDiscValue += x.discount;
      this.netSaleReturnTotal += x.netSalePrice;
    });
    this.saleRtnDiscPerc = parseFloat(((this.saleReturnDiscValue / this.netSaleReturnTotal) * 100).toFixed(2));

    this.grandSaleRtnTotal = this.netSaleReturnTotal - this.saleReturnDeduction;
  }
  addSaleReturn() {
    this.urlId ? this.formData.id = this.urlId : undefined;
    let formData: any = {
      id: this.urlId ? this.formData.id = this.urlId : undefined,
      grossSale: this.grossSale,
      disc: this.disc,
      discByPercent: this.discPerc,
      discByValue: this.discValue,
      netSaleReturnTotal: this.netSaleReturnTotal,
      grossSaleReturn: this.grossSaleReturn,
      deduction: this.saleReturnDeduction,
      grandTotal: this.grandTotal,
      userId: Number(localStorage.getItem("loginId")),
      saleReturnDetails: this.saleRtnDtl

    }
    this.api.createSaleReturn(formData).subscribe((res: any) => {
      if (res.id > 0) {
        this.cashBack = this.grandSaleRtnTotal;
        this.saleReturnDialog = false;
      }
      debugger
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Sale Return Detail Saved Successfully" });
    }, (err: any) => {

    })

  }
  saleReturnDialog: boolean = false;
  @HostListener('document:keydown', ['$event'])

  itemSearchDialog: boolean = false;
  @HostListener('document:keydown', ['$event'])
  itemDtl: any = [];
  searchedItemName: string = '';
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
      event.preventDefault();
      this.itemSearchDialog = true;
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
      event.preventDefault();
      this.saleReturnDialog = true;
    }
  }
  itemNotFound: boolean = false;
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
    this.searchedItemName = "";
  }
  focusedField: any = null;
  setFocusedField(field: { data: any; field: string }) {
    this.focusedField = field;
  }


  clearField(): void {
    if (this.focusedField) {
      this.focusedField.data[this.focusedField.field] = 0;
    }
  }

  backspace(): void {
    if (this.focusedField) {
      let currentValue = this.focusedField.data[this.focusedField.field]?.toString() || '';
      currentValue = currentValue.slice(0, -1) || '0';
      this.focusedField.data[this.focusedField.field] = parseFloat(currentValue);
    }
  }

  addNumber(num: number): void {
    if (
      this.focusedField &&
      this.focusedField.data &&
      typeof this.focusedField.field === 'string'
    ) {
      let currentValue = this.focusedField.data[this.focusedField.field];
      currentValue = currentValue != null ? currentValue.toString() : '';
      const newValue = currentValue === '0' ? num.toString() : currentValue + num.toString();
      this.focusedField.data[this.focusedField.field] = parseFloat(newValue);
    }

    this.cashReceivedChange();
    this.cashChargedChange();
    this.cashBackChange();
  }


  addAmount(amount: number): void {
    if (
      this.focusedField &&
      this.focusedField.data &&
      typeof this.focusedField.field === 'string'
    ) {
      this.focusedField.data[this.focusedField.field] = amount;
    }
    this.cashReceivedChange();
    this.cashChargedChange();
    this.cashBackChange();
  }
  visibleProdSrchMdl: boolean = false;
  @HostListener('document:keydown.F8', ['$event'])
  onF8Pressed(event: any, user: any) {
    this.visibleProdSrchMdl = true;
  }
  childItems: any = [];
  childItemSearch: any;
  searchChildItem(barCode: string) {
    if (barCode.length > 2) {
      this.api.getAllItemDetailbyBarCode(barCode).subscribe(res => {
        this.childItems = res;
      })
    }

  }
  addChildItemToPurchaseList(item: any) {
    debugger
    this.saleDtl.push({
      no: 0, barCode: item.barCode, itemName: item.itemName, qty: 1,
      salePrice: item.salePrice, discount: 0, netSalePrice: 0
    });

  }
}
