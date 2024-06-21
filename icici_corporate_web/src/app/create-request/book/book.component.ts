import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../../users.service';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { TestBed } from '@angular/core/testing';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class BookComponent implements OnInit {
  userDetails: any = {}
  ServiceID: any
  serviceDetails: any = {}
  CustRecID: any
  public createRequest!: UntypedFormGroup
  continueBtn: boolean = false
  PaymentPage: boolean = false
  CustID: any
  RequestedDate: any
  ReqDate: any
  bookservice: any = {}
  PaymentMode: any
  PaymentType: any
  userServices: any = {}
  pmsValidation: any = false
  RequestData: any = {}
  paytmres: any
  createRequestObj: any = {}
  paymentIDObj: any = {}
  bookserviceHDFC: any = {}
  chargesPercent: any
  TransactionCharges: any
  PaymentObj: any = {}
  paymentconfig: any = {}
  checkcode: any
  Beneficiary: any = []
  PaymentID:any
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder, private UsersService: UsersService, private spinner: NgxSpinnerService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.ServiceID = this.activatedRoute.snapshot.queryParamMap.get("ServiceID");

    this.viewuserDetails()

    this.createRequest = this.formBuilder.group({
      RequestedDate: [''],
      Beneficiary: [''],
      note: [''],
      Comments: ['']

    })
    this.PaymentType = "Online"
  }

  viewuserDetails() {
    this.spinner.show()

    console.log("!!!")
    this.UsersService.viewUser().subscribe((Response) => {
      if (Response.code == "S001") {
        this.spinner.hide()
        this.userDetails = Response.data
        this.Beneficiary = Response.data.customer.Beneficiaries
        //("!!!!", this.userDetails)
        this.CustRecID = Response.data.customer.CustRecID
        this.validateUserService();
      
        this.validateServiceDetails()
      } else {
        this.spinner.hide()
        alert(Response.data)
      }
    },
      (error) => {
        this.spinner.hide()
        alert(error.error.data)
      })
  }


  validateServiceDetails() {
    this.spinner.show()
    let serviceDetailsObj = {
      ServiceID: this.ServiceID,
      code: "SR02"
    }

    this.UsersService.viewServiceDetails(serviceDetailsObj).subscribe((Response: any) => {
      if (Response.code == "S001") {
        this.spinner.hide()
        this.serviceDetails = Response.data.servicesdetails

        //("!!!", this.serviceDetails)

      } else {
        this.spinner.hide()
        alert(Response.data)
      }
    }, (error: any) => {
      this.spinner.hide()
      alert(error.error.data)
    })
  }
  goBack() {
    this.spinner.show()
    this.route.navigate(['/App/Dashboard'])
    this.spinner.hide()
  }

  // viewUserAllRequest() {
  //   this.UsersService.viewAllRequest(this.CustRecID).subscribe((Response: any) => {
  //     if (Response.code = "S001") {

  //     } else {
  //       alert(Response.data)
  //     }
  //   }, (error: any) => {
  //     alert(error.error.data)
  //   })
  // }


  validateUserService() {
    // validateService
    this.spinner.show()
    this.UsersService.validateServices(this.ServiceID).subscribe((Response: any) => {
      if (Response.code == "SR01") {
        this.spinner.hide()
        this.userServices = Response

        console.log("!@#!@#", this.userServices )

        console.log("!@#!@#", this.userServices )
        this.checkcode = Response.code
      } else {
        this.userServices = Response
        this.spinner.hide()
        // alert(Response.data)
        this.checkcode = Response.code
      }
    }, (error: any) => {
      this.spinner.hide()
      alert(error.error.data)
    })

  }

  checkRequest() {
    this.continueBtn = true

    // console.log(this.createRequest.status)

    if (this.createRequest.status == 'INVALID') {
      return;
    }


    if (this.createRequest.controls['Beneficiary'].status == 'INVALID') {
      return
    }
    if (this.createRequest.status == 'VALID') {
      this.PaymentPage = true
      this.validatePms()
    }

    //(this.createRequest.value)
    if (!moment(this.createRequest.value.RequestedDate, "DD-MM-YYYY HH:mm", true).isValid()) {
      this.ReqDate = this.datePipe.transform(this.createRequest.value.RequestedDate, 'dd-MM-YYYY hh:mm')
    }
    //("RWEQQ", this.ReqDate)
  }


  validatePms() {
    this.spinner.show()
    this.UsersService.validatePms(this.serviceDetails.TotalPrice).subscribe((Response: any) => {
      if (Response.code == "F002") {
        this.spinner.hide()
        this.pmsValidation = true
      } else {
        // alert(Response.data)
        this.spinner.hide()
        this.pmsValidation = false
      }
    }, (error: any) => {
      this.spinner.hide()
      alert(error.error.data)
    })
  }
  SelectBenficiary(custID: any) {
    //("CUSTID", custID.target.value)
    this.CustID = custID.target.value
  }
  paytmCreatePaymentDetails(Type: any) {
    this.spinner.show()
    this.PaymentMode = Type
    this.PaymentType = "Online"
    //(this.createRequest.value.RequestedDate)
    if (!moment(this.createRequest.value.RequestedDate, "DD-MM-YYYY HH:mm", true).isValid()) {
      this.ReqDate = this.datePipe.transform(this.createRequest.value.RequestedDate, 'dd-MM-YYYY hh:mm a')
    }

    // this.RequestedDate=""
    this.paymentIDObj = {
      AliasName: this.serviceDetails.AliasName,
      CategoryID: this.serviceDetails.CategoryTypeID,
      CategoryName: this.serviceDetails.CategoryName,
      CurrencyType: "INR",
      CustID: this.CustID,
      CustRecID: this.userDetails.customer.CustRecID,
      EmailID: this.userDetails.customer.EmailID,
      MobileNumber: this.userDetails.customer.MobileNumber,
      Name: this.userDetails.customer.Name,
      Note: this.createRequest.value.Comments,
      OthersMobileNumber: "",
      OthersName: "",
      PaymentMode: Type,
      Price: this.serviceDetails.Price,
      RequestFor: "Beneficiary",
      RequestedDate: this.ReqDate,
      // Service:this.userServices.Service,
      ServiceAreaID: this.serviceDetails.ServiceAreaID,
      ServiceAreaName: this.serviceDetails.ServiceAreaName,
      SubCategoryID: this.serviceDetails.SubCategoryID,
      SubCategoryName: this.serviceDetails.SubCategoryName,
      Tax: this.serviceDetails.Tax,
      TaxPrice: this.serviceDetails.TaxPrice,
      TotalPrice: this.serviceDetails.TotalPrice

    }
    this.UsersService.paytmCreatePayment(this.paymentIDObj).subscribe((Response: any) => {
      if (Response.code == "S001") {
        this.spinner.hide()

        // alert(Response.data)
        this.bookservice = Response.data
        this.chargesPercent = this.bookservice.PaytmChargesPercentage
        this.TransactionCharges = this.bookservice.PaytmTransactionCharges
        // console.log(this.bookservice)
        this.CreateRequestNew()
      } else {
        this.spinner.hide()
        alert(Response.data)
      }
    }, (error: any) => {
      this.spinner.hide()
      alert(error.error.data)
    })
  }
  HDFCCreatePaymentDetails(Type: any) {
    this.PaymentMode = Type
    // ("!!!!!!")
    // createPaymentIDHDFC
    this.paymentIDObj = {
      AliasName: this.serviceDetails.AliasName,
      CategoryID: this.serviceDetails.CategoryTypeID,
      CategoryName: this.serviceDetails.CategoryName,
      CurrencyType: "INR",
      CustID: this.CustID,
      CustRecID: this.userDetails.customer.CustRecID,
      EmailID: this.userDetails.customer.EmailID,
      MobileNumber: this.userDetails.customer.MobileNumber,
      Name: this.userDetails.customer.Name,
      Note: this.createRequest.value.Comments,
      OthersMobileNumber: "",
      OthersName: "",
      PaymentMode: Type,
      Price: this.serviceDetails.Price,
      RequestFor: "Beneficiary",
      RequestedDate: this.ReqDate,
      // Service:this.userServices.Service,
      ServiceAreaID: this.serviceDetails.ServiceAreaID,
      ServiceAreaName: this.serviceDetails.ServiceAreaName,
      SubCategoryID: this.serviceDetails.SubCategoryID,
      SubCategoryName: this.serviceDetails.SubCategoryName,
      Tax: this.serviceDetails.Tax,
      TaxPrice: this.serviceDetails.TaxPrice,
      TotalPrice: this.serviceDetails.TotalPrice

    }
    this.UsersService.createPaymentIDHDFC(this.paymentIDObj).subscribe((Response: any) => {
      if (Response.code == "S001") {
        // alert(Response.data)
        this.bookserviceHDFC = Response.data

        // console.log("!!!@@@", this.bookserviceHDFC)

        this.chargesPercent = this.bookserviceHDFC.HDFCChargesPercentage
        this.TransactionCharges = this.bookserviceHDFC.HDFCTransactionCharges
        // this.PaytmChargesPercentage = this.bookserviceHDFC.HDFCChargesPercentage
        // this.PaymentGatewayTransactionCharges = this.bookserviceHDFC.HDFCTransactionCharges

        this.CreateRequestNew()
      } else {
        alert(Response.data)
      }
    }, (error: any) => {
      alert(error.error.data)
    })
  }

  Offline(paymentMode: any) {
    this.PaymentType = "Offline"
    this.PaymentMode = paymentMode
  }
  callbackRequest() {
    this.PaymentMode = "Package"
    this.PaymentType = "Package"
    this.CreateRequestNew()
  }
  CreateRequestNew() {
    this.spinner.show()
    // console.log("!@!@!@!@!!!@!@!")
    //     console.log("plan", this.userDetails.subscription)
console.log("!@!@",  this.bookservice ) 
if (this.PaymentMode == "HDFC") {
 
  this.PaymentID=this.bookserviceHDFC.TXNID
}

if (this.PaymentMode == "Paytm") {
this.PaymentID=this.bookservice.OrderID

}
    let createRequestObj = {
      AliasName: this.serviceDetails.AliasName,
      CategoryID: this.serviceDetails.CategoryTypeID,
      CategoryName: this.serviceDetails.CategoryType,
      CurrencyType: "INR",
      CustID: this.CustID,
      CustRecID: this.userDetails.customer.CustRecID,
      EmailID: this.userDetails.customer.EmailID,
      MobileNumber: this.userDetails.customer.MobileNumber,
      Name: this.userDetails.customer.Name,
      Note: this.createRequest.value.Comments,
      OthersMobileNumber: "",
      OthersName: "",
      PaymentMode: this.PaymentMode,
      PaymentType: this.PaymentType,
      Price: this.serviceDetails.Price,
      RequestFor: "Beneficiary",
      PaymentGatewayChargesPercentage: this.chargesPercent,
      PaymentGatewayTransactionCharges: this.TransactionCharges,
      PaytmChargesPercentage: this.chargesPercent,
      PaytmTransactionCharges: this.TransactionCharges,
      Plan: this.userDetails.subscription.data.AliasName,
      RequestedDate: this.ReqDate,
      Service: this.userServices.Service,
      ServiceAreaID: this.serviceDetails.ServiceAreaID,
      ServiceAreaName: this.serviceDetails.ServiceAreaName,
      SubCategoryID: this.serviceDetails.SubCategoryID,
      SubCategoryName: this.serviceDetails.SubCategoryName,
      Tax: this.serviceDetails.Tax,
      TaxPrice: this.serviceDetails.TaxPrice,
      TotalPrice: this.serviceDetails.TotalPrice,
      PaymentID:this.PaymentID,
     

    }

    this.UsersService.createRequest(createRequestObj).subscribe((Response: any) => {
      //("!!!!!!!!")
      if (Response.code == "S001") {
        this.spinner.hide()

        this.RequestData = Response.data

        if (this.PaymentMode == "HDFC") {
          this.cardPayment()
          // console.log("!!!")
        }

        if (this.PaymentMode == "Paytm") {
          // this.cardPayment()
          this.CreateServicePayment()
        }

        if (this.PaymentMode == "Cash" || this.PaymentMode == "Cheque" || this.PaymentMode == "Wiretransfer" ||this.PaymentMode =='Package') {
          alert(Response.data)
          this.route.navigate(['/App/AllOrders'])
        }
      } else {
        this.spinner.hide()
        alert(Response.data)
      }
    }, (error: any) => {
      this.spinner.hide()
      alert(error.error.data)
    })

  }
  CreateServicePayment() {
    // createServicePayment
    this.spinner.show()
    this.createRequestObj = {
      AliasName: this.serviceDetails.AliasName,
      // CategoryID:this.serviceDetails.CategoryID,
      AnvayaaPaymentID: this.RequestData.AnvayaaPaymentID,
      CategoryID: this.serviceDetails.CategoryID,
      CategoryName: this.serviceDetails.CategoryName,
      Channel: "WEB",
      CurrencyType: "INR",
      CustID: this.CustID,
      CustRecID: this.userDetails.customer.CustRecID,
      EmailID: this.userDetails.customer.EmailID,
      MobileNumber: this.userDetails.customer.MobileNumber,
      Name: this.userDetails.customer.Name,
      Note: this.createRequest.value.Comments,
      OrderID: this.bookservice.OrderID,
      PaymentGatewayChargesPercentage: this.bookservice.PaytmChargesPercentage,
      PaymentGatewayTransactionCharges: this.bookservice.PaytmTransactionCharges,
      OthersMobileNumber: "",
      OthersName: "",
      PaymentMode: this.PaymentMode,
      PaymentType: "Offline",
      Price: this.serviceDetails.Price,
      RequestFor: "Beneficiary",
      // RequestID: "",p
      Plan: this.userDetails.subscription.data.AliasName,
      RequestedDate: this.ReqDate,
      Service: this.userServices.Service,
      ServiceAreaID: this.serviceDetails.ServiceAreaID,
      ServiceAreaName: this.serviceDetails.ServiceAreaName,
      SubCategoryID: this.serviceDetails.SubCategoryID,
      SubCategoryName: this.serviceDetails.SubCategoryName,
      Tax: this.serviceDetails.Tax,
      TaxPrice: this.serviceDetails.TaxPrice,
      TotalPrice: this.serviceDetails.TotalPrice,
      TXNID: this.RequestData.AnvayaaPaymentID,
      SubDomain:"ICICI",
      

      

    }

    // //("createRequestObj", createRequestObj)

    this.UsersService.createServicePayment(this.createRequestObj).subscribe((Response: any) => {
      if (Response.code == "S001") {
        this.spinner.hide()
        // alert(Response.data)
        this.paytmres = Response.data
        this.Test(this.createRequestObj)
      } else {
        this.spinner.hide()
        alert(Response.data)
      }
    }, (error: any) => {
      this.spinner.hide()
      alert(error.error.data)
    })
  }
  Test(params: any) {
    this.PaymentObj = params
    //("!!!!1111111",params)
  }
  cardPayment() {
    //("1111")
    this.spinner.show()
    this.RequestData.TXNID = this.bookserviceHDFC.TXNID
    this.RequestData.SubDomain ="ICICI"
    this.UsersService.hdfcCreatePayment(this.RequestData).subscribe((Response: any) => {
      if (Response.code == "S001") {
        this.spinner.hide()
        // alert(Response.data)
        this.paymentconfig = Response.data
      } else {
        this.spinner.hide()
        alert(Response.data)
      }
    }, (error: any) => {
      this.spinner.hide()
      alert(error.error.data)
    })
  }


}
