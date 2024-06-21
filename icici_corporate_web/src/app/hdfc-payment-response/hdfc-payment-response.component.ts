import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { reject } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-hdfc-payment-response',
  templateUrl: './hdfc-payment-response.component.html',
  styleUrls: ['./hdfc-payment-response.component.css']
})
export class HdfcPaymentResponseComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,private spinner:NgxSpinnerService, private route: Router, private userService: UsersService) { }
  paymentID: any = "";
  paymentDetails:any={};
  ngOnInit(): void {
    this.spinner.show();
    this.paymentID = this.activeRoute.snapshot.queryParams["PaymentID"]
    var PaymentResponse = new Promise((resolve, reject) => {
      var responseObj:any={}
      this.userService.hdfcTransactionResponse({ "AnvayaaPaymentID": this.paymentID }).subscribe((transactionRespone) => {        
        if(transactionRespone.code=="PF00"){          
          responseObj["PaymentStatus"]=transactionRespone.data.paymentdetails[this.paymentID].status;
          responseObj["PaymentDetailsData"]=transactionRespone.data.paymentdetails[this.paymentID];
          responseObj["PaymentID"]=this.paymentID;
          responseObj["TransactionID"]=transactionRespone.data.paymentdetails[this.paymentID].mihpayid;
          responseObj["Price"]=transactionRespone.data.paymentdetails[this.paymentID].amt;
          responseObj["TransactionTime"]="0";
          responseObj["BankReferenceNumber"]=transactionRespone.data.paymentdetails[this.paymentID].bank_ref_num;
          responseObj["Package"]=transactionRespone.data.paymentdetails[this.paymentID].productinfo.replaceAll("_"," ");
        }
        if(transactionRespone.code=="D003"){
          responseObj["PaymentStatus"]=transactionRespone.data.transactiondetails.AnvayaaPaymentStatus=="success"?"Success":"failure";
          responseObj["PaymentDetailsData"]=transactionRespone.data.transactiondetails;
          responseObj["PaymentID"]=this.paymentID;
          responseObj["TransactionID"]=transactionRespone.data.transactiondetails.GatewayTransactionID;
          responseObj["Price"]=transactionRespone.data.transactiondetails.amt;

          if(responseObj["Price"]==undefined || responseObj["Price"]==null || responseObj["Price"].length ==0){
            responseObj["Price"]=transactionRespone.data.transactiondetails.Price;
          }

          responseObj["TransactionTime"]="0";
          responseObj["BankReferenceNumber"]=transactionRespone.data.transactiondetails.bank_ref_num;
          responseObj["Package"]=transactionRespone.data.transactiondetails.Purpose.replaceAll("_"," ");
        }
        resolve(responseObj);
      }, (error) => {
        reject(error.error.message)
      })
    })


    Promise.resolve(PaymentResponse).then((promiseRespones) => {
      this.spinner.hide();
      this.paymentDetails=promiseRespones
    }).catch((e) => {
      this.spinner.hide();
      alert(e)
    })


  }

}
