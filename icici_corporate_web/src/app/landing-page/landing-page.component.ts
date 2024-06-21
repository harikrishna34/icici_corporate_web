import {Component, AfterViewChecked, ElementRef, ViewChild, Pipe,OnInit} from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../users.service';
import { allowedNodeEnvironmentFlags } from 'process';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { callbackify } from 'util';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit,AfterViewChecked {
  onSubmitClick:boolean=false;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  year=new Date().getFullYear();
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates
  ];
  contryName:boolean=false
  info:any
  CityName:any
  CallBackForm !: UntypedFormGroup
  constructor(private chatBox: ElementRef ,private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder, private UsersService: UsersService, private spinner: NgxSpinnerService) { }
  ngAfterViewChecked(): void {
    this.scrollToBottom();    
  }

  ngOnInit(): void {
      this.CallBackForm = this.formBuilder.group({
          CountryCode: [''],
          EmailID: ['',Validators.pattern('^[(a-z)(A-Z)(1-9)(.)]+@+[a-z]+.+[a-z]{2,}')],
          MobileNumber: [''],
          Name: [''],
      })

      }

      scrollToBottom(): void {
        this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
      }

      
  RegisterPage(){
    this.route.navigate(['/Register'])
  }
  LoginPage(){
    this.route.navigate(['/Login'])
  }

  onCountryChange(contry:any){
    this.contryName=false
    this.info=''    
  if(contry.dialCode!="91" ){
   this.contryName=true
   
  }

  }
  onSubmitDetails(){
    this.spinner.show();
    this.onSubmitClick=true;
    var paramsForRegistrationDetails:any={};
    if(this.CallBackForm.status!="INVALID"){
      this.onSubmitClick=false;
      paramsForRegistrationDetails.Name=this.CallBackForm.value.Name;
      paramsForRegistrationDetails.EmailID=this.CallBackForm.value.EmailID;
      paramsForRegistrationDetails.CountryCode=this.CallBackForm.value.CountryCode.dialCode;
      paramsForRegistrationDetails.MobileNumber=this.CallBackForm.value.CountryCode.number.replace(/\s/g, "");
      this.UsersService.userRegistraion(paramsForRegistrationDetails).subscribe((userRegistrationAPIresponse:any)=>{
        if(userRegistrationAPIresponse.code=="S001"){
          this.spinner.hide();
          alert(userRegistrationAPIresponse.data);
          this.CallBackForm.reset();
        }
        else{
          this.spinner.hide();
          alert(userRegistrationAPIresponse.data)
        }
      })
    }else{
      this.spinner.hide();
    }
  //  ?dd
  }
}
