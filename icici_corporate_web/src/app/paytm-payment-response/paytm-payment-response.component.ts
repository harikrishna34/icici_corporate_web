import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-paytm-payment-response',
  templateUrl: './paytm-payment-response.component.html',
  styleUrls: ['./paytm-payment-response.component.css']
})
export class PaytmPaymentResponseComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,private spinner:NgxSpinnerService, private route: Router, private userService: UsersService) { }
  paymentID:string="";
  paymentDetailsData:any={};

  ngOnInit(): void {
    this.spinner.show();
    this.paymentID=this.activeRoute.snapshot.queryParams["PaymentID"];
    console.log("paymentId",this.paymentID);
    this.getPaymentDetails(this.paymentID).then((paymentPromiseDetails:any)=>{
      if(paymentPromiseDetails.code=="PF00"){
        this.paymentDetailsData["PaymentStatus"]=paymentPromiseDetails.data.paymentdetails.AnvayaaPaymentStatus=="success"?"Success":"failure";
        this.paymentDetailsData["PaymentDetailsData"]=paymentPromiseDetails.data.paymentdetails;
        this.paymentDetailsData["PaymentID"]=paymentPromiseDetails.data.paymentdetails.AnvayaaPaymentID
        this.paymentDetailsData["TransactionID"]=paymentPromiseDetails.data.paymentdetails.TXNID;
        this.paymentDetailsData["Price"]=paymentPromiseDetails.data.paymentdetails.TXNAMOUNT;
        this.paymentDetailsData["TransactionTime"]="0";
        this.paymentDetailsData["BankReferenceNumber"]=paymentPromiseDetails.data.paymentdetails.BANKTXNID;
        this.paymentDetailsData["Package"]="";
      }
      if(paymentPromiseDetails.code=="D003"){
        this.paymentDetailsData["PaymentStatus"]=paymentPromiseDetails.data.transactiondetails.AnvayaaPaymentStatus=="success"?"Success":"failure";
        this.paymentDetailsData["PaymentDetailsData"]=paymentPromiseDetails.data.transactiondetails;
        this.paymentDetailsData["PaymentID"]=paymentPromiseDetails.data.transactiondetails.AnvayaaPaymentID;
        this.paymentDetailsData["TransactionID"]=paymentPromiseDetails.data.transactiondetails.GatewayTransactionID;
        this.paymentDetailsData["Price"]=paymentPromiseDetails.data.transactiondetails.TotalPrice;
        this.paymentDetailsData["TransactionTime"]="0";
        this.paymentDetailsData["BankReferenceNumber"]=paymentPromiseDetails.data.transactiondetails.BankTransactionID;
        this.paymentDetailsData["Package"]="";
      }
      console.log(this.paymentDetailsData,"this.paymentDetailsData")
    }).catch((e)=>{
      this.spinner.hide();
      alert(e.error.message);
    });
    this.spinner.hide();
  }

  getPaymentDetails(paymentId:any){
    this.spinner.show();
    return  new Promise((resolve,reject)=>{
      this.userService.paytmTransactionResponseForPlans({OrderID:paymentId}).subscribe((response)=>{
        resolve(response);
        this.spinner.hide();
      },(error)=>{
        reject(error);
        this.spinner.hide();
      })
    })

  }

}
