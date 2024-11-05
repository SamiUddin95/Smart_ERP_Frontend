import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {

  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  
  formData: any = {  };
  urlId: any;

  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getDepartment();
    this.getactivity();
    if (this.urlId) {
      this.getCategoryById(this.urlId);
    }
	}
  getCategoryById(id: any) {
		this.api.getCategoryById(String(id)).subscribe(res => {
			this.formData = res[0];
		})
	}
  cancel(){
    this.router.navigate(['category']);
  }

  addCategory(){
    const requiredFields = [
      // { key: 'departmentId', message: 'Department is required.' },
      { key: 'name', message: 'Name is required.' },
      { key: 'isActive', message: 'Active is required.' },
    ];

      for (const field of requiredFields) {
          if (!this.formData[field.key]) {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: field.message });
              return; 
          }
      }
        this.urlId?this.formData.id=this.urlId:undefined;
        this.api.createCategory(this.formData).subscribe(res=>{
          this.router.navigate(['category']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Category Added Successfully" });	
          },err=>{
        
          })
      
        }

        dept:any=[];
        getDepartment(){
          this.api.getAllDepartment().subscribe(res=>{
            this.dept=res;
          })
        }

        act:any=[];
        getactivity(){
          this.api.getAllActivity().subscribe(res=>{
            this.act=res;
          })
        }

        priorities = [
          { label: 'Select Priority', value: '' },
          { label: 'High', value: 'High' },
          { label: 'Medium', value: 'Medium' },
          { label: 'Low', value: 'Low' }
        ];
}
