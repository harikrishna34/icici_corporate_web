import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Router, Routes } from '@angular/router';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../../users.service';
import { allowedNodeEnvironmentFlags } from 'process';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common'
import * as moment from 'moment';
@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  appointment:any={}
  StatusTrack:any=[]
  RequestID:any
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder, private UsersService: UsersService, private spinner: NgxSpinnerService,private DatePipe:DatePipe) { }

  ngOnInit(): void {
    this.RequestID = this.activatedRoute.snapshot.queryParams["RequestID"]
    this.viewRequestsDetails()
  }
viewRequestsDetails(){
this.spinner.show()

let details={
  RequestID:this.RequestID
}
this.UsersService. viewRequest(details).subscribe((Response:any)=>{
if( Response.code=='S001'){
  this.spinner.hide()
  this.appointment=Response.data
  this.StatusTrack==Response.data.StatusTrack

  console.log(Response.data.StatusTrack[0].img)
  for (let i = 0; i < this.appointment.StatusTrack.length; i++) {

    if (this.appointment.StatusTrack[i].Status == 'Requested') {
        if (this.appointment.StatusTrack[i].Note == undefined) {
          this.appointment.StatusTrack[i].Note = "Request is Created.";
        }
        if (this.appointment.StatusTrack[i].Note.length == 0) {
          this.appointment.StatusTrack[i].Note = "Request is Created.";
        }
        this.appointment.StatusTrack[i].img = "../../../assets/images/confirmation_512.png";
    }
    if (this.appointment.StatusTrack[i].Status == 'Processing') {

      this.appointment.StatusTrack[i].img = "../../../assets/images/inprogress_3x.png";
    }
    if (this.appointment.StatusTrack[i].Status == 'Pending') {

      this.appointment.StatusTrack[i].img = "../../../assets/images/pending.png";
    }
    if (this.appointment.StatusTrack[i].Status == 'Assigned') {

      this.appointment.StatusTrack[i].img = "../../../assets/images/Assign.png";
    }
    if (this.appointment.StatusTrack[i].Status == 'Accepted') {

      this.appointment.StatusTrack[i].img = "../../../assets/images/confirmation_512.png";
    }
    if (this.appointment.StatusTrack[i].Status == 'EmergencyTrigger') {

      this.appointment.StatusTrack[i].img = "../../../assets/images/alarm.png";
    }
    if (this.appointment.StatusTrack[i].Status == 'Delegated') {

      this.appointment.StatusTrack[i].img = "../../../assets/images/delegateWeb.png";
    }

    if (this.appointment.StatusTrack[i].Status == 'Rescheduled') {
      this.appointment.StatusTrack[i].img = "../../../assets/images/Reschedule.png";
        if (this.appointment.StatusTrack[i].Note == undefined) {
          this.appointment.StatusTrack[i].Note = "Request is Rescheduled.";
        }
        if (this.appointment.StatusTrack[i].Note.length == 0) {
          this.appointment.StatusTrack[i].Note = "Request is Rescheduled.";
        }
    }
    if (this.appointment.StatusTrack[i].Status == 'Canceled') {
        if (this.appointment.StatusTrack[i].Note == undefined) {
          this.appointment.StatusTrack[i].Note = "Request is Canceled.";
        }
        if (this.appointment.StatusTrack[i].Note.length == 0) {
          this.appointment.StatusTrack[i].Note = "Request is Canceled.";
        }
        this.appointment.StatusTrack[i].img = "../../../assets/images/cancel.png";
    }
    if (this.appointment.StatusTrack[i].Status == 'Completed') {
      this.appointment.StatusTrack[i].img = "../../../assets/images/completed_1.5x.png";
    }
}
}else{
  this.spinner.hide()
  alert(Response.data)
}
},(error)=>{
  this.spinner.hide()
  alert(error.error.data)
})
}
}
