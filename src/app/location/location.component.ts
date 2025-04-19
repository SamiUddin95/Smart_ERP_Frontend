import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
constructor(private router: Router,private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.getLocationList();
  }
  filter: any = {};
  location: any = [];
  getLocationList() {
    debugger
    this.api.getAllLocationdetailsFilterbased(this.filter.locationName?this.filter.locationName:'All', 
      this.filter.sno?this.filter.sno:0).subscribe((res: any) => {
      this.location = res.map((ele: any) => {
        debugger
        return {
        id: ele.id,
        serialnumber: ele.serialnumber,
        name: ele.name,
        address: ele.address,
        phonenumber:ele.phonenumber,  
        email:ele.email,
        royalityPercent:ele.royalityPercent
        };
      });
      });
  }

  deleteBrands(brands: any) {
    debugger
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.api.deleteLocationbyId(brands.id).subscribe(res => {
          this.location = this.location.filter((item: any) => item.id !== brands.id);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Deleted Successfully" });
          return;
        }, err => { })
      },
      reject: () => {

      }
    });
    }

    editLocation(id: any) {
      this.router.navigate(['location-form/' + id]);
    }

    addLocation(){
      this.router.navigate(['location-form']);
    }
    cancel() {
  
    }
    getData() {
  
    }
    clearFilter() {
  
    }
}
