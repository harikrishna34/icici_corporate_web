import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../users.service';
import { allowedNodeEnvironmentFlags } from 'process';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  Services: any = []
  categories: any = []
  CustRecID: any
  requestDetails: any
  public EmergencyRequest!: UntypedFormGroup
  users: any = []
  userDetails:any=[]
  createRequestBtn: boolean = false
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder, private UsersService: UsersService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.viewuserDetails()
    this.viewCategoryDetails()
    
  
    this.EmergencyRequest = this.formBuilder.group({
      CustomerName: ['']
    })
  }



  viewCategoryDetails() {
    this.UsersService.viewCategoryDetails().subscribe((Response) => {
      if (Response.code = "S001") {
        this.spinner.hide()
        this.categories = Response.data.categories;
      
        this.Services = Response.data.subcategories;
      } else {
        this.spinner.hide()
        alert(Response.data)
      }
    }, (error) => {
      this.spinner.hide()
      alert(error.error.data)
    })
  }

  bookPage(Service: any) {
    if(this.userDetails.subscription.packagesubscribed != undefined && this.userDetails.subscription.packagesubscribed == false){
      this.route.navigate(["App/Plans"])
    }else{
      this.route.navigate(["/App/book"], { queryParams: { ServiceID: Service.SubCategoryID } })
    }


  }
  viewuserDetails() {
    this.UsersService.viewUser().subscribe((Response) => {
      if (Response.code == "S001") {
        this.userDetails = Response.data
        this.CustRecID = Response.data.customer.CustRecID
        this.users = Response.data.customer.Beneficiaries
        this.viewUserAllRequest()
      } else {
        alert(Response.data)
      }
    },
      (error) => {
        alert(error.error.data)
      })
  }
  viewUserAllRequest() {
    this.UsersService.viewAllRequest(this.CustRecID).subscribe((Response: any) => {
      if (Response.code == "S001") {
        this.requestDetails = Response.data
      } else {
        // alert(Response.data)
      }
    }, (error: any) => {
      // alert(error.error.data)
    })
  }


  EmergencyRequestCreate() {

    this.createRequestBtn = true

    if (this.EmergencyRequest.status == "INVALID") {
      return;
    }
    else {
      let customerObj = {
        CustID: this.EmergencyRequest.value.CustomerName
      }


      this.spinner.show()
      this.UsersService.createEmergencyRequest(customerObj).subscribe((Response: any) => {
        if (Response.code == "R007") {
          this.spinner.hide()
          alert(Response.data)
          this.closebutton.nativeElement.click();
        } else {
          this.spinner.hide()
          alert(Response.data)
          this.closebutton.nativeElement.click();
        }
      }, (error: any) => {
        this.spinner.hide()
        alert(error.error.dta)
        this.closebutton.nativeElement.click();
      })
    }
  }
}
