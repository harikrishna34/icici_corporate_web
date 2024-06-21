import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../users.service';
import { allowedNodeEnvironmentFlags } from 'process';
import { NgxSpinnerService } from 'ngx-spinner';
// import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
public otpVarification!:UntypedFormGroup
CustRecID:any
OTPRecID:any
VarifyOTP:boolean=false
responseMessage:String=''
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder, private UsersService: UsersService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.otpVarification=this.formBuilder.group({
      OTPCode:[''],

    })
  }
otpVarify(){
  this.VarifyOTP=true
if(this.otpVarification.status=="INVALID"){
  return
}else{
  let varifyAccountObj={
    CustRecID:localStorage.getItem('CustRecID'),
    OTPRecID:localStorage.getItem('OTPRecID'),
    OTPCode: this.otpVarification.value.OTPCode
  }
  // console.log("varifyAccountObj",varifyAccountObj)
  this.spinner.show()
    this.UsersService.otpVarification(varifyAccountObj).subscribe((response)=>{
  if(response.code=="S001"){
    // alert(response.data)
    setTimeout(() => {
      this.route.navigate(['/Login'])
      this.spinner.hide()

    }, 3000);
 
  }else{
    this.responseMessage=response.data
    this.spinner.hide()
    alert(response.data)
  }
    },(error)=>{
      alert(error.error.data)
      this.spinner.hide()
    })
}

}
}
