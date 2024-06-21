import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
public changePasswordform! : UntypedFormGroup;
changePsdBtn:boolean=false
passwordValidation:any=true
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder,private userService:UsersService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.changePasswordform = this.formBuilder.group({
      CurrentPassword:[''],
      NewPassword:[''],
      ConfirmPassword:['']
})
}
  changepasswordBtn(){


    this.changePsdBtn=true
console.log(this.changePasswordform.status)
  if( this.changePasswordform.status=="INVALID"){
    return;
  } else{
    this.spinner.show();
    this.userService.changepassword(this.changePasswordform.value).subscribe(Response =>{
      if(Response.code=='P001') {
        this.spinner.hide()
        alert(Response.data)
        this.route.navigate(['/Login'])
      }
      else{
        this.spinner.hide()
        alert(Response.data)
      }
    },(error)=>{
      this.spinner.hide()
      error.error.data
    })
  }
   

}


passwod(){
  console.log(this.changePasswordform.value.Password, this.changePasswordform.value.ConfirmPassword)
  if ((this.changePasswordform.value.NewPassword == this.changePasswordform.value.ConfirmPassword && this.changePasswordform.value.ConfirmPassword != undefined)) {
    this.passwordValidation = true
    console.log("true")
  } else {
    console.log("false")
    this.passwordValidation = false
  }
}
}
