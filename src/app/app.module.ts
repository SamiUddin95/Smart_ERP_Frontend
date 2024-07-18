import { CUSTOM_ELEMENTS_SCHEMA, NgModule,NO_ERRORS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import {AccordionModule} from 'primeng/accordion';
import {AnimateModule} from 'primeng/animate';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopFormComponent } from './shop-form/shop-form.component';
import { RentListComponent } from './rent-list/rent-list.component';
import { RentFormComponent } from './rent-form/rent-form.component';
import { DatePipe } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RentedShopsComponent } from './rented-shops/rented-shops.component';
import { UnRentedShopsComponent } from './un-rented-shops/un-rented-shops.component';
import { RptIncomeComponent } from './rpt-income/rpt-income.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { RecurringInvoicesComponent } from './recurring-invoices/recurring-invoices.component';
import { PaymentReceivedComponent } from './payment-received/payment-received.component';
import { CreditNotesComponent } from './credit-notes/credit-notes.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { PaymentReceivedFormComponent } from './payment-received-form/payment-received-form.component';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';
import { CustomerLedgerComponent } from './customer-ledger/customer-ledger.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountGroupListComponent } from './account-group-list/account-group-list.component';
import { AccountGroupFormComponent } from './account-group-form/account-group-form.component';
import { AccountCatFormComponent } from './account-cat-form/account-cat-form.component';
import { AccountCatListComponent } from './account-cat-list/account-cat-list.component';
import { SalesManFormComponent } from './sales-man-form/sales-man-form.component';
import { SalesManListComponent } from './sales-man-list/sales-man-list.component'; 
import { PartyFormComponent } from './party-form/party-form.component';
import { PartyListComponent } from './party-list/party-list.component';
import { PartyPriceListComponent } from './party-price-list/party-price-list.component';
import { PartyPriceFormComponent } from './party-price-form/party-price-form.component';
<<<<<<< HEAD
import { PurchaseComponent } from './Purchase/purchase/purchase.component';
import { PurhaseFormComponent } from './Purchase/purhase-form/purhase-form.component';
import { PurcOrderListComponent } from './purc-order-list/purc-order-list.component';
import { PurcOrderFormComponent } from './purc-order-form/purc-order-form.component';
=======
import { PurcReturnListComponent } from './purc-return-list/purc-return-list.component';
import { PurcReturnFormComponent } from './purc-return-form/purc-return-form.component';
>>>>>>> 2039eb66300034487ad12099c1fb1f2f84126518
import { ItemComponent } from './item/item.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { BrandsComponent } from './brands/brands.component';
import { BrandsFormComponent } from './brands-form/brands-form.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { ManufacturerFormComponent } from './manufacturer-form/manufacturer-form.component';
import { CategoryComponent } from './category/category.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ClassComponent } from './class/class.component';
import { ClassFormComponent } from './class-form/class-form.component';
import { SaleListComponent } from './sale-list/sale-list.component';
import { SaleFormComponent } from './sale-form/sale-form.component';
<<<<<<< HEAD

=======
import { PurcOrderListComponent } from './purc-order-list/purc-order-list.component';
import { PurcOrderFormComponent } from './purc-order-form/purc-order-form.component';
>>>>>>> 2039eb66300034487ad12099c1fb1f2f84126518
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    ShopListComponent,
    ShopFormComponent,
    RentListComponent,
    SidebarComponent,
    RentFormComponent,
    RentFormComponent,
    SidebarComponent,
    RentedShopsComponent,
    UnRentedShopsComponent,
    RptIncomeComponent,
    LoginComponent,
    DashboardComponent,
    CustomersComponent,
    InvoicesComponent,
    RecurringInvoicesComponent,
    PaymentReceivedComponent,
    CreditNotesComponent,
    VendorsComponent,
    ExpensesComponent,
    PurchaseComponent,
    PurhaseFormComponent,
    PurchaseOrderComponent,
    CustomerFormComponent,
    InvoiceFormComponent,
    PaymentReceivedFormComponent,
    InvoiceReportComponent,
    CustomerLedgerComponent,
    AccountFormComponent,
    AccountListComponent,
    AccountGroupListComponent,
    AccountGroupFormComponent,
    AccountCatFormComponent,
    AccountCatListComponent,
    SaleListComponent,
    SaleFormComponent,
    SalesManFormComponent,CategoryComponent,CategoryFormComponent,ClassComponent,ClassFormComponent,
    SalesManListComponent, ItemComponent,ItemFormComponent,BrandsComponent,BrandsFormComponent,ManufacturerComponent,ManufacturerFormComponent,
    PartyFormComponent, PartyListComponent, PartyPriceListComponent, PartyPriceFormComponent, PurcReturnListComponent, PurcReturnFormComponent, PurcOrderListComponent, PurcOrderFormComponent
  ],
  imports: [
    HttpClientModule,TableModule,DividerModule,FormsModule,ReactiveFormsModule,DropdownModule,AccordionModule,
    BrowserModule,AnimateModule,BrowserAnimationsModule,ToastModule,ConfirmDialogModule,CalendarModule,
    ButtonModule,DividerModule,DialogModule,
    AppRoutingModule
  ],
  providers: [ConfirmationService,MessageService,DatePipe],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
