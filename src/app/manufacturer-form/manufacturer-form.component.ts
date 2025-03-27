import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.css']
})
export class ManufacturerFormComponent {

  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  
  formData: any = {  };
  urlId: any;
  pictureUrl: string | undefined;
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
    if (this.urlId) {
      this.getManufactureById(this.urlId);
    }
	}
  getManufactureById(id: any) {
		this.api.getManufactureById(String(id)).subscribe(
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
              detail: 'Failed to load Manufacture',
          });
      }
    );
	}
  cancel(){
    this.router.navigate(['manufacturer']);
  }

  addManufacturer(){
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

        const formDataToSend = new FormData();
        formDataToSend.append('id', this.formData.id || 0);
        formDataToSend.append('name', this.formData.name) ;
        // Append other fields as needed
        formDataToSend.append('address', this.formData.address || '');
        formDataToSend.append('telephoneno', this.formData.telephoneno || '');
        formDataToSend.append('telephoneno2', this.formData.telephoneno2 || '');
        formDataToSend.append('email', this.formData.email || '');

        if (this.selectedFile) {
          formDataToSend.append('picture', this.selectedFile, this.selectedFile.name);
        }

        this.api.createManufacturer(formDataToSend).subscribe(res=>{
          this.router.navigate(['manufacturer']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Manufacture Added Successfully" });	
          },err=>{
        
          })
      
        }
}
