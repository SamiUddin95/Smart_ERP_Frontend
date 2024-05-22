import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  userType:number=0;
  ngOnInit(): void {
    this.userType=Number(localStorage.getItem("userType"));
    console.log(this.userType);
  }
}
