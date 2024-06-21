;
import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../../users.service'
import { allowedNodeEnvironmentFlags } from 'process';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-angular-hdfcservice-response',
  templateUrl: './angular-hdfcservice-response.component.html',
  styleUrls: ['./angular-hdfcservice-response.component.css']
})
export class AngularHDFCServiceResponseComponent implements OnInit {
  PaymentID: any
  paymentDetailsData: any = {}
  beforeStatus:any
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder, private UsersService: UsersService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.PaymentID = this.activatedRoute.snapshot.queryParamMap.get("PaymentID");
    this.updateWebKitServicePaymentDetailsDetails()


  }


  updateWebKitServicePaymentDetailsDetails() {
    let Obj = {
      AnvayaaPaymentID: this.PaymentID
    }
    this.UsersService.updateWebKitServicePaymentDetails(Obj).subscribe((Response: any) => {


      if (Response.data.paymentdetails)
        if (Response.code == 'S001') {
          this.spinner.hide()
          this.paymentDetailsData = Response.data.paymentdetails;


if(this.paymentDetailsData.transaction_details){

  this.beforeStatus=this.paymentDetailsData.transaction_details[this.PaymentID].status
  this.paymentDetailsData.PaymentStatus=this.beforeStatus
  this.paymentDetailsData = Response.data.paymentdetails;
}
        } else {
          this.spinner.hide()
          alert(Response.data)
          this.paymentDetailsData = Response.data.paymentdetails
        }

    }, (error) => {
      alert(error.error.data)
    })
  }

}
