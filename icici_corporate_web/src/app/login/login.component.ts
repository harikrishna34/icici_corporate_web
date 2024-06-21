import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginType: any;
  public LoginForm!: UntypedFormGroup;
  uderid: String = "";
  token: any;
  userDetails:any={}
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder,private userService:UsersService, private spinner:NgxSpinnerService) {
  }
  ngOnInit(): void {
    // this.spinner.show()
    // this.userService.viewUser().subscribe((Response) => {
    //   if (Response.code == "S001") {
    //     this.spinner.hide()
    //     this.userDetails = Response.data
       
    //     // this.validateServiceDetails()
    
    //   } else {
    //     this.spinner.hide()
    //     alert(Response.data)
    //   }
    // },
    //   (error) => {
    //     this.spinner.hide()
    //     alert(error.error.data)
    //   })
    this.LoginForm = this.formBuilder.group({
      UserID: [''],
      Password:['']
    })
  }



  check(uderid: any) {
    var phonenoPattern = /^[0]?[789]\d{9}$/;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    this.LoginType = "";
    this.uderid = this.LoginForm.value.UserID;
    if (this.uderid == '' || this.uderid == undefined) {
      this.LoginType = ''
      return;
    } else {
      if (!(this.uderid.match(phonenoPattern)) && !(this.uderid.match(emailPattern))) {

      }
      if ((this.uderid.match(emailPattern))) {
        this.LoginType = "Email";
        return;
      } else
        if ((this.uderid.match(phonenoPattern))) {
          this.LoginType = "Phone";
          return;
        }

    }
  }
  Login(){
   
    this.LoginForm.value.Type="customer";
    this.spinner.show();
    this.userService.userlogin(this.LoginForm.value).subscribe(Response => {
      this.spinner.hide();
     if (Response.code == "S001") {
      this.viewuserDetails();

      
        localStorage.setItem('xfiftyaccesstoken', Response.data['x-fiftyaccess-token'])
        localStorage.setItem('Name', Response.data.UserData.Data['Name'])
        this.token = localStorage.getItem('xfiftyaccesstoken')

        console.log("@!!@",this.userDetails)
        if(this.userDetails.subscription?.ResetPassword=="Yes"){
          this.route.navigate(['/App/ChangePassword'])
        }else{
          this.route.navigate(["/App/Plans"]);
        }
     

      } else {
        this.spinner.hide();

        alert(Response.data)
      }


    },
      (error) => {
        this.spinner.hide();
       console.log(error)
        alert(error.error.data)
      }
    )
  }
  RegisterPage(){
    this.route.navigate(['/Register'])
  }
  ForgotPassword()
  {
    this.route.navigate(['/ForgotPassword'])
  }
  viewuserDetails() {
  
  }
}
