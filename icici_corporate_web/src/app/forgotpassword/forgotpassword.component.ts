import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { appendFile } from 'fs';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  public forgotpasswordform! : UntypedFormGroup;


  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder,private userService:UsersService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.forgotpasswordform = this.formBuilder.group({
      EmailID: ['']
    })
  }
  forgotpassword(){
    this.spinner.show();
    this.userService.forgotpassword(this.forgotpasswordform.value).subscribe(Response =>{
      if(Response.code=='L005') {
      
        alert(Response.data)

        
        setTimeout(() => {
          this.route.navigate(['/Login'])
          this.spinner.hide()
      

        }, 5000);
      }
      else{
        this.spinner.hide();
        alert(Response.data)
      }
    },(error)=>{
      this.spinner.hide();
      error.error.data
    })

}
RegisterPage(){
  this.route.navigate(['/Register'])
}
LoginPage(){
  this.route.navigate(['/Login'])
}
}
