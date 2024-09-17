import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ShopFormComponent } from './shop-form/shop-form.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { RentListComponent } from './rent-list/rent-list.component';
import { RentFormComponent } from './rent-form/rent-form.component';
import { RentedShopsComponent } from './rented-shops/rented-shops.component';
import { UnRentedShopsComponent } from './un-rented-shops/un-rented-shops.component';
import { RptIncomeComponent } from './rpt-income/rpt-income.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { RecurringInvoicesComponent } from './recurring-invoices/recurring-invoices.component';
import { CreditNotesComponent } from './credit-notes/credit-notes.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { PaymentReceivedComponent } from './payment-received/payment-received.component';
import { PaymentReceivedFormComponent } from './payment-received-form/payment-received-form.component';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';
import { CustomerLedgerComponent } from './customer-ledger/customer-ledger.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountCatListComponent } from './account-cat-list/account-cat-list.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountGroupListComponent } from './account-group-list/account-group-list.component';
import { AccountGroupFormComponent } from './account-group-form/account-group-form.component';
import { AccountCatFormComponent } from './account-cat-form/account-cat-form.component';
import { SalesManListComponent } from './sales-man-list/sales-man-list.component';
import { SalesManFormComponent } from './sales-man-form/sales-man-form.component';         
import { PartyListComponent } from './party-list/party-list.component';
import { PartyFormComponent } from './party-form/party-form.component';
import { PartyPriceListComponent } from './party-price-list/party-price-list.component';
import { PartyPriceFormComponent } from './party-price-form/party-price-form.component';
import { PurcReturnFormComponent } from './purc-return-form/purc-return-form.component';
import { PurcReturnListComponent } from './purc-return-list/purc-return-list.component';
import { ItemComponent } from './item/item.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoryComponent } from './category/category.component';
import { ClassComponent } from './class/class.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { BrandsFormComponent } from './brands-form/brands-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ClassFormComponent } from './class-form/class-form.component';
import { ManufacturerFormComponent } from './manufacturer-form/manufacturer-form.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { SaleListComponent } from './sale-list/sale-list.component';
import { SaleFormComponent } from './sale-form/sale-form.component';
import { PurcOrderListComponent } from './purc-order-list/purc-order-list.component';
import { PurcOrderFormComponent } from './purc-order-form/purc-order-form.component';
import { SaleCashInComponent } from './sale-cash-in/sale-cash-in.component';
import { SaleCashOutComponent } from './sale-cash-out/sale-cash-out.component';
import { SaleTillOpenComponent } from './sale-till-open/sale-till-open.component';
import { SaleTillCloseComponent } from './sale-till-close/sale-till-close.component';
import { RptBasicDataComponent } from './rpt-basic-data/rpt-basic-data.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, },
  { path: 'user-list', component: UserListComponent, },
  { path: 'user-form', component: UserFormComponent,},
  { path: 'user-form/:id', component: UserFormComponent ,},
  { path: 'shop-form', component: ShopFormComponent ,},
  { path: 'shop-form/:id', component: ShopFormComponent ,},
  { path: 'shop-list', component: ShopListComponent ,},
  { path: 'rent-list', component: RentListComponent ,},
  { path: 'rent-form', component: RentFormComponent ,},
  { path: 'rent-form/:id', component: RentFormComponent ,},
  { path: 'rnt-shp', component: RentedShopsComponent ,},
  { path: 'un-rnt-shp', component: UnRentedShopsComponent ,},
  { path: 'rpt-income', component: RptIncomeComponent ,},
  { path: 'rpt-income', component: RptIncomeComponent ,},
  { path: 'rpt-invoice', component: InvoiceReportComponent ,},
  { path: 'cust-ledger', component: CustomerLedgerComponent ,},
  { path: 'login', component: LoginComponent , pathMatch: 'full'},
  {path: 'recurringinvoices', component: RecurringInvoicesComponent,},
  {path:'creditnotes', component: CreditNotesComponent,},
  {path: 'vendors', component: VendorsComponent,},
  {path:'expenses', component: ExpensesComponent,},
  {path:'purchaseorder', component: PurchaseOrderComponent,},
  {path: 'customers', component: CustomersComponent,},
  {path:'customerform', component: CustomerFormComponent,},
  {path:'customerform/:id', component: CustomerFormComponent,},
  {path:'invoices', component: InvoicesComponent,},
  {path: 'invoice-form', component:InvoiceFormComponent},
  {path: 'invoice-form/:id', component:InvoiceFormComponent},
  {path:'paymentreceived', component: PaymentReceivedComponent,},
  {path:'payment-received-form', component: PaymentReceivedFormComponent},
  {path: 'payment-received-form/:id', component: PaymentReceivedFormComponent},
  { path: 'account-list', component: AccountListComponent, },
  { path: 'account-form', component: AccountFormComponent,},
  { path: 'account-form/:id', component: AccountFormComponent ,},
  { path: 'account-grp-list', component: AccountGroupListComponent, },
  { path: 'account-grp-form', component: AccountGroupFormComponent,},
  { path: 'account-grp-form/:id', component: AccountGroupFormComponent ,},
  { path: 'account-cat-list', component: AccountCatListComponent, },
  { path: 'account-cat-form', component: AccountCatFormComponent,},
  { path: 'account-cat-form/:id', component: AccountCatFormComponent ,}, 
  { path: 'sales-man-list', component: SalesManListComponent, },
  { path: 'sales-man-form', component: SalesManFormComponent,},
  { path: 'sales-man-form/:id', component: SalesManFormComponent ,},
  { path: 'party-list', component: PartyListComponent, },
  { path: 'party-form', component: PartyFormComponent,},
  { path: 'party-form/:id', component: PartyFormComponent ,},
  { path: 'party-price-list', component: PartyPriceListComponent, },
  { path: 'party-price-form', component: PartyPriceFormComponent,},
  { path: 'party-price-form/:id', component: PartyPriceFormComponent ,},
  { path: 'purch-return-list', component: PurcReturnListComponent, },
  { path: 'purch-return-form', component: PurcReturnFormComponent,},
  { path: 'purch-return-form/:id', component: PurcReturnFormComponent ,},
  { path: 'purch-order-list', component: PurcOrderListComponent, },
  { path: 'purch-order-form', component: PurcOrderFormComponent,},
  { path: 'purch-order-form/:id', component: PurcOrderFormComponent ,},
  { path: 'item', component: ItemComponent ,},
  { path: 'item-form', component: ItemFormComponent,},
  { path: 'item-form/:id', component: ItemFormComponent,},
  { path: 'brands', component: BrandsComponent ,},
  { path: 'brands-form', component: BrandsFormComponent,},
  { path: 'brands-form/:id', component: BrandsFormComponent,},
  { path: 'category', component: CategoryComponent ,},
  { path: 'category-form', component: CategoryFormComponent,},
  { path: 'category-form/:id', component: CategoryFormComponent,},
  { path: 'class', component: ClassComponent ,},
  { path: 'class-form', component: ClassFormComponent,},
  { path: 'class-form/:id', component: ClassFormComponent,},
  { path: 'manufacturer', component: ManufacturerComponent ,},
  { path: 'manufacturer-form', component: ManufacturerFormComponent,},
  { path: 'manufacturer-form/:id', component: ManufacturerFormComponent,},
  { path: 'counter-sales', component: SaleListComponent,},
  { path: 'counter-sales-form', component: SaleFormComponent,},
  { path: 'counter-sales-form/:id', component: SaleFormComponent,},
  { path: 'cash-in', component: SaleCashInComponent ,},
  { path: 'cash-out', component: SaleCashOutComponent ,},
  { path: 'till-open', component: SaleTillOpenComponent ,},
  { path: 'till-close', component: SaleTillCloseComponent ,},
  { path:'rpt-basic-data',component:RptBasicDataComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
