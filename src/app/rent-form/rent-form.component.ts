import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css']
})
export class RentFormComponent {
  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService,private messageService: MessageService,) { }
  rentData: any = {  };
  months:any=[];
  agreementTypes:any=[];
  shopTypes:any=[];
  urlId: any;
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getMonth();
    this.getAgreementType();
    this.getShopType();
    if (this.urlId) {
      this.getRentById(this.urlId);
    }
}

getRentById(id: any) {
  this.api.getRentById(String(id)).subscribe(res => {
    this.rentData = res[0];
  })
}
  cancel(){
    this.router.navigate(['rent-list']);
  }
  addRent(){
    this.urlId?this.rentData.id=this.urlId:undefined;
    this.api.createRent(this.rentData).subscribe(res=>{
      this.router.navigate(['rent-list']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Added Successfully" });	
    },err=>{

    })
  }
  getMonth(){
    this.api.getAllMonthTypes().subscribe(res=>{
      this.months=res;
    })
  }
  getAgreementType(){
    this.api.getAllAgreementTypes().subscribe(res=>{
      this.agreementTypes=res;
    })
  }
  getShopType(){
    this.api.getAllShop().subscribe(res=>{
      this.shopTypes=res;
    })
  }
  
  onShopChange(event:any){
    console.log(event);
    this.api.getShopById(event.value).subscribe(res => {
      this.rentData.monthRent = res[0].rentDecided;
      this.rentData.rentReceived = this.rentData.monthRent;
    })
  }
  onRentReceivedChange(event: any){
    this.rentData.monthBalance=this.rentData.monthRent-this.rentData.rentReceived;
  }
}
