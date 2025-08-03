import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})

export class ItemFormComponent {
@ViewChild('tableRef') tableRef!: ElementRef;
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService, private confirmationService: ConfirmationService, private http: HttpClient) { }
  status:any=[{label:"Active",value:1},{label:"Not Active",value:0}];
  formData: any = {  };
  alternateItems: any = [];
  urlId: any;
  childParentData: any={ };
  uomOptions: string[] = ['Gm', 'Kg', 'Ltr', 'ml', 'Ctn', 'Box', 'Pack','Loose','Pcs']; 
  selectedUOM: string = 'Kg'; 
  selectedChildUOM: string = 'Kg';
  selectedWeight: number = 1;
  get combinedItemInfo(): string {
    // return `${this.formData.itemName} ${this.selectedWeight} ${this.selectedUOM}`;
    return `${this.formData.itemName}`;
  }

  pictureUrl: string | undefined;
  selectedFile: File | null = null;
  onFileSelected(event: any) {
    debugger
    const file: File = event.target.files[0];
    if (file) {
      // Optional: Add validation for file type and size
      const validTypes = ['image/jpeg', 'image/png'];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB limit

      if (!validTypes.includes(file.type)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Only JPEG and PNG images are allowed.',
        });
        this.selectedFile = null;
      } else if (file.size > maxSizeInBytes) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'File size exceeds 5MB limit.',
        });
        this.selectedFile = null;
      } else {
        this.selectedFile = file;
      }
    }
  }

  ngOnInit(): void {
    this.urlId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSuppliers();
    this.calculateParentValues();
    debugger
    this.getBrand();
    this.getCategory();
    this.getClass();
    this.getManufacturer();
    this.getactivity();
    this.getParty();
    if (this.urlId) {
      this.getItemsById(this.urlId);
    }
    
    // Initialize childParentData with default values if not set
    if (!this.childParentData.weight) {
      this.childParentData = {
        weight: 1,
        netCost: 0,
        salePrice: 0,
        discValue: 0,
        misc: 0,
        netSalePrice: 0,
        profit: 0,
        cost: 0
      };
    }
	}
  onKey(event: any) {
    debugger
    if (event.key === 'Enter') {
      if (event.target && (event.target as HTMLInputElement).name === 'aliasName') {
        this.checkDuplicate('aliasName');
      }
    }
    //this.formData.aliasName=event.target.value;
  }
  getItemsById(id: any) {
		this.api.getItemsById(String(id)).subscribe(res => {
      var res = JSON.parse(res);
      this.formData.Id=this.urlId;
			this.formData = res.item[0];
      this.altrnateBarCodeData=res.altItem;
      if (res.item[0].Picture) {
        this.pictureUrl = `data:image/jpeg;base64,${res.item[0].Picture}`; // Adjust MIME type if needed
    }
      debugger
      if (res.parentItem && res.parentItem.length > 0) {
        this.childParentData = res.parentItem[0];
      }
       //this.childParentData = res.parentItem[0];
       this.childData = res.childItem;

		})
	}
  cancel(){
    this.router.navigate(['item']);
  }

  addItem() {   
    const requiredFields = [
      //{ key: 'aliasName', message: 'Alias Name is required.' },
      { key: 'itemName', message: 'Item Name is required.' },
      { key: 'categoryId', message: 'Category is required.' },
      { key: 'classId', message: 'Class is required.' },
      { key: 'manufacturerId', message: 'Manufacturer is required.' },
      { key: 'brandId', message: 'Brand is required.' },
    ];

    for (const field of requiredFields) {
        if (!this.formData[field.key]) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: field.message });
            return;
        }
    }
    if (this.urlId) {
        this.formData.id = this.urlId;
    }
  //   const payload = {
  //     Id:this.urlId,
  //     aliasName: this.formData.aliasName,
  //     itemName:this.formData.itemName,
  //     purchasePrice:this.formData.purchasePrice,
  //     salePrice:this.formData.salePrice,
  //     categoryId:this.formData.categoryId,
  //     classId:this.formData.classId,
  //     manufacturerId:this.formData.manufacturerId,
  //     remarks:this.formData.remarks,
  //     recentPurchase:this.formData.recentPurchase,
  //     brandId:this.formData.brandId,
  //     discflat:this.formData.discflat,
  //     lockdisc:this.formData.lockdisc,
  //     alternateItem: this.altrnateBarCodeData,

  // };
  debugger
  const formDataToSend = new FormData();
        formDataToSend.append('Id', this.urlId || 0);
        formDataToSend.append('aliasName', this.formData.aliasName || '');
        formDataToSend.append('itemName', this.formData.itemName || '');
        formDataToSend.append('purchasePrice', this.formData.purchasePrice || 0);
        formDataToSend.append('salePrice', this.formData.salePrice || 0);
        formDataToSend.append('netSalePrice', this.formData.netSalePrice || 0);
        formDataToSend.append('categoryId', this.formData.categoryId || 0);
        formDataToSend.append('classId', this.formData.classId || 0);
        formDataToSend.append('manufacturerId', this.formData.manufacturerId || 0);
        formDataToSend.append('partyId', this.formData.partyId || 0);
        formDataToSend.append('remarks', this.formData.remarks || '');
        formDataToSend.append('recentPurchase', this.formData.recentPurchase || 0);
        formDataToSend.append('brandId', this.formData.brandId || 0);
        formDataToSend.append('discflat', this.formData.discflat || 0);
        formDataToSend.append('lockdisc', this.formData.lockdisc || 0);
        formDataToSend.append('currentStock', this.formData.currentStock || 0);
        formDataToSend.append('alternateItem', JSON.stringify(this.altrnateBarCodeData));

        if (this.selectedFile) {
          formDataToSend.append('picture', this.selectedFile, this.selectedFile.name);
        }
    this.api.createItems(formDataToSend).subscribe(
      (res: any) => {
          if (res?.msg === "An Item with this name already exists.") {
              this.messageService.add({ severity: 'warn', summary: 'Warning', detail: res.msg });
              
          } 
          else if (res?.msg === "An Alias name with this name already exists.") {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: res.msg });
            
        }else {
              //this.router.navigate(['item']);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item Added Successfully' });
              const savedBrand = this.formData.brandId;
              const savedManufacturer = this.formData.manufacturerId;
              const savedClass = this.formData.classId;
              const savedCategory = this.formData.categoryId;
              const savedParty = this.formData.partyId;
              // ✅ Clear all form data
              this.formData = {
                  brandId: savedBrand,
                  manufacturerId: savedManufacturer,
                  classId: savedClass,
                  categoryId: savedCategory,
                  partyId:savedParty
              };

              // Clear image preview if needed
          
            }
      },
      err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add item.' });
      }
  );
}

        cat:any=[];
        getCategory(){
          this.api.getAllCategorydetails().subscribe(res=>{
            this.cat=res;
          })
        }
        clas:any=[];
        getClass(){
          this.api.getAllClassdetails().subscribe(res=>{
            this.clas=res;
          })
        }
        brnd:any=[];
        getBrand(){
          this.api.getAllBrandsdetails().subscribe(res=>{
            this.brnd=res;
          })
        }
        manu:any=[];
        getManufacturer(){
          this.api.getAllIManufacturerdetails().subscribe(res=>{
            this.manu=res;
          })
        }
        act:any=[];
        getactivity(){
          this.api.getAllActivity().subscribe(res=>{
            this.act=res;
          })
        }
        party:any=[];
        getParty(){
          this.api.getAllParty().subscribe(res=>{
            this.party=res;
          })
        }
        altrnateBarCodeData: any[] = [
          { alternateItemName: '', qty: 0, salePrice: 0, saleDisc: 0, remarks: '', barcode: '',netSalePrice: '' }
      ];
      
      addRow() {
          this.altrnateBarCodeData.push({
            alternateItemName: '',
              qty: 0,
              salePrice: 0,
              saleDisc: 0,
              remarks: '',
              barcode: '',
              netSalePrice: '',
          });
      }
      deleteRow(index: number) {
        this.altrnateBarCodeData.splice(index, 1);
      }

      //child and parent Item
      displayPopup: boolean = false;
      childData: any[] = [
        { barcode: '', childName: '', uom: 'Kg', weight: 1, cost:0 , netCost: 0, salePrice: 0, discPerc: 0, discValue: 0, misc: 0, netSalePrice: 0, profit:0}
    ];

    addChildRow() {
      if (!this.childData) {
        this.childData = [];
      }
      const newChild = {
        barcode: '',
        childName: '',
        uom: 'Kg',
        weight: 1,
        Calcost: 0,
        cost:this.formData.salePrice,
        netCost: 0,
        salePrice: 0,
        discPerc: 0,
        discValue: 0,
        misc: 0,
        netSalePrice: 0,
        profit: 0
      };
      this.calculateChildValues(newChild);
      this.childData.push(newChild);
    }

    calculateChildValues(child: any) {
      // 1. Update child name
      child.childName = this.formData.itemName;
      child.childName = `${child.childName} ${child.weight} ${child.uom}`;

      // 2. Calculate cost based on weight and UOM
      const weightInGrams = child.uom === 'Kg' ? child.weight * 1000 : child.weight;
      //const parentCost = this.formData.purchasePrice || 0;
      const parentCost = this.formData.purchasePrice || 0;
      child.cost = parseFloat(((parentCost / 1000) * weightInGrams).toFixed(2));

      // 3. Calculate net cost
      child.netCost = child.cost + (child.misc || 0);

      // 4. Calculate disc value and net sale price
      //child.discValue = (child.salePrice * (child.discPerc || 0)) / 100;
      child.netSalePrice = child.salePrice - child.discValue;

      // 5. Calculate profit
      child.profit = child.netSalePrice - child.netCost;
    }

    onChildInputChange(child: any) {
      this.calculateChildValues(child);
    }

    deletehildRow(index: number) {
      this.childData.splice(index, 1);
    }
      onTabChange(event: any) {
        const selectedTabIndex = event.index;
        // Assuming "Child And Parent" tab is the second tab (index 1)
        if (selectedTabIndex === 1) {
          this.displayPopup = true;
        }
      }

      // add parent child item
      addParentChild() {   
        debugger
        if (this.urlId) {
            this.childParentData.id = this.urlId;
        }
        debugger
        const payload = {
          // Id:this.childParentData.id,
          // barcode: this.formData.aliasName,
          // parentName:this.formData.itemName,
          // uom:this.selectedUOM,
          // weight:this.childParentData.weight,
          // netCost:this.childParentData.netCost,
          // salePrice:this.childParentData.salePrice,
          // discPerc:this.childParentData.discPerc,
          // discValue:this.childParentData.discValue,
          // misc:this.childParentData.misc,
          // netSalePrice:this.childParentData.netSalePrice,
          // profit:this.childParentData.profit,
          // manualSalePrice:this.childParentData.manualSalePrice,
          Id: this.urlId,
          ItemId: this.urlId,
          ChildItems: this.childData
    
      };
        this.api.createParentChildItems(payload).subscribe(
          (res: any) => {
              if (res?.msg === "An item with this name already exists.") {
                  this.messageService.add({ severity: 'warn', summary: 'Warning', detail: res.msg });
              } else {
                  this.router.navigate(['item-form']);
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item Added Successfully' });

                }
          },
          err => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add item.' });
          }
      );
    }

    // Add new method for parent calculations
    calculateParentValues() {
      // 1. Calculate weight in grams
      const weightInGrams = this.selectedUOM === 'Kg' ? 
        (this.childParentData.weight || 1) * 1000 : 
        (this.childParentData.weight || 1);

      // 2. Calculate cost based on weight
      const parentCost = this.formData.purchasePrice || 0;
      const cost = (parentCost / 1000) * weightInGrams;

      // 3. Calculate net cost
      this.childParentData.netCost = cost + (this.childParentData.misc || 0);

      // 4. Calculate net sale price
      this.childParentData.netSalePrice = 
        (this.childParentData.salePrice || 0) - (this.childParentData.discValue || 0);

      // 5. Calculate profit
      this.childParentData.profit = 
        this.childParentData.netSalePrice - this.childParentData.netCost;
    }

    // Add event handler for parent input changes
    onParentInputChange() {
      this.calculateParentValues();
    }

    calculateAlternateItemPrices(item: any) {
      // Calculate sale price (sale price * qty)
      //const totalSalePrice = (item.salePrice || 0) * (item.qty || 0);
      item.salePrice = this.formData.salePrice * item.qty
      // Calculate net sale price (sale price - sale disc)
      item.netSalePrice = item.salePrice - (item.saleDisc || 0);
      
      // Update alias name (item name + remarks)
      item.alternateItemName = `${this.formData.itemName} ${item.remarks || ''}`.trim();
    }

