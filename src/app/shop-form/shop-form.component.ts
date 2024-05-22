import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.css']
})
export class ShopFormComponent {

  constructor(private route: ActivatedRoute,private router: Router, private api: ApiService, private messageService: MessageService,) { }
  shopData: any = {};
  shopTypes: any = [];
  urlId: any;
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.getShopType();
    if (this.urlId) {
      this.getShopById(this.urlId);
    }
  }


  cancel() {
    this.router.navigate(['shop-list']);
  }
  getShopById(id: any) {
    this.api.getShopById(String(id)).subscribe(res => {
      this.shopData = res[0];
    })
  }
  addShop() {
    this.urlId?this.shopData.id=this.urlId:undefined;
    this.api.createShop(this.shopData).subscribe(res => {
      this.router.navigate(['shop-list']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Added Successfully" });
    }, err => {

    })
  }
  getShopType() {
    this.api.getAllShopsType().subscribe(res => {
      this.shopTypes = res;
    })
  }
}
