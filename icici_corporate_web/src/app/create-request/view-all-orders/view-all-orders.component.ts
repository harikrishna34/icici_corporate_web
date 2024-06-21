import { Component, OnInit,ViewChild } from '@angular/core';

import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../../users.service';
import { allowedNodeEnvironmentFlags } from 'process';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common'
import * as moment from 'moment';
@Component({
  selector: 'app-view-all-orders',
  templateUrl: './view-all-orders.component.html',
  styleUrls: ['./view-all-orders.component.css']
})
export class ViewAllOrdersComponent implements OnInit {
  @ViewChild('closebutton') closebutton:any;
  orders:any=[]
  RequestDetails:any
  public Reschedule!:UntypedFormGroup
  ReqDate:any

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder, private UsersService: UsersService, private spinner: NgxSpinnerService,private DatePipe:DatePipe) { }

  ngOnInit(): void {
    this.viewUser()
    this.Reschedule=this.formBuilder.group({
      RequestedDate:['']
    })


  }
viewUser(){
  this.spinner.show()
  this.UsersService.viewCustomerRequests().subscribe((Response) => {
    if (Response.code == "S001") {
      this.spinner.hide()
this.orders=Response.data

    } else {
      this.spinner.hide()
      alert(Response.code)
    }
  }, (error: any) => {
    this.spinner.hide()
    alert(error.error.data)
  })

}
  ViewOrder(RequestID:any){
    this.route.navigate(['/App/ViewOrder'],{queryParams:{RequestID:RequestID}})
  }


  // cancelRequest




  CancelRequest(Request:any){

if(confirm('Are you sure want to cancel request')){
  this.spinner.show()
  let canccelRequestObj={
    RequestID:Request.RequestID,
    CustRecID:Request.CustRecID
  }
  console.log(canccelRequestObj)
  this.UsersService.cancelRequest(canccelRequestObj).subscribe((Response:any) => {
    if(Response.code=="R007"){
      this.spinner.hide()
      this.viewUser()
      

    }else{
      this.spinner.hide()
      alert(Response.data)
    }
    
    console.log(Response)
  },(error:any)=>{
    this.spinner.hide()
    alert(error.error.dta)
  })
}else{
return;
}  
  }

  RequestData(RequestData:any){
// console.log("!!!",RequestData)
this.RequestDetails=RequestData
  }
  RescheduleRequest(){
  this.spinner.show()
    
  if(!moment(this.Reschedule.value.RequestedDate, "DD-MM-YYYY HH:mm", true).isValid())
  {
    this.ReqDate = this.DatePipe.transform(this.Reschedule.value.RequestedDate, 'dd-MM-YYYY hh:mm')
    }
        let RescheduleObj={
          CustRecID:this.RequestDetails.CustRecID,
          RequestID:this.RequestDetails.RequestID,
          RequestedDate:  this.ReqDate 
        }

        console.log(RescheduleObj,this.RequestDetails.AliasName)
        
        this.UsersService.rescheduleRequest(RescheduleObj).subscribe((Response:any) => {
          if(Response.code=="R007"){
            console.log("!!!")
            this.spinner.hide()
            alert(Response.data)  
            this.viewUser()
            this.closebutton.nativeElement.click();
            
    
          }else{
            this.spinner.hide()
            alert(Response.data)
            this.closebutton.nativeElement.click();
          }
          
          console.log(Response)
        },(error:any)=>{
          this.spinner.hide()
          alert(error.error.dta)
          this.closebutton.nativeElement.click();
        })
      }
    }