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
  
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
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
			this.formData = res.item[0];
      this.altrnateBarCodeData=res.altItem;

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
}
