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
    debugger
        this.urlId?this.formData.id=this.urlId:undefined;
        this.api.createCategory(this.formData).subscribe(res=>{
          this.router.navigate(['category']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "User Saved Successfully" });	
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
}
