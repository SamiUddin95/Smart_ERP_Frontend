import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  blocks = [
    { 
      title: 'Sale', 
      icon: 'shopping_cart', 
      color: '#029EAE', 
      imageUrl: 'assets/sale.png',
      links: [
        { name: 'Sale', url: '/counter-sales' },
        { name: 'Cash-In', url: '/cash-in' },
        { name: 'Cash-Out', url: '/cash-out' },
        { name: 'Till-Open', url: '/till-open' },
        { name: 'Till-Close', url: '/till-close' }
      ]
    },
    { 
      title: 'Purchase',
      icon: 'local_shipping',
      color: '#2196F3',
      imageUrl: 'assets/purchase.png',
      links: [
        { name: 'Purchase', url: '/purchase-list' },
        { name: 'Purchase Order', url: '/purch-order-list' },
        { name: 'Purchase Return', url: '/purch-return-list' }
      ]
    },


    { 
      title: 'Account',
      icon: 'account_balance',
      color: '#FF9800', 
      imageUrl: 'assets/account.png' ,
      links: [
        { name: 'Accounts', url: '/account-list' },
        { name: 'Accounts Group', url: '/account-grp-list' },
        { name: 'Account Category', url: '/account-cat-list' }
      ]
    },
    { 
      title: 'Party', 
      icon: 'assessment', 
      color: '#9C27B0', 
      imageUrl: 'assets/party.png' ,
      links: [
        { name: 'Party', url: '/party-list' },
        { name: 'Party Price', url: '/party-price-list' },
        { name: 'Sales Man', url: '/sales-man-list' }
      ]
    },
    { 
      title: 'Item', 
      icon: 'build', 
      color: '#FF5722', 
      imageUrl: 'assets/item.png' ,
      links: [
        { name: 'Brand', url: '/brands' },
        { name: 'Category', url: '/category' },
        { name: 'Class', url: '/class' },
        { name: 'Items', url: '/item' },
        { name: 'Manufacturer', url: '/manufacturer' }
      ]
    },
    { 
      title: 'User', 
      icon: 'people', 
      color: '#009688', 
      imageUrl: 'assets/user.png' ,
      links: [
        { name: 'Create User', url: '/user-form' },
        { name: 'View User', url: '/user-list' }
      ]
    },
    { title: 'Report', icon: 'receipt', color: '#3F51B5', imageUrl: 'assets/report.png' }
  ];
}
