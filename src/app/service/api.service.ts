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
	getGroupById(id: any) {
		return this.app.get('getGroupById?id=' + id, id);
	}
	getAllUserType() {
		return this.app.get('getAllUserType');
	}
	getAllGroup() {
		return this.app.get('getAllGroup');
	}
	createUser(obj: any) {
		return this.app.post('createUser', obj);
	}
	createGroup(obj: any) {
		return this.app.post('createGroup', obj);
	}
	deleteUserById(id: any) {
		return this.app.get('deleteAccountById?id=' + id, id);
	}
	deleteGroupById(id: any) {
		return this.app.get('deleteGroupById?id=' + id, id);
	}
	//Account
	getAllAccountFilterbased(Name: string, accNo: number, groupId: number, categoryId: number) {
		return this.app.get('getAllAccountFilterbased?Name=' + Name + '&accNo=' + accNo + '&groupId=' +
			groupId + '&categoryId=' + categoryId);
	}


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
	getAllAccountCategoryFilterbased(Name: string, accType: string, manualCode: string, priority: string) {
		return this.app.get('getAllAccountCategoryFilterbased?Name=' + Name + '&accType=' + accType + '&manualCode=' + manualCode + '&priority=' + priority);
	}

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
	getAllAccountGroupFilterbased(Name: string, accType: number, manualCode: string, priority: string) {
		return this.app.get('getAllAccountGroupFilterbased?Name=' + Name + '&accType=' + accType + '&manualCode=' + manualCode + '&priority=' + priority);
	}

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
	getPurchaseMaxSerialNo(){
		return this.app.get('getPurchaseMaxSerialNo');
	}
	getSaleMaxSerialNo(){
		return this.app.get('getSaleMaxSerialNo');
	}
	getPurchaseReturnMaxSerialNo(){
		return this.app.get('getPurchaseReturnMaxSerialNo');
	}
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
	fetchPurchaseOrdersByDate(startDate: Date, endDate: Date) {
		const isoStart = startDate.toISOString();
		const isoEnd = endDate.toISOString();
		return this.app.get(`GetPurchaseOrdersByDateRange?startDate=${isoStart}&endDate=${isoEnd}`);
	  }
	getPurchaseById(id: any) {
		return this.app.get('getPurchaseById?id=' + id, id);
	}
	getGoDown() {
		return this.app.get('getGoDown');
	}
	  getTableData(tableName: any) {
		debugger
		return this.app.get('SupplierWise?tableName=' + tableName,tableName);
	  }

	  getAllLocation() {
		return this.app.get('getLocation');
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
	getAllPartyFilterBased(partyName: string, mobileNo: string, telephoneNo: string, nicNo: string, contactPerson: string) {
		return this.app.get('getAllPartyFilterBased?partyName=' + partyName + '&mobileNo=' + mobileNo + '&telephoneNo=' +
			telephoneNo + '&nicNo=' + nicNo + '&contactPerson=' + contactPerson);
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
	getBasicDataReport(dateFrom: string, dateTo: string, brandId: number,
		categoryId: number, classId: number, name: string) {
		return this.app.get('getBasicDataReport?datefrom=' + dateFrom + '&dateTo=' + dateTo + '&brandId=' + brandId +
			'&categoryId=' + categoryId + '&classId=' + classId + '&name=' + name
		);
	}
	getUserReport(dateFrom: string, dateTo: string, joiningDate: number,
		userGroup: number, name: string) {
		return this.app.get('getUserReport?datefrom=' + dateFrom + '&dateTo=' + dateTo + '&joiningDate=' + joiningDate +
			'&userGroup=' + userGroup + '&name=' + name
		);
	}
	getPurchaseReport(dateFrom: string, dateTo: string, brandId: number,
		categoryId: number, classId: number, name: string) {
		return this.app.get('getPurchaseReport?dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&brandId=' + brandId +
			'&categoryId=' + categoryId + '&classId=' + classId + '&name=' + name
		);
	}
	getPurchaseOrderReport(dateFrom: string, dateTo: string, vendorId: number,
		categoryId: number, classId: number, name: string) {
		return this.app.get('getPurchaseOrderReport?datefrom=' + dateFrom + '&dateTo=' + dateTo + '&vendorId=' + vendorId +
			'&categoryId=' + categoryId + '&classId=' + classId + '&name=' + name
		);
	}
	getPurchaseReturnReport(dateFrom: string, dateTo: string, vendorId: number,
		categoryId: number, classId: number, name: string) {
		return this.app.get('getPurchaseReturnReport?datefrom=' + dateFrom + '&dateTo=' + dateTo + '&vendorId=' + vendorId +
			'&categoryId=' + categoryId + '&classId=' + classId + '&name=' + name
		);
	}
	deleteRentbyId(id: any) {
		return this.app.get('deleteRentById?id=' + id, id);
	}
	deleteShopById(id: any) {
		return this.app.get('deleteShopById?id=' + id, id);
	}
	createCustomerdetails(obj: any) {
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
	createInvoicedetails(obj: any) {
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
	createReceivedPayments(obj: any) {
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
	getbyinvoicedetailsbycustomer(cust: String) {
		return this.app.get('getbyinvoicedetailsbycustomer?cust=' + cust);
	}

	getInvoicedetailsByCustomerId(id: number) {
		return this.app.get('getInvoicedetailsByCustomerId?id=' + id);
	}
	getCustomerLedgerByCustomerId(id: number) {
		return this.app.get('getCustomerLedgerByCustomerId?id=' + id);
	}
	getAllPurhasedetails(dateFrom: string, dateTo: string, postedDate: string, postedBy: number, partyId: number,
		invNo: number) {
		return this.app.get('getAllPurchases?dateFrom=' + dateFrom + '&dateTo=' + dateTo +
			'&postedDate=' + postedDate + '&postedBy=' + postedBy + '&partyId=' + partyId + '&invNo=' + invNo);
	}
	deletePurhaseById(id: any) {
		return this.app.get('deletePurchaseById?id=' + id, id);
	}
	createPurchase(obj: any) {
		return this.app.post('createPurchase', obj);
	}
	postPurchase(postedBy:string,purchaseId: number,barCodes: any, currentStock: any, lastNetSalePrice: any, lastNetCost: any, saleDisc: any, netSalePrice: any) {
		return this.app.get('postPurchase?barCodes=' + barCodes + "&currentStock=" + currentStock +
			"&lastNetSalePrice=" + lastNetSalePrice + "&lastNetCost=" + lastNetCost + '&saleDisc=' + saleDisc + "&netSaleePrice=" + netSalePrice+"&purchaseId="+purchaseId
		+"&postedBy="+postedBy);
	}
	unPostPurchase(postedBy:string,purchaseId: number,barCodes: any, currentStock: any, lastNetSalePrice: any, lastNetCost: any, saleDisc: any, netSalePrice: any) {
		debugger
		return this.app.get('unPostPurchase?barCodes=' + barCodes + "&currentStock=" + currentStock +
			"&lastNetSalePrice=" + lastNetSalePrice + "&lastNetCost=" + lastNetCost + '&saleDisc=' + saleDisc + "&netSaleePrice=" + netSalePrice+"&purchaseId="+purchaseId
		+"&postedBy="+postedBy);
	}

	postPurchaseReturn(postedBy:string,purchaseId: number,barCodes: any, currentStock: any, lastNetSalePrice: any, lastNetCost: any, saleDisc: any, netSalePrice: any) {
		return this.app.get('postPurchaseReturn?barCodes=' + barCodes + "&currentStock=" + currentStock +
			"&lastNetSalePrice=" + lastNetSalePrice + "&lastNetCost=" + lastNetCost + '&saleDisc=' + saleDisc + "&netSaleePrice=" + netSalePrice+"&purchaseId="+purchaseId
		+"&postedBy="+postedBy);
	}
	unPostPurchaseReturn(postedBy:string,purchaseId: number,barCodes: any, currentStock: any, lastNetSalePrice: any, lastNetCost: any, saleDisc: any, netSalePrice: any) {
		debugger
		return this.app.get('unPostPurchaseReturn?barCodes=' + barCodes + "&currentStock=" + currentStock +
			"&lastNetSalePrice=" + lastNetSalePrice + "&lastNetCost=" + lastNetCost + '&saleDisc=' + saleDisc + "&netSaleePrice=" + netSalePrice+"&purchaseId="+purchaseId
		+"&postedBy="+postedBy);
	}
	//Stock Adjustment
	// getAllStockAdjustment(dateFrom:string,dateTo:string,postedDate:string,postedBy:number,partyId:number,
	// 	invNo:number) {
	// 	return this.app.get('getAllPurchases?dateFrom='+dateFrom+'&dateTo='+dateTo+
	// 		'&postedDate='+postedDate+'&postedBy='+postedBy+'&partyId='+partyId+'&invNo='+invNo);
	// }
	getAllStockAdjustment() {
		return this.app.get('getAllStockAdj');
	}
	deleteStockAdjustmentById(id: any) {
		return this.app.get('deletePurchaseById?id=' + id, id);
	}
	createStockAdjustment(obj: any) {
		return this.app.post('createStockAdj', obj);
	}
	// postPurchase(barCodes: any,currentStock:any,lastNetSalePrice:any,lastNetCost:any,saleDisc:any,netSalePrice:any) {
	// 	return this.app.get('postPurchase?barCodes='+barCodes+"&currentStock="+currentStock+
	// 		"&lastNetSalePrice="+lastNetSalePrice+"&lastNetCost="+lastNetCost+'&saleDisc='+saleDisc+'&netSaleePrice='+netSalePrice);
	// }

	//Journal Voucher
	getAllJournalVoucher() {
		return this.app.get('getAllJournalVoucher');
	}
	deleteJournalVoucherById(id: any) {
		return this.app.get('deleteJournalVoucherById?id=' + id, id);
	}
	createJournalVoucher(obj: any) {
		return this.app.post('createJournalVoucher', obj);
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

	getAllBrandsdetailsFilterbased(brandName: string, sno:any, remarks: string) {
		return this.app.get('getAllBrandsdetailsFilterbased?brandName=' + brandName + '&sno=' + sno + '&remarks=' + remarks);
	}
	//Category

	getAllCategorydetailsFilterbased(Name: string, description: string, sno:any) {
		return this.app.get('getAllCategorydetailsFilterbased?Name=' + Name + '&description=' + description + '&sno=' + sno);
	}
	getAllCategorydetails() {
		return this.app.get('getAllCategory');
	}

	deleteCategoryById(id: any) {
		return this.app.get('deleteCategoryById?id=' + id, id);
	}
	createCategory(formData: FormData) {
		debugger
		return this.app.post('createCategory', formData);
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
	getAllClassdetailsFilterbased(className: string, sno:any, remarks: string) {
		return this.app.get('getAllClassdetailsFilterbased?className=' + className + '&sno=' + sno + '&remarks=' + remarks);
	}

	getAllClassdetails() {
		return this.app.get('getAllClass');
	}

	deleteClassById(id: any) {
		return this.app.get('deleteClassById?id=' + id, id);
	}
	createClass(obj: any) {
		return this.app.post('createClass', obj);
	}
	getClassById(id: any) {
		return this.app.get('getClassById?id=' + id, id);
	}
	//Item
	getAllItemsdetails() {
		return this.app.get('getAllItems');
	}

	getAllItemsdetailsFilterbased(itemName: string, aliasName: string, purchasePrice: number, salePrice: number) {
		return this.app.get('getAllItemsdetailsFilterbased?itemName=' + itemName + '&aliasName=' + aliasName + '&purchasePrice=' +
			purchasePrice + '&salePrice=' + salePrice);
	}

	getItemDetailbyBarCode(barCode: string) {
		return this.app.get('getItemDetailbyBarCode?barCode=' + barCode);
	}
	getAllItemDetailbyBarCode(barCode: string) {
		return this.app.get('getAllItemDetailbyBarCode?barCode=' + barCode);
	}
	deleteItemsById(id: any) {
		return this.app.get('deleteItemById?id=' + id, id);
	}

	createItems(obj: any) {
		return this.app.post('createItems', obj);
	}
	createParentChildItems(obj: any) {
		return this.app.post('createChildParentItem', obj);
	}
	getItemsById(id: any) {
		return this.app.get('getItemById?id=' + id, id);
	}
	//Manufactutrer
	getAllManufacturedetailsFilterbased(name: string, email: string, sno:any, address: string) {
		return this.app.get('getAllManufacturedetailsFilterbased?name=' + name + '&email=' + email + '&sno=' + sno + '&address=' + address);
	}

	getAllIManufacturerdetails() {
		return this.app.get('getAllManufacturer');
	}

	deleteManufacturerById(id: any) {
		return this.app.get('deleteManufacturerById?id=' + id, id);
	}
	createManufacturer(formData: FormData) {
		return this.app.post('createManufacturer', formData);
	}
	getManufactureById(id: any) {
		return this.app.get('getManufacturerById?id=' + id, id);
	}

	//Location

	deleteLocationbyId(id: any) {
		return this.app.get('deleteLocationById?id=' + id, id);
	}

	createLocation(obj: any) {
		debugger
		return this.app.post('createLocation', obj);
	}
	getLocationById(id: any) {
		return this.app.get('getLocationById?id=' + id, id);
	}

	getAllLocationdetailsFilterbased(locationName: string, sno:any) {
		return this.app.get('getAllLocationdetailsFilterbased?locationName=' + locationName + '&sno=' + sno);
	}

	//Sales
	createCounterSale(obj: any) {
		return this.app.post('createCounterSale', obj);
	}
	getAllCounterSales() {
		return this.app.get('getAllCounterSales');
	}
	createSaleReturn(obj: any) {
		return this.app.post('createSaleReturn', obj);
	}
	getAllSaleReturn() {
		return this.app.get('getAllSaleReturn');
	}
	createSaleTillOpen(obj: any) {
		return this.app.post('createSaleTIllOpen', obj);
	}
	getAllTillOpen() {
		return this.app.get('getAllTillOpen');
	}
	getCheckTillOpen() {
		return this.app.get('getCheckTillOpen');
	}
	getTillOpenById(id: any) {
		return this.app.get('getTillOpenById?id=' + id, id);
	}
	createCashIn(obj: any) {
		return this.app.post('createCashIn', obj);
	}
	getAllCashIn() {
		return this.app.get('getAllCashIn');
	}
	getCheckCashIn() {
		return this.app.get('getCheckCashIn');
	}
	getCashInById(id: any) {
		return this.app.get('getCashInById?id=' + id, id);
	}
	createSaleTillClose(obj: any) {
		return this.app.post('createSaleTIllClose', obj);
	}
	getAllTillClose() {
		return this.app.get('getAllTillClose');
	}
	createCashOut(obj: any) {
		return this.app.post('createCashOut', obj);
	}
	getAllCashOut() {
		return this.app.get('getAllCashOut');
	}
}
