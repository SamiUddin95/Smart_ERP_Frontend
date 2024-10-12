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
			this.formData = res[0];
		})
	}
  cancel(){
    this.router.navigate(['item']);
  }

  addItem(){
    debugger
        this.urlId?this.formData.id=this.urlId:undefined;
        this.api.createItems(this.formData).subscribe(res=>{
          this.router.navigate(['item']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "User Saved Successfully" });	
          },err=>{
        
          })
      
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
}
