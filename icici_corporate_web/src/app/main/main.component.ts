import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Routes } from '@angular/router';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../users.service';
import { allowedNodeEnvironmentFlags } from 'process';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  Name:any
  public isCollapsed = true;
  x:any

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder, private UsersService: UsersService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.Name=localStorage.getItem('Name')
  }
  AnvayaaServices(){
    this.route.navigate(['/App/Dashboard'])
  }
  Logout() {
    localStorage.removeItem("x-fiftyaccess-token")
    this.route.navigate(["/Login"]);
  }
  Details(data:any){
    console.log(data.target.value)
if(data.target.value=="mod2"){
  localStorage.removeItem("x-fiftyaccess-token")
  this.route.navigate(["/Login"]);
}
if(data.target.value=="mod1"){
  localStorage.removeItem("x-fiftyaccess-token")
  this.route.navigate(["/App/ChangePassword"]);
}
if(data.target.value=="mod0"){
  localStorage.removeItem("x-fiftyaccess-token")
  this.route.navigate(["/App/addBeneficiary"]);
}
  }
  AllRequest(){
    this.route.navigate(['/App/AllOrders'])
  }
  EMR(){
    this.route.navigate(['/App/EMR'])

}
onMyPlan(){
  this.route.navigate(['/App/Plans'])
}
onPMS(){
  this.route.navigate(['/Pms/PaymentManagment'])
}
Emergencyplan(){
  this.route.navigate(['/App/Emergencyplan'])
}
Asers(){
  this.route.navigate(['/App/Asers'])

}

myFunction() {
 this.x = document.getElementById("myTopnav");
  if (this.x.className === "topnav") {
    this.x.className += " responsive";
  } else {
  this.x.className = "topnav";
}
}

}
