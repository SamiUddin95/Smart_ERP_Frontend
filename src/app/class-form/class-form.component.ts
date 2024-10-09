import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent {

  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  
  formData: any = {  };
  urlId: any;

  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getDepartment();
    this.getCategory();
    if (this.urlId) {
      this.getClassById(this.urlId);
    }
	}
  getClassById(id: any) {
		this.api.getClassById(String(id)).subscribe(res => {
			this.formData = res[0];
		})
	}
  cancel(){
    this.router.navigate(['class']);
  }

  addClass(){
    const requiredFields = [
      { key: 'departmentId', message: 'Department is required.' },
      { key: 'categoryId', message: 'Category is required.' },
      { key: 'name', message: 'Name is required.' },
  ];

      for (const field of requiredFields) {
          if (!this.formData[field.key]) {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: field.message });
              return; 
          }
      }

        this.urlId?this.formData.id=this.urlId:undefined;
        this.api.createClass(this.formData).subscribe(res=>{
          this.router.navigate(['class']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Class Added Successfully" });	
          },err=>{
        
          })
      
        }

        dept:any=[];
        getDepartment(){
          this.api.getAllDepartment().subscribe(res=>{
            this.dept=res;
          })
        }
        cat:any=[];
        getCategory(){
          this.api.getAllCategorydetails().subscribe(res=>{
            this.cat=res;
          })
        }
}
