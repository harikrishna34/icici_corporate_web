import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { PlansComponent } from './plans/plans.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { TransactionHistoryComponent } from './payments/transaction-history/transaction-history.component';
import { PaymentManagmentServicesComponent } from './payments/payment-managment-services/payment-managment-services.component';


import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AddbeneficiaryComponent } from './addbeneficiary/addbeneficiary.component';
import { EMRComponent } from './emr/emr.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { BookComponent } from './create-request/book/book.component';
import { ViewAllOrdersComponent } from './create-request/view-all-orders/view-all-orders.component';
import { ViewOrdersComponent } from './create-request/view-orders/view-orders.component';
import { PaymentModeComponent } from './payment-mode/payment-mode.component';
import { UpdatebeneficiaryComponent } from './updatebeneficiary/updatebeneficiary.component';
import { EmergencyplanComponent } from './emergencyplan/emergencyplan.component';

import { HdfcPaymentResponseComponent } from './hdfc-payment-response/hdfc-payment-response.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PaytmPaymentResponseComponent } from './paytm-payment-response/paytm-payment-response.component';
import { AngularPaytmPMSResponseComponent } from './angular-paytm-pmsresponse/angular-paytm-pmsresponse.component'
import { AngularHDFCPMSResponseComponent } from './angular-hdfcpmsresponse/angular-hdfcpmsresponse.component'
// import { ChangepasswordComponent } from './changepassword/changepassword.component';
// import { HdfcPaymentResponseComponent } from './hdfc-payment-response/hdfc-payment-response.component';
import { AngularHDFCServiceResponseComponent } from './create-request/angular-hdfcservice-response/angular-hdfcservice-response.component';
import { AngularPaytmServiceResponseComponent } from './create-request/angular-paytm-service-response/angular-paytm-service-response.component';
import { AsersComponent } from './asers/asers.component';
const routes: Routes = [

  { path: "", redirectTo: "HomePage", pathMatch: 'full' },
  {
    path: "App", component: MainComponent,
    children: [
      { path: "ChangePassword", component: ChangepasswordComponent },
      { path: "Dashboard", component: CreateRequestComponent },
      { path: "Plans", component: PlansComponent },
      { path: "landingpage", component: LandingPageComponent },
      { path: "AllOrders", component: ViewAllOrdersComponent },
      { path: "ViewOrder", component: ViewOrdersComponent },
      { path: "PlanPaymentDetails", component: HdfcPaymentResponseComponent },
      { path: "EMR", component: EMRComponent },
      { path: "book", component: BookComponent },
      { path: "addBeneficiary", component: AddbeneficiaryComponent },
      { path: "Plans", component: PlansComponent },
      { path: "Plan/PaymentMode", component: PaymentModeComponent },
      { path: "Updatebeneficiary", component: UpdatebeneficiaryComponent },
      { path: "Emergencyplan", component: EmergencyplanComponent },
      { path: "PaytmPlanPaymentDetails", component: PaytmPaymentResponseComponent },
      { path: "AngularPaytmPMSResponse", component: AngularPaytmPMSResponseComponent },
      { path: "AngularHDFCPMSResponse", component: AngularHDFCPMSResponseComponent },
     {path: "AngularHDFCServiceResponse", component: AngularHDFCServiceResponseComponent},
     {path: "AngularPaytmServiceResponse", component: AngularPaytmServiceResponseComponent},
     {path: "Asers", component:AsersComponent}
    ],
  },

  {
    path: "Pms", component: MainComponent,
    children: [
      { path: "Transaction", component: TransactionHistoryComponent },
      { path: "PaymentManagment", component: PaymentManagmentServicesComponent },
    ]
  },

  { path: "HomePage", component: LandingPageComponent },
  { path: "Register", component: RegisterPageComponent },
  { path: "Login", component: LoginComponent },
  { path: "ForgotPassword", component: ForgotpasswordComponent },
  { path: "varifyAccount", component: VerifyAccountComponent },

]




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {



}
