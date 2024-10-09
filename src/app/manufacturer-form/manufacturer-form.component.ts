import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.css']
})
export class ManufacturerFormComponent {

  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  
  formData: any = {  };
  urlId: any;

  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    if (this.urlId) {
      this.getManufactureById(this.urlId);
    }
	}
  getManufactureById(id: any) {
		this.api.getManufactureById(String(id)).subscribe(res => {
			this.formData = res[0];
		})
	}
  cancel(){
    this.router.navigate(['manufacturer']);
  }

  addManufacturer(){
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
        this.api.createManufacturer(this.formData).subscribe(res=>{
          this.router.navigate(['manufacturer']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Manufacture Added Successfully" });	
          },err=>{
        
          })
      
        }
}