//check Alternate Barcode duplicate
    checkAlternateDuplicate(field: 'aliasName') {
      debugger
      //const valueToCheck = this.item[field];
  
      //if (!valueToCheck) {
         // return; // No value, don't check
      //}
  
      const payload = { 
          fieldName: field, 
          //value: valueToCheck 
      };
  
      this.api.CheckAlternateDuplicate(payload).subscribe(
        (res: any) => {
            if (res?.isDuplicate) {
                this.messageService.add({ severity: 'warn', summary: 'Duplicate', detail: `${field === 'aliasName' ? 'Alias Name' : 'Item Name'} already exists.` });
            }
        },
        err => {
            console.error('Error checking duplicate', err);
        }
      );
  }
  checkDuplicate(field: 'aliasName') {
  debugger;
  const valueToCheck = this.formData[field];
  if (!valueToCheck) return;

  const payload = { fieldName: field, value: valueToCheck };

  this.api.checkDuplicateItem(payload).subscribe((res: any) => {
    if (res && res.isDuplicate) {
      // Show confirmation popup
      this.confirmationService.confirm({
        message: 'This item already exists. Do you want to load the duplicate item?',
        header: 'Duplicate Found',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        accept: () => {
          this.getItemsById(res.id);
        },
        
        closeOnEscape: true
      });

      // Wait a moment for the dialog to render, then enable arrow key navigation
      setTimeout(() => {
        const yesBtn = document.querySelector('button.p-confirm-dialog-accept') as HTMLButtonElement;
        const noBtn = document.querySelector('button.p-confirm-dialog-reject') as HTMLButtonElement;
        const dialog = document.querySelector('.p-confirm-dialog') as HTMLElement;

        if (yesBtn) yesBtn.focus();

        if (dialog) {
          dialog.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
              noBtn?.focus();
              event.preventDefault();
            } else if (event.key === 'ArrowLeft') {
              yesBtn?.focus();
              event.preventDefault();
            } else if (event.key === 'Enter') {
              (document.activeElement as HTMLButtonElement)?.click();
              event.preventDefault();
            }
          });
        }
      }, 100);
    }
  }, error => {
    console.error('Error checking duplicate', error);
  });
}



   moveFocus(event: Event, rowIndex: number, field: string) {
  const keyboardEvent = event as KeyboardEvent;

  const key = keyboardEvent.key;
  const fields = [
    'aliasName','itemName','purchasePrice','salePrice','discflat',
    'netSalePrice','marginValue','brandId','manufacturerId','classId',
    'categoryId','partyId','remarks','lockdisc','currentStock'
  ];

  const colIndex = fields.indexOf(field);

  let nextRowIndex = rowIndex;
  let nextColIndex = colIndex;

  if (key === 'Enter' || key === 'ArrowRight') {
      nextColIndex = Math.min(colIndex + 1, fields.length - 1);
  } else if (key === 'ArrowLeft') {
      nextColIndex = Math.max(colIndex - 1, 0);
  } else if (key === 'ArrowDown') {
      nextRowIndex++;
  } else if (key === 'ArrowUp') {
      nextRowIndex = Math.max(rowIndex - 1, 0);
  } else {
      return;
  }

  const nextField = fields[nextColIndex];
  const nextId = `${nextField}-${nextRowIndex}`;
  const nextInput = document.getElementById(nextId);

  if (nextInput) {
      keyboardEvent.preventDefault();
      (nextInput as HTMLElement).focus();
  }
}


  fieldOrder: string[] = [
    'aliasName',
    'itemName',
    'purchasePrice',
    'salePrice',
    'discflat',
    'netSalePrice',  
    'marginValue', 
    'brandId',
    'manufacturerId',
    'classId',
    'categoryId',
    'partyId',
    'remarks',
    'lockdisc',
    'currentStock'
  ];
  
  moveDateFocus(event: KeyboardEvent, currentId: string) {
    debugger
    const index = this.fieldOrder.indexOf(currentId);
    let nextIndex = index;
  
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = Math.min(index + 1, this.fieldOrder.length - 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = Math.max(index - 1, 0);
    } else {
      return;
    }
  
    const nextId = this.fieldOrder[nextIndex];
    const nextElement = document.getElementById(nextId);
  
    if (nextElement) {
      event.preventDefault();
      nextElement.focus();
    }
  }

  NewItem(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['item-form']);
      });
    }

    moveAlternateItem(event: Event, rowIndex: number, field: string) {
  const keyboardEvent = event as KeyboardEvent;

  const key = keyboardEvent.key;
  const fields = [
    'barcode', 'Quantity', 'salePrice1', 'saleDisc', 
    'netSalePrice1', 'remarks1', 'alternateItemName'
  ];

  let colIndex = fields.indexOf(field);
  let nextRowIndex = rowIndex;
  let nextColIndex = colIndex;

  if (key === 'ArrowRight' || key === 'Enter') {
    nextColIndex = Math.min(colIndex + 1, fields.length - 1);
  } else if (key === 'ArrowLeft') {
    nextColIndex = Math.max(colIndex - 1, 0);
  } else if (key === 'ArrowDown') {
    nextRowIndex++;
  } else if (key === 'ArrowUp') {
    nextRowIndex = Math.max(rowIndex - 1, 0);
  } else {
    return;
  }

  const nextField = fields[nextColIndex];
  const nextId = `${nextField}-${nextRowIndex}`;
  const nextInput = document.getElementById(nextId);

  if (nextInput) {
    keyboardEvent.preventDefault();
    (nextInput as HTMLElement).focus();
  }
}


 showDialog = false;

  filter = {
    itemName: '',
    aliasName: '',
    purchasePrice: 0,
    salePrice: 0
  };

  item: any[] = [];

  // Listen for F8 key globally
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F8') {
      event.preventDefault();
      this.openSearchDialog();
    }
  }

  openSearchDialog() {
    this.showDialog = true;
    this.filter.itemName = '';
    this.item = [];
  }

  filterProducts() {
    this.getItemList();
  }
  searchMode: 'start' | 'advanced' = 'start';

  onSearchModeChange(mode: 'start' | 'advanced') {
    this.searchMode = mode;
  }
  getItemList() {
  const itemName = this.filter.itemName ? this.filter.itemName : 'All';

  this.api.getAllItemsSearching(
    itemName,
    this.searchMode // 'start' or 'advanced' from checkbox
  ).subscribe((res: any) => {
    this.item = res.map((ele: any) => {
      return {
        id: ele.id,
        sno: ele.sno,
        aliasName: ele.aliasName,
        itemName: ele.itemName,
        purchasePrice: ele.purchasePrice,
        salePrice: ele.salePrice,
        categoryId: ele.categoryId,
        classId: ele.classId,
        manufacturerId: ele.manufacturerId,
        remarks: ele.remarks,
        recentPurchase: ele.recentPurchase,
        brandId: ele.brandId,
        discFlat: ele.discFlat,
        lockDisc: ele.lockDisc
      };
    });
    if (this.item.length > 0) {
      this.currentIndex = 0;
      this.selectedItem = this.item[0];

      // Optional: focus table so arrow keys work immediately
      setTimeout(() => this.tableRef?.nativeElement?.focus(), 100);
    }
  });
}

