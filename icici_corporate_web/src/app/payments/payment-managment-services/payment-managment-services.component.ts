import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';

@Component({
  selector: 'app-payment-managment-services',
  templateUrl: './payment-managment-services.component.html',
  styleUrls: ['./payment-managment-services.component.css']
})
export class PaymentManagmentServicesComponent implements OnInit {
  balanceAmount: any
  Balance: Number | undefined
  UserData: any
  FundsForm!: UntypedFormGroup;
  Amount: any
  submit: any = false
  paymentOptions = false
  fundAddingpage = true
  CreditPaymentData: any
  paytmForm!: UntypedFormGroup
  ServicesData!: UntypedFormGroup
  paymentDetails = false
  paytmpaymentForm!: UntypedFormGroup
  paytmres: any
  hdfcpaymentForm!: UntypedFormGroup
  paymentconfig: any
  PaymentMode: any
  EscrowAccount: any;
  MinAmount: any;
  constructor(private router: Router, private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private userService: UsersService) { }

  ngOnInit(): void {

    this.userDetails()
    this.FundsForm = this.formBuilder.group({

      Amount: ['', [Validators.required, Validators.maxLength(7), Validators.minLength(1), Validators.min(1)]],
      BalanceAmount: '',
      EmergencyAmount: '',
      TransactionAmountLimit: ''

    })



    this.userDetails()




  }

  transactions() {
    this.router.navigate(['Pms/Transaction'])
  }


  paymentpage() {
    this.submit = true
    this.FundsForm.patchValue({ 'BalanceAmount': this.balanceAmount })
    this.FundsForm.patchValue({ 'EmergencyAmount': 5000 })
    this.FundsForm.patchValue({ 'TransactionAmountLimit': 0 })
    this.userService.creatEscrowAccount(this.FundsForm.value).subscribe(Response => {
      if (Response.code == 'S001') {
        this.fundAddingpage = false
        this.paymentOptions = true
      }
      else {
        alert(Response.data)
      }
    }, (error: { error: { data: any; }; }) => {
      error.error.data
    })
  }

  paytmpayment(data: any) {
    this.paytmForm = this.formBuilder.group({
      Amount: [''],
      BalanceAmount: [''],
      EmailID: [''],
      EmergencyAmount: [''],
      MobileNumber: [''],
      Name: [''],
      PaymentMode: [''],
      PaymentType: [''],
      TransactionAmountLimit: ['']
    })

    this.paytmForm.patchValue({ 'Amount': this.FundsForm.value.Amount })
    this.paytmForm.patchValue({ 'BalanceAmount': this.FundsForm.value.BalanceAmount })
    this.paytmForm.patchValue({ 'EmergencyAmount': this.FundsForm.value.EmergencyAmount })
    this.paytmForm.patchValue({ 'TransactionAmountLimit': this.FundsForm.value.TransactionAmountLimit })
    this.paytmForm.patchValue({ 'EmailID': this.UserData.customer.EmailID })
    this.paytmForm.patchValue({ 'MobileNumber': this.UserData.customer.MobileNumber })
    this.paytmForm.patchValue({ 'Name': this.UserData.customer.Name })
    if (data == "Paytm") {
      this.paytmForm.patchValue({ 'PaymentMode': 'Paytm' })

    }
    if (data == "HDFC") {
      this.paytmForm.patchValue({ 'PaymentMode': 'HDFC' })

    }

    this.paytmForm.patchValue({ 'PaymentType': "Online" })


    this.userService.pmsCreditPayment(this.paytmForm.value).subscribe(Response => {

      if (Response.code == 'S001') {
        this.CreditPaymentData = Response.data

        this.ServicePayment()
        this.fundAddingpage = false
        this.paymentOptions = false
        this.paymentDetails = true

      }
      else {
        alert(Response.data)
      }
    }, (error: { error: { data: any; }; }) => {
      error.error.data
    })
  }

