import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent {

  constructor(private router: Router,private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
   this.getClassList();
	}

  class: any = [];
  filter: any = {};

  getClassList() {
    debugger
		this.api.getAllClassdetailsFilterbased(this.filter.name?this.filter.name:'All',
      this.filter.sno?this.filter.sno:0,
      this.filter.remarks?this.filter.remarks:'All').subscribe((res: any) => {
			this.class = res.map((ele: any) => {
        debugger
			  return {
        id: ele.id,
        sno: ele.sno,
        name: ele.name,
        departmentId: ele.departmentId,
        categoryId: ele.categoryId,
        remarks: ele.remarks
			  };
			});
		  });
	}

  deleteClass(classes: any) {
		debugger
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				this.api.deleteClassById(classes.id).subscribe(res => {
					this.class = this.class.filter((item: any) => item.id !== classes.id);
					this.messageService.add({ severity: 'success', summary: 'Success', detail: "Deleted Successfully" });
					return;
				}, err => { })
			},
			reject: () => {

			}
		});
	  }

    editClass(id: any) {
      this.router.navigate(['class-form/' + id]);
    }

    addClass(){
      this.router.navigate(['class-form']);
    }
    cancel() {
  
    }
    getData() {
  
    }
    clearFilter() {
  
    }
}
