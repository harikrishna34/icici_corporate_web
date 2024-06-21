import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { reject } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-angular-paytm-pmsresponse',
  templateUrl: './angular-paytm-pmsresponse.component.html',
  styleUrls: ['./angular-paytm-pmsresponse.component.css']
})

export class AngularPaytmPMSResponseComponent implements OnInit {
  OrderID:any
  paymentId:any={}
  paytmPaymentResponse:any
  constructor(private activeRoute: ActivatedRoute,private spinner:NgxSpinnerService, private route: Router, private userService: UsersService) { }

  ngOnInit(): void {
    

    this.OrderID = this.activeRoute.snapshot.queryParams["PaymentID"]
    console.log("order id ",this.OrderID)


    this.userService.pmsPaytmResponse({"OrderID":this.OrderID}).subscribe((transactionRespone:any) => {
              if(transactionRespone.code == 'D003'){

              }else{
             
               this.paytmPaymentResponse= transactionRespone.data.paymentdetails
                  
              }
                    console.log("paytmPaymentResponse",this.paytmPaymentResponse )
    })
  }

}
