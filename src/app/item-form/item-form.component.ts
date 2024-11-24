import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent {

  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  
  formData: any = {  };
  alternateItems: any = [];
  urlId: any;
  childParentData: any={ };
  uomOptions: string[] = ['Gm', 'Kg', 'Ltr', 'ml', 'Ctn', 'Box', 'Pack','Loose','Pcs']; 
  selectedUOM: string = 'Kg'; 
  selectedChildUOM: string = 'Kg';
  selectedWeight: number = 1;
  get combinedItemInfo(): string {
    return `${this.formData.itemName} ${this.selectedWeight} ${this.selectedUOM}`;
  }
  ngOnInit(): void {
    this.urlId = Number(this.route.snapshot.paramMap.get('id'));
    debugger
    this.getBrand();
    this.getCategory();
    this.getClass();
    this.getManufacturer();
    this.getactivity();
    if (this.urlId) {
      this.getItemsById(this.urlId);
    }
	}
  onKey(event: any) {
    this.formData.aliasName=event.target.value;
  }
  getItemsById(id: any) {
		this.api.getItemsById(String(id)).subscribe(res => {
      debugger
      var res = JSON.parse(res);
      this.formData.Id=this.urlId;
			this.formData = res.item[0];
      this.altrnateBarCodeData=res.altItem;
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
      { key: 'aliasName', message: 'Alias Name is required.' },
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
    const payload = {
      Id:this.urlId,
      aliasName: this.formData.aliasName,
      itemName:this.formData.itemName,
      purchasePrice:this.formData.purchasePrice,
      salePrice:this.formData.salePrice,
      categoryId:this.formData.categoryId,
      classId:this.formData.classId,
      manufacturerId:this.formData.manufacturerId,
      remarks:this.formData.remarks,
      recentPurchase:this.formData.recentPurchase,
      brandId:this.formData.brandId,
      discflat:this.formData.discflat,
      lockdisc:this.formData.lockdisc,
      alternateItem: this.altrnateBarCodeData,

  };
    this.api.createItems(payload).subscribe(
      (res: any) => {
          if (res?.msg === "An item with this name already exists.") {
              this.messageService.add({ severity: 'warn', summary: 'Warning', detail: res.msg });
          } else {
              this.router.navigate(['item']);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item Added Successfully' });
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

        altrnateBarCodeData: any[] = [
          { aliasName: '', qty: 0, saleDiscPerc: 0, saleDiscFlat: 0, remarks: '' }
      ];
      
      addRow() {
          this.altrnateBarCodeData.push({
              aliasName: '',
              qty: 0,
              saleDiscPerc: 0,
              saleDiscFlat: 0,
              remarks: ''
          });
      }
      deleteRow(index: number) {
        this.altrnateBarCodeData.splice(index, 1);
      }

      //child and parent Item
      displayPopup: boolean = false;
      childData: any[] = [
        { barcode: '', childName: '', uom: 'Kg', weight: 1, netCost: 0, salePrice: 0, discPerc: 0, discValue: 0, misc: 0, netSalePrice: 0, profit:0, manualSalePrice:0 }
    ];
    addChildRow() {
      this.childData.push({
        barcode: '',
        childName: '',
        uom: 'Kg',
        weight: 1, 
        netCost: 0, 
        salePrice: 0, 
        discPerc: 0, 
        discValue: 0, 
        misc: 0, 
        netSalePrice: 0,
        profit:0,
        manualSalePrice:0
      });
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
        
        if (this.urlId) {
            this.childParentData.id = this.urlId;
        }
        debugger
        const payload = {
          barcode: this.formData.aliasName,
          parentName:this.formData.itemName,
          uom:this.selectedUOM,
          weight:this.childParentData.weight,
          netCost:this.childParentData.netCost,
          salePrice:this.childParentData.salePrice,
          discPerc:this.childParentData.discPerc,
          discValue:this.childParentData.discValue,
          misc:this.childParentData.misc,
          netSalePrice:this.childParentData.netSalePrice,
          profit:this.childParentData.profit,
          manualSalePrice:this.childParentData.manualSalePrice,
          childItem: this.childData,
    
      };
        this.api.createParentChildItems(payload).subscribe(
          (res: any) => {
              if (res?.msg === "An item with this name already exists.") {
                  this.messageService.add({ severity: 'warn', summary: 'Warning', detail: res.msg });
              } else {
                  this.router.navigate(['item']);
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item Added Successfully' });
              }
          },
          err => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add item.' });
          }
      );
    }
}