  ServicePayment() {

    this.ServicesData = this.formBuilder.group({
      TransactionAmountLimit: 0,
      EmergencyAmount: [''],
      BalanceAmount: [''],
      Amount: [''],
      PaymentMode: [''],
      PaymentType: [''],
      EmailID: [''],
      MobileNumber: [''],
      Name: [''],
      PaytmTransactionCharges: [''],
      PaytmChargesPercentage: [''],
      PaymentID: [''],
      TotalPrice: [''],
      CurrencyType: [''],
      ServiceName: "PYMT",
      ServiceID: "AKCS4",
      Price: [''],
      Channel: "WEB",
      HDFCTransactionCharges: [''],
      HDFCChargesPercentage: [''],
      SubDomain: ['']

    })

    this.ServicesData.patchValue({ 'Amount': this.FundsForm.value.Amount })
    this.ServicesData.patchValue({ 'BalanceAmount': this.FundsForm.value.BalanceAmount })
    this.ServicesData.patchValue({ 'EmergencyAmount': this.FundsForm.value.EmergencyAmount })
    this.ServicesData.patchValue({ 'TransactionAmountLimit': this.FundsForm.value.TransactionAmountLimit })
    this.ServicesData.patchValue({ 'EmailID': this.UserData.customer.EmailID })
    this.ServicesData.patchValue({ 'MobileNumber': this.UserData.customer.MobileNumber })
    this.ServicesData.patchValue({ 'Name': this.UserData.customer.Name })
    this.ServicesData.patchValue({ 'PaymentType': "Online" })
    this.ServicesData.patchValue({ 'PaymentMode': this.paytmForm.value.PaymentMode })
    this.ServicesData.patchValue({ 'CurrencyType': this.CreditPaymentData.CurrencyType })
    this.ServicesData.patchValue({ 'PaymentID': this.CreditPaymentData.TXNID })
    this.ServicesData.patchValue({ 'PaytmTransactionCharges': this.CreditPaymentData.PaytmTransactionCharges })
    this.ServicesData.patchValue({ 'PaytmChargesPercentage': this.CreditPaymentData.PaytmChargesPercentage })
    this.ServicesData.patchValue({ 'Price': this.CreditPaymentData.Price })
    this.ServicesData.patchValue({ 'TotalPrice': this.CreditPaymentData.TotalPrice })
    this.ServicesData.patchValue({ 'HDFCChargesPercentage': this.CreditPaymentData.HDFCChargesPercentage })
    this.ServicesData.patchValue({ 'HDFCTransactionCharges': this.CreditPaymentData.HDFCTransactionCharges })



    if (this.paytmForm.value.PaymentMode == 'Paytm') {
    

      this.ServicesData.patchValue({ 'SubDomain': "ICICI" })

      this.userService.paytmServicePayment(this.ServicesData.value).subscribe(Response => {

        if (Response.code == 'S001') {
          this.paytmres = Response.data
        }
        else {
          alert(Response.data)
        }
      }, (error: { error: { data: any; }; }) => {
        alert(error.error.data)
      })
    }

    if (this.paytmForm.value.PaymentMode == 'HDFC') {

      this.ServicesData.patchValue({ 'SubDomain': "ICICI" })


      this.userService.hdfcServicePayment(this.ServicesData.value).subscribe(Response => {
        if (Response.code == 'S001') {
          this.paymentconfig = Response.data
        }
        else {
          alert(Response.data)
        }
      }, (error: { error: { data: any; }; }) => {
        alert(error.error.data)
      })
    }
  }

  changepaymentMethod() {
    this.paymentOptions = true
    this.fundAddingpage = false
    this.paymentDetails = false
    this.userDetails()
  }


  userDetails() {
    this.userService.UserDetails().subscribe(Response => {
      if (Response.code == 'S001') {
        this.UserData = Response.data

        if(this.UserData.subscription.packagesubscribed != undefined && this.UserData.subscription.packagesubscribed == false){
          this.router.navigate(["App/Plans"])
          return
        }
        this.PMSValidate()
        this.balanceAmount = this.UserData.pmsbalance;
        if (this.balanceAmount == null || this.balanceAmount == undefined) {
          this.balanceAmount = 0
        }

      }
      else {
        alert(Response.data)
      }
    }, (error: { error: { data: any; }; }) => {
      error.error.data
    })

  }

  PMSValidate() {
    this.userService.validatePaymentManagementService().subscribe(Response => {
      if (Response.code == 'S001') {
        
        this.EscrowAccount = Response.data.escrowaccount;
        if (this.EscrowAccount && this.EscrowAccount.EmergencyAmount && this.EscrowAccount.EmergencyAmount > 4999) {

          this.FundsForm.patchValue({ 'EmergencyAmount': this.EscrowAccount.EmergencyAmount })
        } else if (this.EscrowAccount == undefined) {
          this.FundsForm.patchValue({ 'EmergencyAmount': 5000 })

        } else if (this.EscrowAccount != undefined && this.EscrowAccount.EmergencyAmount < 5000) {
          this.FundsForm.patchValue({ 'EmergencyAmount': 5000 })

        } else if (this.EscrowAccount && this.EscrowAccount.EmergencyAmount == undefined){
          this.FundsForm.patchValue({ 'EmergencyAmount': 5000 })
        }
        if(this.EscrowAccount.BalanceAmount==undefined || this.EscrowAccount.BalanceAmount==0){
          this.MinAmount=this.FundsForm.value.EmergencyAmount
        }else{
          this.MinAmount=1
        }
         console.log(this.MinAmount)
      }

      else {
        alert(Response.data)
      }
    }, (error: { error: { data: any; }; }) => {
      error.error.data
    })

  }

  checkemergencyamount() {
    this.MinAmount = this.FundsForm.value.EmergencyAmount
  }



}



