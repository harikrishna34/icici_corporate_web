import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-emergencyplan',
  templateUrl: './emergencyplan.component.html',
  styleUrls: ['./emergencyplan.component.css']
})
export class EmergencyplanComponent implements OnInit {
  public Emergencyplanform!: UntypedFormGroup;
  userDetails: any = []
  users:any=[]
  customer:any={}
  view:any=0
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder,private userService:UsersService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.viewuserDetails()

    this.Emergencyplanform = this.formBuilder.group({

})
  }
// aa

viewuserDetails() {
  this.spinner.show()
  this.userService.viewUser().subscribe((Response) => {
    if (Response.code == "S001") {
      this.spinner.hide()
    //  console.log(Response.data)
    this.userDetails=Response.data
console.log(this.userDetails)
this.users=Response.data.customer.EmergencyHealthPlans
this.customer=this.users[0]
    } else {
      this.spinner.hide()
      alert(Response.data)
    }
  },
    (error) => {
      this.spinner.hide()
      alert(error.error.data)
    })
}
ViewByProfile(CustID:any,index:any) {
  this.view = index;
  for (let i=0; i<this.users.length ; i++) {


if (CustID==this.users[i].CustID){
  console.log(this.users[i])
  this.customer=this.users[i]

}


  }


}
}

