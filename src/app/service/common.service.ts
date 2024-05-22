import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  openAside = true;
  closeSidebar() {
    const sidebarMargin = window.document.getElementById("sidebar") as HTMLInputElement;
    sidebarMargin.style.width = "0px";
    this.closeAside = true;
    this.openAside = false;
  }
  closeAside = false;
  openSidebar() {
    const sidebarMargin = window.document.getElementById("sidebar") as HTMLInputElement;
    sidebarMargin.style.width = "240px";
    this.openAside = true;
    this.closeAside = false;
  }
  isLoggedIn = false;
  checkLogin(){
    this.isLoggedIn=true;
  }
}
