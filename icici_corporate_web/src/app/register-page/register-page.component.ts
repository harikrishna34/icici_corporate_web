import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../users.service';
import { allowedNodeEnvironmentFlags } from 'process';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {
  @ViewChild('CityValue') CityValue: any;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.India];
  public RegisterForm!: UntypedFormGroup;
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder, private UsersService: UsersService, private spinner: NgxSpinnerService) { }
  Register: boolean = false
  emailValidation: boolean = true
  passwordValidation: boolean = true
  ServiceAreasDetails: any;
  selectedStateCities: any;
  Cities: any;
  States: any;
  // contryName:any
  contryName: boolean = false
  keyword: any = ''

  name: any = "anil"
  CityName: any = "";
  State: any = "";

  nameValidationpatt: boolean = true
  html: any = "Please don't worry if your location is not mentioned. We are curretly serviceable across India and our team will get back to you"
  info: any
  // contryBtn:boolean=true
  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({

      CountryCode: [''],
      EmailID: [''],
      MobileNumber: [''],
      CountryName: [''],
      Name: ['', [Validators.pattern('^[A-Za-z -]+$')]],
      Password: [''],
      ReTypePassword: [''],
      TempMobileNumber: ['']
    })
    this.Locations()
    // this.viewAllServiceAreasDetails()
  }
  email(email: any) {
    this.spinner.show();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if ((this.RegisterForm.value.EmailID.match(emailPattern)) && this.RegisterForm.value.EmailID != '') {
      this.emailValidation = true
    } else {
      this.emailValidation = false
    }
    this.spinner.hide();
  }
  passwod(ph: any) {
    this.spinner.show();
    if ((this.RegisterForm.value.Password == this.RegisterForm.value.ReTypePassword && this.RegisterForm.value.ReTypePassword != undefined)) {
      this.passwordValidation = true
    } else {
      this.passwordValidation = false
    }
    this.spinner.hide();
  }

  nameValidation() {
    this.spinner.show();
    var namepattern = '^[A-Za-z -]+$';
    if ((this.RegisterForm.value.Name.match(namepattern)) && this.RegisterForm.value.Name != '') {
      this.nameValidationpatt = true
    } else {
      this.nameValidationpatt = false
    }
    this.spinner.hide();
  }
  RegisterCustomer() {

    
   
    this.Register = true;
    if (!this.passwordValidation) {
      this.spinner.hide();
      return;
    }
    if (this.RegisterForm.status == 'INVALID') {
      this.spinner.hide();
      return
    } else {
      this.spinner.hide()

      if (this.State =='' ||this.State == null || this.State == undefined) {
        
    
        return;

      }
      if (this.CityName =='' || this.CityName == null || this.CityName == undefined) {
       
        return
       
      }

      
      let RegisterCustomerObj = {
        CountryCode: this.RegisterForm.value.CountryCode.countryCode,
        EmailID: this.RegisterForm.value.EmailID,
        MobileNumber: this.RegisterForm.value.CountryCode.number,
        Name: this.RegisterForm.value.Name,
        Password: this.RegisterForm.value.Password,
        ReTypePassword: this.RegisterForm.value.ReTypePassword,
        TempMobileNumber: this.RegisterForm.value.CountryCode.number,
        City: this.CityName,
        State: this.State

      }
      this.spinner.show();
      this.UsersService.RegisterCustomer(RegisterCustomerObj).subscribe((Response) => {
        if (Response.code == "R001") {
          localStorage.setItem("CustRecID", Response['CustRecID'])
          localStorage.setItem("OTPRecID", Response['OTPRecID'])

          // this.spinner.show()
          this.spinner.hide()
          setTimeout(() => {
            this.route.navigate(['/varifyAccount'])
            this.spinner.hide()

          }, 2000);


          alert(Response.data)
        } else {
          this.spinner.hide()
          alert(Response.data)

        }
      }, (error) => {
        this.spinner.hide();
        alert(error.error.data)
      })
    }

  }

  viewAllServiceAreasDetails() {
    this.spinner.show();
    this.keyword = 'CityName'
    this.UsersService.viewAllServiceAreas().subscribe((ServiceAreas) => {
      if (ServiceAreas.code == "S001") {
        this.ServiceAreasDetails = ServiceAreas.data;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        alert(ServiceAreas.data);
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }
  onCountryChange(contry: any) {
    this.spinner.show();
    this.contryName = false
    this.info = ''
    if (contry.dialCode != "91") {
      this.contryName = true
    }
    this.spinner.hide();
  }
  LoginPage() {
    this.spinner.show();
    this.route.navigate(['/Login']);
    this.spinner.hide();
  }
  Locations() {
    this.spinner.show();
    this.UsersService.Locations().subscribe((locationsData: any) => {
      if (locationsData.code == "S001") {
        this.Cities = locationsData.Cities;
        this.States = locationsData.States;
        this.spinner.hide();

      } else {
        this.spinner.hide();
        alert(locationsData.data)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }
  onStateSelect(state: any) {
    this.spinner.show();
    var stateName = state.Name
    this.State = stateName;
    this.selectedStateCities = this.Cities.filter((obj: any) => {
      return obj.State == stateName
    });
    this.spinner.hide();
  }
  onCitySelection(city: any) {
    this.spinner.show();
    this.CityName = city.Name;
    this.spinner.hide();
  }
  onStateChange() {
    this.spinner.show();
    this.selectedStateCities = [];
    this.CityValue.clear();
    this.spinner.hide();
  }
}