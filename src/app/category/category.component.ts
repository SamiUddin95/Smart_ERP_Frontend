import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  constructor(private router: Router,private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.getCategoryList();
	}
  category: any = [];

  getCategoryList() {
		this.api.getAllCategorydetails().subscribe((res: any) => {
			this.category = res.map((ele: any) => {
			  return {
        id: ele.id,
        name: ele.name,
        isActive: ele.isActive,
        priority: ele.priority,
        departmentId: ele.departmentId,
        height: ele.height,
        width: ele.width,
        description: ele.description
			  };
			});
		  });
	}

  deleteCategory(categories: any) {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				this.api.deleteCategoryById(categories.id).subscribe(res => {
					this.category = this.category.filter((item: any) => item.id !== categories.id);
					this.messageService.add({ severity: 'success', summary: 'Success', detail: "Deleted Successfully" });
					return;
				}, err => { })
			},
			reject: () => {

			}
		});
	  }

    editCategory(id: any) {
      this.router.navigate(['category-form/' + id]);
    }

    addCategory(){
      this.router.navigate(['category-form']);
    }
    cancel() {
  
    }
    getData() {
  
    }
    clearFilter() {
  
    }

}
