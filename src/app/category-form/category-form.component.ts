import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {
  pictureUrl: string | undefined;

  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,private http: HttpClient,) { }
  
  formData: any = {  };
  urlId: any;
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    debugger
    const file: File = event.target.files[0];
    if (file) {
      // Optional: Add validation for file type and size
      const validTypes = ['image/jpeg', 'image/png'];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB limit

      if (!validTypes.includes(file.type)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Only JPEG and PNG images are allowed.',
        });
        this.selectedFile = null;
      } else if (file.size > maxSizeInBytes) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'File size exceeds 5MB limit.',
        });
        this.selectedFile = null;
      } else {
        this.selectedFile = file;
      }
    }
  }

  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getDepartment();
    this.getactivity();
    if (this.urlId) {
      this.getCategoryById(this.urlId);
    }
	}

  getCategoryById(id: any) {
		// this.api.getCategoryById(String(id)).subscribe(res => {
    //   debugger
		// 	this.formData = res[0];
		// })
    this.api.getCategoryById(id).subscribe(
      (res: any) => {
          this.formData = res;
          if (res.picture) {
              this.pictureUrl = `data:image/jpeg;base64,${res.picture}`; // Adjust MIME type if needed
          }
      },
      (err) => {
          console.error(err);
          this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to load category',
          });
      }
  );
	}
  
  cancel(){
    this.router.navigate(['category']);
  }

  addCategory(){
    debugger
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
        const formDataToSend = new FormData();
        formDataToSend.append('id', this.formData.id || 0);
        formDataToSend.append('name', this.formData.name);
        // Append other fields as needed
        formDataToSend.append('isActive', this.formData.isActive || 0);
        formDataToSend.append('priority', this.formData.priority);
        formDataToSend.append('description', this.formData.description || '');

        if (this.selectedFile) {
          formDataToSend.append('picture', this.selectedFile, this.selectedFile.name);
        }
        this.api.createCategory(formDataToSend).subscribe(res=>{
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
