import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-payment-mode',
  templateUrl: './payment-mode.component.html',
  styleUrls: ['./payment-mode.component.css']
})
export class PaymentModeComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private route: Router, private userService: UsersService, private spinner: NgxSpinnerService) { }
  packageID: any;

  ServiceAreaID: any;

  ServiceAreaName: any;
  planPaymentResponse: any = {};
  packageDetails: any = {};
  paymentType: any;
  paymentMode: boolean = false;
  offlinePaymentMode: any;
  declaration: boolean=false;
  binNumberValidation: boolean = false;
  transactionCharges: any = {};
  iciciccAvenueFormDetails:any={};
  ngOnInit(): void {
    this.spinner.show();
    this.packageID = this.activeRoute.snapshot.queryParams["PackageID"];
    this.ServiceAreaID = this.activeRoute.snapshot.queryParams["ServiceAreaID"];
    this.ServiceAreaName = this.activeRoute.snapshot.queryParams["ServiceAreaName"];

    var paramsObj: any = {};
    paramsObj["PackageID"] = this.packageID;
    paramsObj["TimePeriodInMonths"] = "12";
    paramsObj["Type"] = "Package";
    paramsObj["PackageSubscribed"] = "No";
    paramsObj["Subscribed"] = "No";
    // this.userService.getPlansPriceCalculationDetails(paramsObj).subscribe((plandetails) => {
    //   if (plandetails.code == "S001") {
    //     this.packageDetails = plandetails.data.packagedetails;
    //     this.spinner.hide();
    //   }
    //   else {
    //     this.spinner.hide();
    //     alert(plandetails.data);
    //   }
    // }, (error) => {
    //   this.spinner.hide();
    //   alert(error.error.data)
    // })

    var getPlansPriceCalculationDetailsPromise = new Promise((resolve, reject) => {
      this.userService.getPlansPriceCalculationDetails(paramsObj).subscribe((resultforPromise) => {
        if (resultforPromise.code == "S001") {
          return resolve(resultforPromise.data.packagedetails);
        }
        else {
          return reject(resultforPromise.data);
        }

      }, (error) => {
        return reject(error.data);
      })
    })


    Promise.resolve(getPlansPriceCalculationDetailsPromise).then((pres: any) => {
      this.packageDetails = pres;
      this.spinner.hide();
    }).catch((e: any) => {
      this.spinner.hide();
      alert(e);
    })
  }

  onOfflinePaymentMode(opMode: any) {
    this.spinner.show();
    this.offlinePaymentMode = opMode.target.value;
    this.spinner.hide();
  }
  onOfflinePaymet() {
    this.spinner.show();
    this.paymentType = "Offline";
    this.paymentMode = false;
    this.declaration = false;
    this.spinner.hide();
  }
  onOnlinePaymet() {
    this.spinner.show();
    this.paymentType = "Online";
    this.declaration = false;
    this.spinner.hide();
  }
  onDeclaration(declarationCheck: any) {
    this.spinner.show();
    this.declaration = declarationCheck.target.checked
    this.spinner.hide();
  }
  onOfflinePaymentSubmit() {
    this.spinner.show();
    this.onCreateCustomerPlanDetails((responseCode: any, ccpdCallBackResponse: any) => {
      if (responseCode == "D001") {
        this.spinner.hide();
        alert("Your Package Request is Received ,We Will Contact You Shortly.")
        this.route.navigate(["/App/Plans"]);
      } else {
        this.spinner.hide();
        alert(ccpdCallBackResponse)
      }
    })
  }
  onPaymentModeClick(paymentOption: any) {
    this.spinner.show();
    this.paymentMode = true
    var paymentParamsObj: any = {};
    paymentParamsObj.PaymentOption = paymentOption.target.value;
    paymentParamsObj.TotalPrice = this.packageDetails.TotalPrice;
    paymentParamsObj.CurrencyType = this.packageDetails.CurrencyType;
    this.userService.viewPlansPaymentTransactionCharges(paymentParamsObj).subscribe((tcResponse) => {
      if (tcResponse.code == "S001") {
        if (paymentParamsObj.PaymentOption == "HDFC") {
          this.transactionCharges["planFeeINR"] = tcResponse.data.PriceInINR;
          this.transactionCharges["transactionChargesINR"] = tcResponse.data.HDFCChargesInINR;
          this.transactionCharges["totalINR"] = tcResponse.data.TotalPriceInINR;
          this.transactionCharges["PaymentMode"] = "HDFC";
          this.transactionCharges["PaymentType"] = "Online";
          this.transactionCharges["finalpriceUSD"] = tcResponse.data.TotalPrice;
          this.transactionCharges["PaymentGatewayChargesPercentage"] = tcResponse.data.HDFCChargesPercentage;
          this.transactionCharges["PaymentGatewayTransactionCharges"] = tcResponse.data.HDFCCharges;
        } else if (paymentParamsObj.PaymentOption == "PAYTM") {
          this.transactionCharges["planFeeINR"] = tcResponse.data.PriceInINR;
          this.transactionCharges["transactionChargesINR"] = tcResponse.data.PaytmChargesInINR;
          this.transactionCharges["totalINR"] = tcResponse.data.TotalPriceInINR;
          this.transactionCharges["finalpriceUSD"] = tcResponse.data.TotalPrice;
          this.transactionCharges["PaymentMode"] = "Paytm";
          this.transactionCharges["PaymentType"] = "Online";
          this.transactionCharges["finalpriceUSD"] = tcResponse.data.TotalPrice;
          this.transactionCharges["PaymentGatewayChargesPercentage"] = tcResponse.data.PaytmChargesPercentage;
          this.transactionCharges["PaymentGatewayTransactionCharges"] = tcResponse.data.PaytmCharges;
        }
        else if (paymentParamsObj.PaymentOption == "ICICI_CCAvenue") {
          // console.log(tcResponse,"tcResponse")
          this.transactionCharges["planFeeINR"] = tcResponse.data.PriceInINR;
          this.transactionCharges["transactionChargesINR"] = tcResponse.data.ICICICCavenuechargesInINR;
          this.transactionCharges["totalINR"] = tcResponse.data.TotalPriceInINR;
          this.transactionCharges["finalpriceUSD"] = tcResponse.data.TotalPrice;
          this.transactionCharges["PaymentMode"] = "ICICI_CCAvenue";
          this.transactionCharges["PaymentType"] = "Online";
          this.transactionCharges["finalpriceUSD"] = tcResponse.data.TotalPrice;
          this.transactionCharges["PaymentGatewayChargesPercentage"] = tcResponse.data.ICICICCavenueChargesPercentage;
          this.transactionCharges["PaymentGatewayTransactionCharges"] = tcResponse.data.ICICICCavenuecharges;
        }
        this.onCreateCustomerPlanDetails((code: any, ccpdResponse: any) => {
          if (code == "D001") {
            this.onPlanPayment(paymentParamsObj.PaymentOption, ccpdResponse, (code: any, ppCallBackResponse: any) => {
              if (code == "S001") {
                this.planPaymentResponse = ppCallBackResponse;
                this.spinner.hide();
              } else {
                this.spinner.hide();
                alert(ppCallBackResponse)
              }
            });
            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert(ccpdResponse)
          }
        });
      }
      else {
        alert(tcResponse.data);
      }
    }, (error) => {
      alert(error.error.data)
    })
  }
  onCreateCustomerPlanDetails(ccpdCallBack: any) {
    this.spinner.show();
    if (Object.keys(this.transactionCharges).length > 0) {
      this.packageDetails["finalprice"] = this.transactionCharges.totalINR;
      this.packageDetails["finalpriceUSD"] = this.transactionCharges.finalpriceUSD;
      this.packageDetails["PackageSubscribed"] = "No";
      this.packageDetails["Subscribed"] = "No";
      this.packageDetails["PaymentMode"] = this.transactionCharges.PaymentMode;
      this.packageDetails["PaymentType"] = this.transactionCharges.PaymentType;
      this.packageDetails["PriceInINR"] = this.transactionCharges.planFeeINR;
      this.packageDetails["PaymentGatewayChargesPercentage"] = this.transactionCharges["PaymentGatewayChargesPercentage"];
      this.packageDetails["PaymentGatewayTransactionCharges"] = this.transactionCharges["PaymentGatewayTransactionCharges"];
    } else {
      this.packageDetails["PaymentType"] = "Offline";
      this.packageDetails["Subscribed"] = "No";
      this.packageDetails["TermsAndConditions"] = true;
      this.packageDetails["PackageSubscribed"] = "No";
      this.packageDetails["PaymentMode"] = this.offlinePaymentMode;

    }
    this.packageDetails["ServiceAreaID"] = this.ServiceAreaID;
    this.packageDetails["ServiceAreaName"] = this.ServiceAreaName;
    this.userService.createCustomerPlanDetails(this.packageDetails).subscribe((customerplanDetailsResponse: any) => {
      if (customerplanDetailsResponse.code == "D001") {
        this.spinner.hide();
        ccpdCallBack(customerplanDetailsResponse.code, customerplanDetailsResponse.data.data);
        return;
      }
      else {
        this.spinner.hide();
        ccpdCallBack(customerplanDetailsResponse.code, customerplanDetailsResponse.data);
        return;
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }
  onPlanPayment(paymentMode: any, params: any, ppCallBack: any) {
    this.spinner.show();
    var paramsforPlanPayment: any = {};
    paramsforPlanPayment["CurrencyType"] = params.CurrencyType;
    paramsforPlanPayment["EmailID"] = params.CustomerDetails.EmailID;
    paramsforPlanPayment["MobileNumber"] = params.CustomerDetails.MobileNumber;
    paramsforPlanPayment["Name"] = params.CustomerDetails.Name;
    paramsforPlanPayment["PackageName"] = params.Name;
    paramsforPlanPayment["PaymentID"] = params.AnvayaaPaymentID;
    paramsforPlanPayment["TotalPrice"] = this.transactionCharges.totalINR;
    paramsforPlanPayment["Channel"] = "WEB";
    paramsforPlanPayment["SubDomain"] = "ICICI";

    if (paymentMode == "PAYTM") {
      this.userService.createPlanPaymentforPAYTM(paramsforPlanPayment).subscribe((planPaymentResponse: any) => {
        if (planPaymentResponse.code == "S001") {
          this.spinner.hide();
          ppCallBack(planPaymentResponse.code, planPaymentResponse.data)
        } else {
          this.spinner.hide();
          ppCallBack(planPaymentResponse.code, planPaymentResponse.data)
        }
      }, (error) => {
        this.spinner.hide();
        ppCallBack("Error", error.error.data)
      })
    }
    else if (paymentMode == "ICICI_CCAvenue") {
      this.userService.createPlanPaymentforccAvenue(paramsforPlanPayment).subscribe((planPaymentResponse: any) =>{
        if(planPaymentResponse.code=="S001"){
          this.spinner.hide();
          // this.iciciccAvenueFormDetails=planPaymentResponse.data;
          ppCallBack(planPaymentResponse.code, planPaymentResponse.data)
        }
        else {
          this.spinner.hide();
          ppCallBack(planPaymentResponse.code, planPaymentResponse.data)
        }

      },(error) => {
          this.spinner.hide();
          ppCallBack("Error", error.error.data)
        })
    }else if(paymentMode == "HDFC"){
       this.userService.createPlanPaymentforHDFC(paramsforPlanPayment).subscribe((planPaymentResponse: any) => {
        if (planPaymentResponse.code == "S001") {
          this.spinner.hide();
          ppCallBack(planPaymentResponse.code, planPaymentResponse.data)
        } else {
          this.spinner.hide();
          ppCallBack(planPaymentResponse.code, planPaymentResponse.data)
        }
      }, (error) => {
        this.spinner.hide();
        ppCallBack("Error", error.error.data)
      })
    }
  }
  onBinVerify(binNumber: any) {
    this.spinner.show();
    var onBinNumber = new Promise((resolve, reject) => {
      this.userService.iciciCardDetails(binNumber).subscribe((cardDetailsAPIResponse: any) => {
        resolve(cardDetailsAPIResponse)
      }, (error) => {
        if (error.error.code == "ND01") {
          resolve(error.error)
        } else {
          reject(error)
        }
      })
    })

    onBinNumber.then((cardDetails: any) => {
      if (cardDetails.code == "ND01") {
        this.spinner.hide();
        alert(cardDetails.data)
      } else if (cardDetails.code == "S002") {
        this.spinner.hide();
        alert(cardDetails.data)
      } else if (cardDetails.code == "S001") {
        this.binNumberValidation = true;
        this.spinner.hide();
      }
    }).catch(e => {

      this.spinner.hide();
      alert(e.error.data);

    })


  }
}
