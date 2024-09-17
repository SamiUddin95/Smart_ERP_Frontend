import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-purhase-form',
  templateUrl: './purhase-form.component.html',
  styleUrls: ['./purhase-form.component.css']
})
export class PurhaseFormComponent {

  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  
  formData: any = {  };
  urlId: any;
  party:any=[]
ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getCategory();
	}

  cancel(){
    this.router.navigate(['purchase']);
  }
 
  getParty(){
    this.api.getAllParty().subscribe(res=>{
      this.party=res;
    })
  }
  purchOrderDtlData: any[] = [];
  AddData(){
    this.purchOrderDtlData.push({no:0,barCode:'',itemName:'',bonusQty:'',
    salePrice:0,desc:0,flatDesconeachQty:0,gST:0,gSTPer2:0,remakrs:''});
  }
  RemoveData(){
    this.purchOrderDtlData=[];
  }
  RemoveCol(index:number){ 
    this.purchOrderDtlData.splice(index,1);
  }
  item:any=[]
  getGoDown(){
    this.api.getAllItemsdetails().subscribe(res=>{
      this.item=res;
    })
  }
  addPurchase(){
    debugger
        this.urlId?this.formData.id=this.urlId:undefined;
        this.api.createPurchase(this.formData).subscribe(res=>{
          this.router.navigate(['purchase']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Purchase Saved Successfully" });	
          },err=>{
        
          })
      
        }
        cat:any=[];
        getCategory(){
          this.api.getAllCategorydetails().subscribe(res=>{
            this.cat=res;
          })
        }
  

}
