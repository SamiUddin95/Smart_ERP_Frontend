import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-brands-form',
  templateUrl: './brands-form.component.html',
  styleUrls: ['./brands-form.component.css']
})
export class BrandsFormComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  
  formData: any = {  };
  urlId: any;

  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    if (this.urlId) {
      this.getBrandsById(this.urlId);
    }
    this.getManufacturer();
	}
  manufac:any=[];
  getManufacturer(){
    this.api.getAllIManufacturerdetails().subscribe(res=>{
      this.manufac=res;
    })
  }
  getBrandsById(id: any) {
		this.api.getBrandsById(String(id)).subscribe(res => {
			this.formData = res[0];
		})
	}
  cancel(){
    this.router.navigate(['brands']);
  }

  addBrand(){
    const requiredFields = [
      { key: 'name', message: 'Name is required.' }
  ];

      for (const field of requiredFields) {
          if (!this.formData[field.key]) {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: field.message });
              return; 
          }
      }
    this.urlId?this.formData.id=this.urlId:undefined;
    this.api.createBrands(this.formData).subscribe(res=>{
      this.router.navigate(['brands']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Brand Added Successfully" });	
      },err=>{
    
      })
  
    }
}
