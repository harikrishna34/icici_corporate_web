import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import * as constants from './constants';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  HostURL: string =
   "https://secureone.anvayaa.com"
   // "http://192.168.1.107:3333"

  // "http://localhost:3300"
 //  "http://localhost:3333"
//  "https:secureone.anvayaa.in"


  constructor(private httpclient: HttpClient, private activatedRoute: ActivatedRoute, private route: Router,) { }

  getToken() {
    var TokenObj = localStorage.getItem("xfiftyaccesstoken")
    TokenObj = JSON.stringify(TokenObj)
    let Headers = new HttpHeaders()
    Headers = Headers.set("x-fiftyaccess-token", TokenObj)
    return Headers;
  }

  logout() {
    //  localStorage.removeItem("xfiftyaccesstoken")
    // this.route.navigate(["/App/Login"]);
  }

  userlogin(login: any): Observable<any> {

    let result = this.httpclient.post(`${this.HostURL}/login`, login)
    return result;
  }

  Locations(){
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    }
    let result = this.httpclient.get(`${this.HostURL}/Locations`,httpOptions)
    return result;
  }
  
  RegisterCustomer(reqiredParams: any) {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/users/createICICUser`, reqiredParams, httpOptions)
    return result;

  }

  forgotpassword(forgotpassworddata: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/mailpassword`, forgotpassworddata, httpOptions)
    return result;

  }
  changepassword(changepassworddata: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post(`${this.HostURL}/changepassword`, changepassworddata, httpOptions)
    return result;

  }
  Addbeneficiary(addbeneficiarydata: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post(`${this.HostURL}/addbeneficiary`, addbeneficiarydata, httpOptions)
    return result;

  }


  UserDetails(): Observable<any> {

    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    }
    var body = {}
    let result = this.httpclient.post(`${this.HostURL}/api/users/viewuser`, body, httpOptions)
    return result;
  }
  otpVarification(reqiredParams: any) {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/otp/checkLoginOTP`, reqiredParams, httpOptions)
    return result;
  }

  viewCategoryDetails() {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/services/viewAllCategoriesDetails`, {}, httpOptions)
    return result;
  }
  viewUser() {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/users/viewuser`, {}, httpOptions)
    return result;
  }
  viewServiceDetails(reqParams: any) {
    // /api/services/viewServiceDetails
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/services/viewServiceDetails`, reqParams,httpOptions)
    return result;
  }
  viewAllRequest(CustRecID: any) {
    // api/appointments/viewuserallrequests
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/appointments/viewuserallrequests`, { "CustRecID": CustRecID }, httpOptions)
    return result;
  }
  validateServices(ServiceID: any) {
    // api/subscriptionvalidation/validateservice
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/subscriptionvalidation/validateservice`, { "ServiceID": ServiceID }, httpOptions)
    return result;
  }

  validatePms(RequestPrice: any) {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/subscriptionvalidation/validatePMS`, { "RequestPrice": RequestPrice }, httpOptions)
    return result;
  }
  paytmCreatePayment(reqParams: any) {
    // api/paytm/createPaymentIDanil
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/paytm/createPaymentID`, reqParams, httpOptions)
    return result;
  }

  viewAllServiceAreas(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    }
    var body = {}
    let result = this.httpclient.post(`${this.HostURL}/api/serviceareas/viewAllServiceAreas`, body, httpOptions)
    return result;
  }
  viewCustomerAreaWiseAllPlansDetails(requiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/plans/viewCustomerICICIAllPlansDetails`, requiredParams, httpOptions)
    return result;
  }
  viewCustomerRequests() {
    let Headers = this.getToken();

    const httpOptions = {
      'headers': Headers,
    }

    let result = this.httpclient.post<any>(`${this.HostURL}/api/requests/viewCustomerRequests`, {}, httpOptions)
    return result;
  }
  getPlansPriceCalculationDetails(requiredParams: any): Observable<any> {
    let Headers = this.getToken()


    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/plans/getPlansPriceCalculationDetails`, requiredParams, httpOptions)
    return result;
  }

  viewPlansPaymentTransactionCharges(requiredParams: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/plans/viewPlansPaymentTransactionCharges`, requiredParams, httpOptions)
    return result;
  }
  createCustomerPlanDetails(requiredParams: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/plans/createCustomerPlanDetails`, requiredParams, httpOptions)
    return result;
  }
  createPlanPaymentforHDFC(requiredParams: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/hdfc/createPlanPayment`, requiredParams, httpOptions)
    return result;
  }
  createPlanPaymentforccAvenue(requiredParams: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/icici_ccavenue/ccavcreatePlanPayment`, requiredParams, httpOptions)
    return result;
  }


  validatePaymentManagementService(): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    var  body= {}
    let result = this.httpclient.post(`${this.HostURL}/api/paymentmanagement/validatePaymentManagementService`, body, httpOptions)
    return result;
  }

  createPlanPaymentforPAYTM(requiredParams: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/paytm/createPlanPayment`, requiredParams, httpOptions)
    return result;
  }

  hdfcTransactionResponse(requiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/hdfc/updateWebKitPlanPaymentDetails`, requiredParams, httpOptions)

    return result;
  }
  paytmTransactionResponseForPlans(requiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/paytm/updateWebKitPlanPaymentDetails`, requiredParams, httpOptions)

    return result;
  }
  createRequest(requiredParams: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/requests/createRequest`, requiredParams, httpOptions)
    return result;
  }
  createServicePayment(requiredParams: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/paytm/createServicePayment`, requiredParams, httpOptions)
    return result;
  }
  hdfcCreatePayment(requiredParams: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/hdfc/createservicepayment`, requiredParams, httpOptions)
    return result;
  }
  createBeneficiaries(body :any): Observable<any> {
    let Headers = this.getToken();
      const httpOptions = {
        headers: Headers,
      }

      let result = this.httpclient.post(`${this.HostURL}/api/users/createBeneficiaries`,body, httpOptions)
      return result;
    }
  createPaymentIDHDFC(requiredParams: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/hdfc/createPaymentID`, requiredParams, httpOptions)
    return result;
  }
  cancelRequest(requiredParams: any) {


    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/requests/cancelRequest`, requiredParams, httpOptions)
    return result;
  }
  rescheduleRequest(requiredParams: any) {


    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/requests/rescheduleRequest`, requiredParams, httpOptions)
    return result;
  }

  creatEscrowAccount(params:any): Observable<any> {

    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    }

    let result = this.httpclient.post(`${this.HostURL}/api/escrowaccount/createEscrowAccountDetails`,params, httpOptions)
    return result;
  }

  pmsCreditPayment(params:any): Observable<any> {

    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    }

    let result = this.httpclient.post(`${this.HostURL}/api/paymentmanagement/createPaymentManagementCreditPayment`,params, httpOptions)
    return result;
  }

  paytmServicePayment(params:any): Observable<any> {

    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    }

    let result = this.httpclient.post(`${this.HostURL}/api/paytm/createPaymentManagementServicePayment`,params, httpOptions)
    return result;
  }

  hdfcServicePayment(params:any): Observable<any> {

    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    }

    let result = this.httpclient.post(`${this.HostURL}/api/hdfc/createPaymentManagementServicePayment`,params, httpOptions)
    return result;
  }



  iciciCardDetails(params:any): Observable<any>{
    let Headers=this.getToken();
    const httpOptions = {
      headers: Headers,
    }
    var result=this.httpclient.get(`${this.HostURL}/api/ICICI/ValidateCardDetails?CardNumber=`+params, httpOptions)
    return result;
  }



  viewRequest(requiredParams: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/requests/viewRequest`, requiredParams, httpOptions)
    return result;
  }


  createEmergencyRequest(requiredParams:any){
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/requests/createEmergencyRequest`, requiredParams, httpOptions)
    return result;
  }


  updateBeneficiary(requiredParams:any){
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/users/updateBeneficiary`, requiredParams, httpOptions)
    return result;
  }


  getReportstype(){
    // api/reporttype_master/viewReportTypesDetails

    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.get(`${this.HostURL}/api/reporttype_master/viewReportTypesDetails`, httpOptions)
    return result;

  }
  uploadhealthrecords(requiredParams:any){
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/electronichealthrecords/uploadhealthrecords`, requiredParams, httpOptions)
    return result;
  }

  viewHealthRecords(){
    // api/electronichealthrecords/viewhealthrecords

    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/electronichealthrecords/viewhealthrecords`, {},httpOptions)
    return result;
  }

  pmsPaytmResponse(PaymentId:any){


    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/paytm/updateWebKitPaymentManagementServicePayment`,PaymentId,httpOptions)
    return result;
  }

  pmsHDFCResponse(PaymentId:any){


    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/hdfc/updateWebKitPaymentManagementServicePaymentDetails`,PaymentId,httpOptions)
    return result;
  }


