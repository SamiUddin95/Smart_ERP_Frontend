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
debugger
    this.urlId?this.formData.id=this.urlId:undefined;
    this.api.createBrands(this.formData).subscribe(res=>{
      this.router.navigate(['brands']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "User Saved Successfully" });	
      },err=>{
    
      })
  
    }
}
