import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private app: AppService) { }
	login(obj: any) {
		return this.app.post('Login', obj);
	}
	getAllUser() {
		return this.app.get('getAllUser');
	}
	getUserById(id: any) {
		return this.app.get('getUserById?id=' + id, id);
	}
	getAllUserType() {
		return this.app.get('getAllUserType');
	}
	createUser(obj: any) {
		return this.app.post('createUser', obj);
	}
	deleteUserById(id: any) {
		return this.app.get('deleteUserById?id=' + id, id);
	}
	//Account
	getAllAccount() {
		return this.app.get('getAllAccount');
	}
	getAccountById(id: any) {
		return this.app.get('getAccountById?id=' + id, id);
	} 
	createAccount(obj: any) {
		return this.app.post('createAccount', obj);
	}
	deleteAccountById(id: any) {
		return this.app.get('deleteAccountById?id=' + id, id);
	}

	//AccountCategory
	getAllAccountCat() {
		return this.app.get('getAllAccountCategory');
	}
	createAccountCategory(obj: any) {
		return this.app.post('createAccountCategory', obj);
	}
	getAccountCatById(id: any) {
		return this.app.get('getAccountCategoryById?id=' + id, id);
	} 
	deleteAccountCatById(id: any) {
		return this.app.get('deleteAccountCategoryById?id=' + id, id);
	} 
	//AccountType
	getAllAccountType() {
		return this.app.get('getAllAccountType');
	}
	//AccountGroup
	getAllAccountGroup() {
		return this.app.get('getAllAccGroup');
	}

	//Sales Man
		
	getAllSalesMan() {
		return this.app.get('getAllSalesMan');
	}
	getSalesManById(id: any) {
		return this.app.get('getSalesManById?id=' + id, id);
	}
	deleteSalesManById(id: any) {
		return this.app.get('deleteSalesManById?id=' + id, id);
	}
	createSalesMan(obj: any) {
		return this.app.post('createSalesMan', obj);
	}

	//Purchase Order

	getAllPurchaseOrder() {
		return this.app.get('getAllPurchaseOrder');
	}
	createPurchaseOrder(obj: any) {
		return this.app.post('createPurchaseOrder', obj);
	}
	getPurchaseOrderCategory() {
		return this.app.get('getPurchaseOrderCategory');
	}
	getPurchaseOrderById(id: any) {
		return this.app.get('getPurchaseOrderById?id=' + id, id);
	}
	getGoDown() {
		return this.app.get('getGoDown');
	}
	//Purchase Return

	getAllPurchaseReturn() {
		return this.app.get('getAllPurchaseReturn');
	}
	getPurchaseReturnById(id: any) {
		return this.app.get('getPurchaseReturnById?id=' + id, id);
	}
	createPurchaseReturn(obj: any) {
		return this.app.post('createPurchaseReturn', obj);
	}
	//Party
		
	getAllParty() {
		return this.app.get('getAllParty');
	}
	getPartyById(id: any) {
		return this.app.get('getRPartyById?id=' + id, id);
	}
	deletePartyById(id: any) {
		return this.app.get('deletePartyById?id=' + id, id);
	}
	createParty(obj: any) {
		return this.app.post('createParty', obj);
	}

	//PartyPrice
	createPartyPrice(obj: any) {
		return this.app.post('createPartyPrice', obj);
	}
	getAllPartyPrice() {
		return this.app.get('getAllPartyPrice');
	}
	getAllArea() {
		return this.app.get('getAllArea');
	}
	getAllCity() {
		return this.app.get('getAllCity');
	}
	getAllSubArea() {
		return this.app.get('getAllSubArea');
	}
	//Sales Man Type
	getAllSalesManType() {
		return this.app.get('getAllSalesManType');
	}
	getAccountGroupById(id: any) {
		return this.app.get('getAccGroupById?id=' + id, id);
	} 
	createAccountGroup(obj: any) {
		return this.app.post('createAccGroup', obj);
	}
	getAllAccGroup() {
		return this.app.get('getAllAccGroup');
	}
	deleteAccountGroupById(id: any) {
		return this.app.get('deleteAccGroupById?id=' + id, id);
	} 
	//Shop

	getAllShop() {
		return this.app.get('getAllShops');
	}
	getShopById(id: any) {
		return this.app.get('getShopById?id=' + id, id);
	}
	createShop(obj: any) {
		return this.app.post('createShop', obj);
	}
	getAllShopsType() {
		return this.app.get('getAllShopsType');
	}
	getAllMonth() {
		return this.app.get('getAllMonths');
	}
	getAllRentTypes() {
		return this.app.get('getAllRents');
	}
	getRentById(id: any) {
		return this.app.get('getRentById?id=' + id, id);
	}
	createRent(obj: any) {
		return this.app.post('createRent', obj);
	}
	getAllMonthTypes() {
		return this.app.get('getAllMonths');
	}
	getAllAgreementTypes() {
		return this.app.get('getAllAgreementTypes');
	}
	getUnRentedshops(obj: any) {
		return this.app.post('getUnRentedShops', obj);
	}
	getRentedshops(obj: any) {
		return this.app.post('getRentedShops', obj);
	}
	getIncomeReport(obj: any) {
		return this.app.post('getIncomeReport', obj);
	}
	getBasicDataReport(dateFrom:string,dateTo:string,brandId:number,
		categoryId:number,classId:number,name:string) {
		return this.app.get('getBasicDataReport?datefrom='+dateFrom+'&dateTo='+dateTo+'&brandId='+brandId+
			'&categoryId='+categoryId+'&classId='+classId+'&name='+name
		);
	}
	deleteRentbyId(id: any) {
		return this.app.get('deleteRentById?id=' + id, id);
	}
	deleteShopById(id: any) {
		return this.app.get('deleteShopById?id=' + id, id);
	}
	createCustomerdetails(obj:any){
		return this.app.post('createCustomerdetails', obj);
	}
	getAllCustomers() {
		return this.app.get('getAllCustomersdetails');
	}
	getCustomerById(id: any) {
		return this.app.get('getCustomerdetailsById?id=' + id, id);
	}
	deleteCustomerbyId(id: any) {
		return this.app.get('deleteCustomerdetailsById?id=' + id, id);
	}
	createInvoicedetails(obj:any){
		return this.app.post('createInvoicedetails', obj);
	}
	getInvoicedetailsById(id: any) {
		return this.app.get('getInvoicedetailsById?id=' + id, id);
	}
	getAllInvoicedetails() {
		return this.app.get('getAllInvoicedetails');
	}
	deleteInvoicebyId(id: any) {
		return this.app.get('deleteInvoicedetailsById?id=' + id, id);
	}
	getReceivedPaymentsById(id: any) {
		return this.app.get('getReceivedPaymentsById?id=' + id, id);
	}
	createReceivedPayments(obj:any){
		return this.app.post('createReceivedPayments', obj);
	}
	deleteReceivedPaymentsById(id: any) {
		return this.app.get('deleteReceivedPaymentsById?id=' + id, id);
	}
	getAllReceivedPaymentsdetails() {
		return this.app.get('getAllReceivedPaymentsdetails');
	}
	getAllPaymentTerms() {
		return this.app.get('getAllPaymentTerms');
	}

	getAllPaymentTypes() {
		return this.app.get('getAllPaymentTypes');
	}

	getAllPaymentModes() {
		return this.app.get('getAllPaymentModes');
	}
	getbyinvoicedetailsbycustomer(cust:String) {
		return this.app.get('getbyinvoicedetailsbycustomer?cust='+cust);
	}

	getInvoicedetailsByCustomerId(id:number) {
		return this.app.get('getInvoicedetailsByCustomerId?id='+id);
	}
	getCustomerLedgerByCustomerId(id:number) {
		return this.app.get('getCustomerLedgerByCustomerId?id='+id);
	}
	getAllPurhasedetails() {
		return this.app.get('getAllPurchases');
	}
	deletePurhaseById(id: any) {
		return this.app.get('deletePurchaseById?id=' + id, id);
	}
	createPurchase(obj: any) {
		return this.app.post('createPurchase', obj);
	}
	//Brands
	getAllBrandsdetails() {
		return this.app.get('getAllBrands');
	}

	deleteBrandsbyId(id: any) {
		return this.app.get('deleteBrandById?id=' + id, id);
	}

	createBrands(obj: any) {
		debugger
		return this.app.post('createBrands', obj);
	}
	getBrandsById(id: any) {
		return this.app.get('getBrandById?id=' + id, id);
	} 
	//Category
	getAllCategorydetails() {
		return this.app.get('getAllCategory');
	}

	deleteCategoryById(id: any) {
		return this.app.get('deleteCategoryById?id=' + id, id);
	}
	createCategory(obj: any) {
		debugger
		return this.app.post('createCategory', obj);
	}
	getCategoryById(id: any) {
		return this.app.get('getCategoryById?id=' + id, id);
	} 
	getAllDepartment() {
		return this.app.get('getDepartment');
	}

	getAllActivity() {
		return this.app.get('getActive');
	}

	//Class
	getAllClassdetails() {
		return this.app.get('getAllClass');
	}

	deleteClassById(id: any) {
		return this.app.get('deleteClassById?id=' + id, id);
	}
	createClass(obj: any) {
		debugger
		return this.app.post('createClass', obj);
	}
	getClassById(id: any) {
		return this.app.get('getClassById?id=' + id, id);
	} 
    //Item
	getAllItemsdetails() {
		return this.app.get('getAllItems');
	}

	deleteItemsById(id: any) {
		return this.app.get('deleteItemById?id=' + id, id);
	}

	createItems(obj: any) {
		return this.app.post('createItems', obj);
	}
	getItemsById(id: any) {
		return this.app.get('getItemById?id=' + id, id);
	} 
	//Manufactutrer
	getAllIManufacturerdetails() {
		return this.app.get('getAllManufacturer');
	}

	deleteManufacturerById(id: any) {
		return this.app.get('deleteManufacturerById?id=' + id, id);
	}
	createManufacturer(obj: any) {
		return this.app.post('createManufacturer', obj);
	}
	getManufactureById(id: any) {
		return this.app.get('getManufacturerById?id=' + id, id);
	} 
	//Sales
	createCounterSale(obj: any) {
		return this.app.post('createCounterSale', obj);
	}
	getAllCounterSales() {
		return this.app.get('getAllCounterSales');
	} 
}
