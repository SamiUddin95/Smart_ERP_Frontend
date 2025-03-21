import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {

  constructor(private router: Router,private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.getBrandList();
	}
  filter: any = {};
  brands: any = [];
  getBrandList() {
    debugger
		this.api.getAllBrandsdetailsFilterbased(this.filter.brandName?this.filter.brandName:'All', 
      this.filter.sno?this.filter.sno:0,
      this.filter.remarks?this.filter.remarks:'All',).subscribe((res: any) => {
			this.brands = res.map((ele: any) => {
        debugger
			  return {
        id: ele.id,
        sno: ele.sno,
        name: ele.name,
        remarks: ele.remarks
			  };
			});
		  });
	}

  deleteBrands(brands: any) {
		debugger
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				this.api.deleteBrandsbyId(brands.id).subscribe(res => {
					this.brands = this.brands.filter((item: any) => item.id !== brands.id);
					this.messageService.add({ severity: 'success', summary: 'Success', detail: "Deleted Successfully" });
					return;
				}, err => { })
			},
			reject: () => {

			}
		});
	  }

    editBrand(id: any) {
      this.router.navigate(['brands-form/' + id]);
    }

    addBrand(){
      this.router.navigate(['brands-form']);
    }
    cancel() {
  
    }
    getData() {
  
    }
    clearFilter() {
  
    }
}
