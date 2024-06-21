import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlansComponent } from './plans/plans.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { PaymentsModule } from './payments/payments.module';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AddbeneficiaryComponent } from './addbeneficiary/addbeneficiary.component';
import { EMRComponent } from './emr/emr.component'
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { BookComponent } from './create-request/book/book.component';
import { DatePipe } from '@angular/common';
import { ViewAllOrdersComponent } from './create-request/view-all-orders/view-all-orders.component';
import { ViewOrdersComponent } from './create-request/view-orders/view-orders.component'
import { OrderByPipe } from './order-by-pipe';
import { PaymentModeComponent } from './payment-mode/payment-mode.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { HdfcPaymentResponseComponent } from './hdfc-payment-response/hdfc-payment-response.component';
import { EmergencyplanComponent } from './emergencyplan/emergencyplan.component';

import { LandingPageComponent } from './landing-page/landing-page.component';
// import { CustomPipesComponent } from './custom-pipes/custom-pipes.component';

import { CustomePipesModule } from './custome-pipes/custome-pipes.module';
import { PaytmPaymentResponseComponent } from './paytm-payment-response/paytm-payment-response.component';
import { AngularPaytmPMSResponseComponent } from './angular-paytm-pmsresponse/angular-paytm-pmsresponse.component';
import { AngularHDFCPMSResponseComponent } from './angular-hdfcpmsresponse/angular-hdfcpmsresponse.component';
import { AngularHDFCServiceResponseComponent } from './create-request/angular-hdfcservice-response/angular-hdfcservice-response.component';
import { AngularPaytmServiceResponseComponent } from './create-request/angular-paytm-service-response/angular-paytm-service-response.component';
import { AsersComponent } from './asers/asers.component';
import { NgApexchartsModule } from "ng-apexcharts";

// import { AngularHDFCServiceResponseComponent } from './angular-hdfcservice-response/angular-hdfcservice-response.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PlansComponent,
    RegisterPageComponent,
    ForgotpasswordComponent,
    LandingPageComponent,
  
    ChangepasswordComponent,
    AddbeneficiaryComponent,
    EMRComponent,
    VerifyAccountComponent,
    CreateRequestComponent,
    BookComponent,

    ViewAllOrdersComponent,
    ViewOrdersComponent,
    OrderByPipe,
    LandingPageComponent,
    HdfcPaymentResponseComponent,
    // OrderByPipe,




    PaymentModeComponent,
    EmergencyplanComponent,
    PaytmPaymentResponseComponent,
    AngularPaytmPMSResponseComponent,
    AngularHDFCPMSResponseComponent,
    AngularHDFCServiceResponseComponent,
    AngularPaytmServiceResponseComponent,
    AsersComponent,
    // AngularHDFCServiceResponseComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxIntlTelInputModule,
    PaymentsModule,
    AutocompleteLibModule,
    CustomePipesModule,
    NgApexchartsModule
    
  ],
  providers: [Pipe, DatePipe],


  // providers: [Pipe],

  bootstrap: [AppComponent]
})
export class AppModule { }
