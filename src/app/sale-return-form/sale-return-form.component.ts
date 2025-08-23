import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sale-return-form',
  templateUrl: './sale-return-form.component.html',
  styleUrls: ['./sale-return-form.component.css']
})
export class SaleReturnFormComponent {
  @ViewChild('tableRef') tableRef!: ElementRef;
  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private api: ApiService, private messageService: MessageService,) { }
  formData: any = {};
  userTypes: any = [];
  genders: any = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }];
  urlId: any;
  saleDtl: any[] = [];
  grossSale: number = 0;
  deduction: number = 0;
  disc: number = 0;
  grossSaleReturn: number = 0;
  netSaleReturnTotal: number = 0;
  discValue: number = 0;
  discPerc: number = 0;
  misc: number = 0;
  grandTotal: number = 0;
  return: number = 0;
  earnedPoints: number = 0;
  netAmount: number = 0;
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getAllItem();
    this.getParty();
    if (this.urlId) {
      this.getUserById(this.urlId);
    }
    if (!this.urlId)
      this.AddData();
  }
  recentItem: any = {};
  onKey(event: any, user: any) {
    user.barcode = event.target.value;
    if (user.barcode.length >= 2) {
      this.api.getItemDetailbyBarCode(user.barcode).subscribe(res => {
        if (res != null) {
          user.disableBarcode = true;
          this.recentItem = res;
          user.ItemName = user.ItemName = res[0]?.itemName || res[0]?.alternateItemName || res[0]?.childName;
          user.purchasePrice = res[0]?.purchasePrice ? res[0]?.purchasePrice : 0;
          user.salePrice = res[0].salePrice ? res[0].salePrice : 0;
          //user.netRate = res[0]?.salePrice;
          //user.quantity = res[0]?.qty
          setTimeout(() => {
            const currentInput = event.target as HTMLElement;
            const row = currentInput.closest('tr');
            if (row) {
              const nextRow = row.nextElementSibling as HTMLElement;
              if (nextRow) {
                const nextBarcodeInput = nextRow.querySelectorAll('input[appFocusNavigation]')[0] as HTMLInputElement;
                if (nextBarcodeInput) {
                  nextBarcodeInput.focus();
                  nextBarcodeInput.select();
                }
              }
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
  getUserById(id: any) {
    this.api.getSalesManById(String(id)).subscribe(res => {
      this.formData = res[0];
    })
  }
  qtyChange(saleDtl: any) {
    saleDtl.total = saleDtl.qty * saleDtl.salePrice;
    saleDtl.netTotal = saleDtl.qty * saleDtl.salePrice;
    saleDtl.netSalePrice = saleDtl.salePrice - saleDtl.discount;
    this.resetTotal();
    this.calculateTotal();
  }
  salePriceChange(saleDtl: any) {
    saleDtl.netSalePrice = saleDtl.salePrice - saleDtl.discount;
    this.resetTotal();
    this.calculateTotal();
  }
  discChange(saleDtl: any) {
    saleDtl.netSalePrice = saleDtl.salePrice - saleDtl.discount;
    this.resetTotal();
    this.calculateTotal();
  }
  deductionChange() {
    this.grandTotal = this.netSaleReturnTotal - this.deduction;
  }
  AddData() {
    const lastItem = this.saleDtl[this.saleDtl.length - 1];
    if (!lastItem || (lastItem.barCode && lastItem.barCode.trim() !== '')) {
      this.saleDtl.push({
        no: 0, barCode: '', itemId: 0, qty: 1, discount: 0, netSalePrice: 0, disableBarcode: false,
        salePrice: 0, disc: 0, total: 0, netTotal: 0
      });
    }

  }
  RemoveData() {
    this.saleDtl = [];
  }
  RemoveCol(index: number) {

    this.saleDtl.splice(index, 1);
  }
  cancel() {
    this.router.navigate(['sale-return-list']);
  }
  party: any = []
  getParty() {
    this.api.getAllParty().subscribe(res => {
      this.party = res;
    })
  }
  items: any = []
  getAllItem() {
    this.api.getAllItemsdetails().subscribe((res: any) => {
      this.items = res;
    })
  }
  resetTotal() {
    this.grossSaleReturn = 0;
    this.discValue = 0;
    this.grandTotal = 0;
    this.discPerc = 0;
    this.netSaleReturnTotal = 0;
  }
  calculateTotal() {
    this.grossSaleReturn = 0;
    this.discValue = 0;
    this.grandTotal = 0;
    this.saleDtl.forEach(x => {
      this.grossSaleReturn += x.salePrice;
      this.discValue += x.discount;
      this.netSaleReturnTotal += x.netSalePrice;
    });
    this.discPerc = parseFloat(((this.discValue / this.netSaleReturnTotal) * 100).toFixed(2));
    this.grandTotal = this.netSaleReturnTotal - this.deduction;
  }


  addSale() {
    this.urlId ? this.formData.id = this.urlId : undefined;
    let formData: any = {
      id: this.urlId ? this.formData.id = this.urlId : undefined,
      grossSale: this.grossSale,
      disc: this.disc,
      discByPercent: this.discPerc,
      discByValue: this.discValue,
      netSaleReturnTotal: this.netSaleReturnTotal,
      grossSaleReturn: this.grossSaleReturn,
      deduction: this.deduction,
      grandTotal: this.grandTotal,
      userId: Number(localStorage.getItem("loginId")),
      saleReturnDetails: this.saleDtl

    }
    this.api.createSaleReturn(formData).subscribe((res: any) => {
      if (res.id > 0) {
        this.saleDtl = [];
        this.saleDtl.push({
          no: 0, barCode: '', itemName: '', qty: 0, disableBarcode: false,
          salePrice: 0, discount: 0, netSalePrice: 0, purchasePrice: 0
        });
        this.resetTotal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Sale Return Posted Successfullys" });
      }

      // this.router.navigate(['sale-return-list']);
    }, (err: any) => {

    })

  }
  itemSearchDialog: boolean = false;

  itemDtl: any = [];
  searchedItemName: string = '';
  itemSearchTextBox: string = '';
  itemSearchFromDialog(e: any) {
    this.api.getAllItemsdetailsFilterbased(this.searchedItemName, 'All', 0, 0).subscribe(res => {
      this.itemDtl = res;
      this.cdr.detectChanges();
      setTimeout(() => {
        const highlightedRow = document.querySelector('tr.highlighted');
        if (highlightedRow) {
          this.itemSearchTextBox = '';
          this.itemSearchDialog = false;
          const qtyInput = highlightedRow.querySelectorAll('td input.form-control')[2] as HTMLInputElement;
          if (qtyInput) {
            qtyInput.focus();
            qtyInput.select();
            console.log("✅ Focused on Quantity input of highlighted row");
          }
        }
      }, 50);
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
  @ViewChild('searchItemInput') searchItemInput!: ElementRef;
  focusSearchInput(): void {
    setTimeout(() => {
      this.searchItemInput?.nativeElement?.focus();
    });
  }
  @ViewChild('searchProdItemInput') searchProdItemInput!: ElementRef;
  focusProductSearchInput(): void {
    setTimeout(() => {
      this.searchProdItemInput?.nativeElement?.focus();
    });
  }
  visibleProdSrchMdl: boolean = false;
  @HostListener('document:keydown.F8', ['$event'])
  onF8Pressed(event: any, user: any) {
    this.visibleProdSrchMdl = true;
  }
  childItems: any = [];
  childItemSearch: any;
  selectedChildItem: any;
  searchChildItem(barCode: string) {
    if (barCode.length > 2) {
      this.api.getAllItemDetailbyBarCode(barCode).subscribe(res => {
        this.childItems = res;
        this.selectedChildItem = this.childItems[0];
      })
    }

  }

  scrollToRow(index: number): void {
    setTimeout(() => {
      const tableBody = document.querySelector('.p-datatable-scrollable-body');
      if (!tableBody) return;

      const rows = tableBody.querySelectorAll('tr');
      const row = rows[index] as HTMLElement;
      row?.scrollIntoView({ block: 'nearest' });
    }, 10);
  }
  addChildItemToPurchaseList(item: any) {
    const lastIndex = this.saleDtl.length - 1;

    const newItem = {
      no: 0, barCode: item.barCode, itemName: item.itemName, qty: 1, salePrice: item.salePrice,
      discount: 0, netSalePrice: 0
    };

    if (this.saleDtl.length > 0 && !this.saleDtl[lastIndex].barCode) {
      this.saleDtl[lastIndex] = newItem;
    } else {
      this.saleDtl.push(newItem);
    }
    this.visibleProdSrchMdl = false;
    this.childItemSearch = "";
  }
  @HostListener('document:keydown', ['$event'])
  handleKeydownEvents(event: KeyboardEvent): void {
    // Ctrl + F opens item search dialog
    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
      event.preventDefault();
      this.itemSearchDialog = true;
      return;
    }

    // Handle F8 key to open product search
    if (event.key === 'F8') {
      event.preventDefault();
      this.visibleProdSrchMdl = true;
      return;
    }

    // Handle product search navigation
    if (this.visibleProdSrchMdl && this.childItems?.length) {
      const currentIndex = this.childItems.findIndex(
        (item: any) => item === this.selectedChildItem
      );

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % this.childItems.length;
        this.selectedChildItem = this.childItems[nextIndex];
        this.scrollToRow(nextIndex);
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        const prevIndex =
          (currentIndex - 1 + this.childItems.length) % this.childItems.length;
        this.selectedChildItem = this.childItems[prevIndex];
        this.scrollToRow(prevIndex);
      }

      if (event.key === 'Enter' && this.selectedChildItem) {
        event.preventDefault();
        this.addChildItemToPurchaseList(this.selectedChildItem);
      }
    }
  }

  newScreenData() {
    this.saleDtl = [];
    this.saleDtl.push({
      no: 0, barCode: '', itemName: '', qty: 1, disableBarcode: false,
      salePrice: 0, discount: 0, netSalePrice: 0, purchasePrice: 0
    });
    this.resetTotal();

  }
}