selectedItem: any;
currentIndex: number = 0;


onRowSelect(event: any) {
  // Optional: do something on row select
}

onRowUnselect(event: any) {
  // Optional: do something on row unselect
}
onTableKeyDown(event: KeyboardEvent) {
  const totalItems = this.item.length;

  debugger
  if (event.key === 'ArrowDown') {
    this.currentIndex = Math.min(this.currentIndex + 1, totalItems - 1);
    this.selectedItem = this.item[this.currentIndex];
    event.preventDefault();
  }

  if (event.key === 'ArrowUp') {
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
    this.selectedItem = this.item[this.currentIndex];
    event.preventDefault();
  }
  if (event.key === 'Enter') {
   if (this.selectedItem) {
    this.router.navigate(['item-form/' + this.urlId]);
    this.showDialog = false; // Close dialog
  }
  }
  

}
getRowClass(rowData: any): { [klass: string]: boolean } {
  return {
    'selected-row': this.selectedItem && rowData.id === this.selectedItem.id
  };
}

//suppplier
selectedSupplier: any;
supplierOptions: any[] = [];
supplierPriorityList: any[] = [];

loadSuppliers() {
  this.api.getAllParty().subscribe((res: any) => {
    this.supplierOptions = res.map((party: any) => ({
      id: party.id,
      partyName: party.partyName // keep original field
    }));
  });
}


removeSupplier() {
  if (this.selectedSupplier) {
    this.supplierPriorityList = this.supplierPriorityList.filter(
      s => s.partyName !== this.selectedSupplier.partyName
    );
  }
}

addSupplier() {
  if (this.selectedSupplier && 
      !this.supplierPriorityList.find(s => s.partyName === this.selectedSupplier.partyName)) {
    const priority = 6 - this.supplierPriorityList.length;
    this.supplierPriorityList.push({ ...this.selectedSupplier, priority });
  }
}
}

