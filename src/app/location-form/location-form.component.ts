import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent {
constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  
  formData: any = {  };
  urlId: any;

  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    if (this.urlId) {
      this.getLocationById(this.urlId);
    }
  }
  getLocationById(id: any) {
    this.api.getLocationById(String(id)).subscribe(res => {
      this.formData = res[0];
    })
  }
  cancel(){
    this.router.navigate(['location']);
  }

  addLocation(){
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
    this.api.createLocation(this.formData).subscribe(res=>{
      this.router.navigate(['location']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Location Added Successfully" });	
      },err=>{
    
      })
  
    }
}