// api/electronichealthrecords/viewhealthrecords


searchHealthRecords(reqiredParams:any){
  let Headers = this.getToken();

  const httpOptions = {
    headers: Headers,
  }
  let result = this.httpclient.post(`${this.HostURL}/api/electronichealthrecords/viewhealthrecords`, reqiredParams,httpOptions)
  return result;
}

updateWebKitServicePaymentDetails(reqiredParams:any){
  let Headers = this.getToken();

  const httpOptions = {
    headers: Headers,
  }
  let result = this.httpclient.post(`${this.HostURL}/api/hdfc/updateWebKitServicePaymentDetails`, reqiredParams,httpOptions)
  return result;
}

paytmUpdateWebKitServicePaymentDetails(reqiredParams:any){
  let Headers = this.getToken();

  const httpOptions = {
    headers: Headers,
  }
  let result = this.httpclient.post(`${this.HostURL}/api/paytm/updateWebKitServicePaymentDetails`, reqiredParams,httpOptions)
  return result;
}

userRegistraion(reqiredParams:any){
  let result = this.httpclient.post(`${this.HostURL}/api/users/RegisterInZohoCRM`, reqiredParams)
  return result;
}
getdevicesandname(): Observable<any> {
  let Headers = this.getToken();
  const httpOptions = {
    'headers': Headers,
  }
  let result = this.httpclient.get<any>(`${this.HostURL}/api/ASERS/getConfiguredDevicesForUsers`, httpOptions)
  return result;
}

