import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent {
  constructor(private router: Router,private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.getManufacturerList();
	}
  manufacturer: any = [];
  filter: any = [];
  getManufacturerList() {
    debugger
		this.api.getAllManufacturedetailsFilterbased(this.filter.name?this.filter.name:'All',
      this.filter.email?this.filter.email:'All',
      this.filter.sno || 0,
      this.filter.address?this.filter.address:'All').subscribe((res: any) => {
			this.manufacturer = res.map((ele: any) => {
        debugger
			  return {
        id: ele.id,
        sno: ele.sno,
        name: ele.name,
        telephoneno: ele.telephoneno,
        telephoneno2: ele.telephoneno2,
        email: ele.email,
        address: ele.address
			  };
			});
		  });
	}

  deleteManufacturer(manufact: any) {
		debugger
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				this.api.deleteManufacturerById(manufact.id).subscribe(res => {
					this.manufacturer = this.manufacturer.filter((item: any) => item.id !== manufact.id);
					this.messageService.add({ severity: 'success', summary: 'Success', detail: "Deleted Successfully" });
					return;
				}, err => { })
			},
			reject: () => {

			}
		});
	  }

    editManufacturer(id: any) {
      this.router.navigate(['manufacturer-form/' + id]);
    }

    addManufacturer(){
      this.router.navigate(['manufacturer-form']);
    }
    cancel() {
  
    }
    getData() {
  
    }
    clearFilter() {
  
    }

}
