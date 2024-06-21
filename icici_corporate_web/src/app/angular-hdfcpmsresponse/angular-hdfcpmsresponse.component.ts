import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { reject } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-angular-hdfcpmsresponse',
  templateUrl: './angular-hdfcpmsresponse.component.html',
  styleUrls: ['./angular-hdfcpmsresponse.component.css']
})
export class AngularHDFCPMSResponseComponent implements OnInit {
  AnvayaaPaymentID:any
  hdfcPaymentResponse:any
  constructor(private activeRoute: ActivatedRoute,private spinner:NgxSpinnerService, private route: Router, private userService: UsersService) { }

  ngOnInit(): void {


    this.AnvayaaPaymentID = this.activeRoute.snapshot.queryParams["PaymentID"]


    this.userService.pmsHDFCResponse({"AnvayaaPaymentID":this.AnvayaaPaymentID}).subscribe((transactionRespone:any) => {
                

              if(transactionRespone.code == "PF00"){
                
               this.hdfcPaymentResponse= transactionRespone.data.paymentdetails
                 
              }else{
               
               this.hdfcPaymentResponse= transactionRespone.data.transactiondetails

              } 

                    console.log("paytmPaymentResponse",this.hdfcPaymentResponse )
    })
  }

}