getAserCustomerDashBoardData(reqiredParams:constants.getAsersDashBoardDataParams): Observable<any> {
  let Headers = this.getToken();
  const httpOptions = {
    'headers': Headers,
    'params': { "CustomerID": reqiredParams.CustomerID, "DeviceID": reqiredParams.DeviceID }
  }
  let result = this.httpclient.get<any>(`${this.HostURL}/api/watchdata/GetCustomerDashBoardData`, httpOptions)
  return result;
}

asersMonthlyData(reqiredParams:any): Observable<any> {
  let Headers = this.getToken();
  const httpOptions = {
    'headers': Headers,
  }
  let result = this.httpclient.post<any>(`${this.HostURL}/api/watchdata/GetWatchDataMonthly`,reqiredParams, httpOptions)
  return result;
}
getAserWatchData(requiredParams:constants.getAserWatchDataParams):Observable<any>{
  let Headers = this.getToken();
  const httpOptions = {
    'headers': Headers,
  }
  let result=this.httpclient.post<any>(`${this.HostURL}/api/watchdata/GetWatchData`,requiredParams,httpOptions)
  return result;
}
getAserWatchMonthlyData(requiredParams:constants.getAserWatchDataParams):Observable<any>{
  let Headers = this.getToken();
  const httpOptions = {
    'headers': Headers,
  }
  let result=this.httpclient.post<any>(`${this.HostURL}/api/watchdata/GetWatchDataMonthly`,requiredParams,httpOptions)
  return result;
}

}



