import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Routes } from '@angular/router';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../../users.service'
import { allowedNodeEnvironmentFlags } from 'process';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-angular-paytm-service-response',
  templateUrl: './angular-paytm-service-response.component.html',
  styleUrls: ['./angular-paytm-service-response.component.css']
})
export class AngularPaytmServiceResponseComponent implements OnInit {
  ORDERID:any
  paymentDetailsData:any={}
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder, private UsersService: UsersService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.ORDERID= this.activatedRoute.snapshot.queryParamMap.get("PaymentID");
    this.PaytmResponse()
    console.log( this.ORDERID)
    
  }
PaytmResponse(){
let paytmObj={
  OrderID:this.ORDERID
}
console.log('!!@!@!@')
    this.UsersService.paytmUpdateWebKitServicePaymentDetails(paytmObj).subscribe((Response: any) => {


      if (Response.code == 'PF00') {
        this.spinner.hide()
        this.paymentDetailsData = Response.data.paymentdetails
      }
      if (Response.code == 'S001') {
        this.spinner.hide()
        this.paymentDetailsData = Response.data.paymentdetails
      } else {
        this.spinner.hide()
        this.paymentDetailsData = Response.data.paymentdetails
        // alert(Response.data)
      }
    }, (error) => {
      this.spinner.hide()
      alert(error.error.data)
    })
  }
}
