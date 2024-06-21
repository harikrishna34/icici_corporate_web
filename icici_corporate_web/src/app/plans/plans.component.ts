import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  userDetails: any;
  allServiceAreas: any = [];
  packageDetails: any = [];
  CustomerDetails: any;
  City: String = "";
  CityFound: boolean = false;
  cityData: any = []

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder, private userService: UsersService, private spinner: NgxSpinnerService) {
  }
  ngOnInit(): void {
    this.spinner.show();
    this.userService.UserDetails().subscribe((userDetailsResponse) => {
      if (userDetailsResponse.code == "S001") {
        this.CustomerDetails = userDetailsResponse.data.customer;
        if (this.CustomerDetails.BenificiarysAddress && this.CustomerDetails.BenificiarysAddress.length > 0) {
          this.City = this.CustomerDetails.BenificiarysAddress[0].City;
        }
        this.userDetails = userDetailsResponse.data.subscription.data;

        if (this.userDetails == undefined) {
          this.ServiceLocaion()
        }
        this.spinner.hide();
      } else {
        this.spinner.hide();
        alert(userDetailsResponse.data)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })

  }

  ServiceLocaion() {
    this.userService.viewAllServiceAreas().subscribe((response) => {
      if (response.code == "S001") {
        this.allServiceAreas = response.data;
        for (let sr in this.allServiceAreas) {
          if (this.City == this.allServiceAreas[sr].CityName) {
            this.CityFound = true;
          }
        }
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        alert(response.data)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }





  onCitySelect(eve: any) {

    let obj = this.allServiceAreas.filter((obj: any) => {
      return eve.target.value === obj.CityID
    })
    this.cityData = obj
    this.spinner.show();
    var params = { ServiceAreaID: eve.target.value };
    this.userService.viewCustomerAreaWiseAllPlansDetails(params).subscribe((planDetailsRes) => {
      if (planDetailsRes.code == "S001") {

        this.packageDetails = planDetailsRes.data.packagesdetails;
        this.spinner.hide();
      } else if (planDetailsRes.code == "D001") {
        this.spinner.hide();
        alert(planDetailsRes.data);
        this.packageDetails = [];
      }
      else {
        this.spinner.hide();
        alert(planDetailsRes.data);
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }

  onPackageSelection(selectedPackage: any) {
    this.spinner.show();
    var PackageID = selectedPackage.PackageID;
    this.route.navigate(['/App/Plan/PaymentMode'], { queryParams: { PackageID: PackageID, ServiceAreaID: this.cityData[0].CityID, ServiceAreaName: this.cityData[0].CityName } });
    this.spinner.hide();
  }
  UserInfo() {

    this.spinner.show();
    return new Promise((resolve, reject) => {
      this.userService.UserDetails().subscribe(Response => {
        this.spinner.hide();
        resolve(Response)
      },
        (error) => {
          this.spinner.hide();
          if (error.error.code == "V002") {
            //  this.userService.logout()
          } else {
            reject(error.error.data)
          }
        }
      )
    })
    // return userDetails;
  }
}
