import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-addbeneficiary',
  templateUrl: './addbeneficiary.component.html',
  styleUrls: ['./addbeneficiary.component.css']
})
export class AddbeneficiaryComponent implements OnInit {
  public Addbeneficiaryform!: UntypedFormGroup;
  public beneficiaryform!: UntypedFormGroup;
  public beneficiaryform2!: UntypedFormGroup;
  BeneficiariesObj: any = {}
  userDetails: any = []
  Beneficiaries: any = []

  addBeneficiaryBtn: boolean = false
  page: any = 1
  updateBeneficiary: boolean = false
  CustIDData: any
  imageUrl: any
  editFile: boolean = true;
  removeUpload: boolean = false;
  public fb!: UntypedFormBuilder
  private cd!: ChangeDetectorRef
  profile: any = {}
  image: any
  agebtn:boolean=false
  filedata:any
  profileData:any
  updateBeneficiaryBtn:boolean=false
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: UntypedFormBuilder, private userService: UsersService, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.viewuserDetails()
    this.imageUrl = '../../assets/images/default-user_512.png'
    this.Addbeneficiaryform = this.formBuilder.group({
      Address: [''],
      Age: ['',Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      Gender: [''],
      MobileNumber: ['',Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      Name: [''],
      CustID: [''],
      ProfileImageFile: [''],
      img:['']
     
    })
    this.beneficiaryform = this.formBuilder.group({
      Address: [''],
      Age: [''],
      Gender: [''],
      Mobilenumber: [''],
      Name: [''],
      Email: ['']
    })
    this.beneficiaryform2 = this.formBuilder.group({
      Address: [''],
      Age: [''],
      Gender: [''],
      Mobilenumber: [''],
      Name: ['']

    })



  }
  createBeneficiariesData() {
    this.spinner.show()
    let Beneficiarie: any = {
      BeneficiariesObj: {
        first: {},

      }
    }
    Beneficiarie.BeneficiariesObj.first['Address'] = this.beneficiaryform.value.Address
    Beneficiarie.BeneficiariesObj.first['Age'] = this.beneficiaryform.value.Age
    Beneficiarie.BeneficiariesObj.first['Gender'] = this.beneficiaryform.value.Gender
    Beneficiarie.BeneficiariesObj.first['MobileNumber'] = this.beneficiaryform.value.Mobilenumber
    Beneficiarie.BeneficiariesObj.first['Name'] = this.beneficiaryform.value.Name
    Beneficiarie.BeneficiariesObj.first['ProfileIndex'] = 0
    const updateBeneficiaryData = new FormData();
    
    console.log(this.beneficiaryform2.status)

    let second: any = {}


    console.log(Beneficiarie)

    if (this.beneficiaryform2.status == 'VALID') {

      Beneficiarie.BeneficiariesObj.second = {}
      Beneficiarie.BeneficiariesObj.second['Address'] = this.beneficiaryform2.value.Address
      Beneficiarie.BeneficiariesObj.second['Age'] = this.beneficiaryform2.value.Age
      Beneficiarie.BeneficiariesObj.second['Gender'] = this.beneficiaryform2.value.Gender
      Beneficiarie.BeneficiariesObj.second['MobileNumber'] = this.beneficiaryform2.value.Mobilenumber
      Beneficiarie.BeneficiariesObj.second['Name'] = this.beneficiaryform2.value.Name
      Beneficiarie.BeneficiariesObj.second['ProfileIndex'] = 1
    }


    this.userService.createBeneficiaries(Beneficiarie).subscribe(Response => {
      if (Response.code == 'S001') {
        this.spinner.hide()
        alert(Response.data)
        this.viewuserDetails()
      }
      else {
        this.spinner.hide()
        alert(Response.data)
      }
    }, (error) => {
      this.spinner.hide()
      error.error.data
    })

  }
  Beneficiary2() {
    this.addBeneficiaryBtn = true

    if (this.beneficiaryform.status == 'VALID') {
      this.page = 2
    }


    // console.log(this.beneficiaryform.value)
  }
  back() {
    this.page = 1
  }


  viewuserDetails() {


    this.spinner.show()
    this.userService.viewUser().subscribe((Response) => {
      if (Response.code == "S001") {
        this.profile = Response.data.customer
        this.spinner.hide()

        if (Response.data.customer.Beneficiaries.length > 0) {
          this.Addbeneficiaryform.patchValue({ CustID: Response.data.customer.Beneficiaries[0].CustID })
          this.Addbeneficiaryform.patchValue({ Age: Response.data.customer.Beneficiaries[0].Age })
          this.Addbeneficiaryform.patchValue({ Name: Response.data.customer.Beneficiaries[0].Name })
          this.Addbeneficiaryform.patchValue({ MobileNumber: Response.data.customer.Beneficiaries[0].MobileNumber })
          this.Addbeneficiaryform.patchValue({ Address: Response.data.customer.Beneficiaries[0].Address })
          this.Addbeneficiaryform.patchValue({ Gender: Response.data.customer.Beneficiaries[0].Gender })
          this.Beneficiaries = Response.data.customer.Beneficiaries
      // for(let i=0;i<Response.data.customer.Beneficiaries.length;i++){
      //   this.profileData=Response.data.customer.Beneficiaries[i]
      // }

        if(this.Beneficiaries[0].BeneficiaryProfileImageURL!=null){
          this.imageUrl=this.Beneficiaries[0].BeneficiaryProfileImageURL
        }
        }



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
  CustID(data: any) {
    this.CustIDData = data.target.value
    console.log(this.CustIDData)
    for (let i = 0; i < this.Beneficiaries.length; i++) {

      console.log()
      if (this.CustIDData == this.Beneficiaries[i].CustID) {
        this.Addbeneficiaryform.patchValue({ CustID: this.Beneficiaries[i].CustID })
        this.Addbeneficiaryform.patchValue({ Age: this.Beneficiaries[i].Age })
        this.Addbeneficiaryform.patchValue({ Name: this.Beneficiaries[i].Name })
        this.Addbeneficiaryform.patchValue({ MobileNumber: this.Beneficiaries[i].MobileNumber })
        this.Addbeneficiaryform.patchValue({ Address: this.Beneficiaries[i].Address })
        this.Addbeneficiaryform.patchValue({ Gender: this.Beneficiaries[i].Gender })
        this.imageUrl=this.Beneficiaries[i].BeneficiaryProfileImageURL
      }

    }
  }


  updateBeneficiaryDetails() {





this.updateBeneficiaryBtn=true
        this.spinner.show()
if(this.Addbeneficiaryform.status=='INVALID'){
  this.spinner.hide()
  return;
}else{
  const updateBeneficiaryData = new FormData();
  this.Addbeneficiaryform.value.file = this.filedata
  
  if (isNaN(this.Addbeneficiaryform.value.Age) ||this.Addbeneficiaryform.value.Age < 18 || this.Addbeneficiaryform.value.Age > 120) {
    alert("Age must be grather than equal to 18 or less equal to 120");
    this.spinner.hide()
    return;
}

  updateBeneficiaryData.append('Address', this.Addbeneficiaryform.value.Address)
  updateBeneficiaryData.append('Age', this.Addbeneficiaryform.value.Age)
  updateBeneficiaryData.append('Gender', this.Addbeneficiaryform.value.Gender)

  updateBeneficiaryData.append('MobileNumber', this.Addbeneficiaryform.value.MobileNumber)
  updateBeneficiaryData.append('Name', this.Addbeneficiaryform.value.Name)
  updateBeneficiaryData.append('CustID', this.Addbeneficiaryform.value.CustID)
  updateBeneficiaryData.append('file',this.filedata)
  this.userService.updateBeneficiary(updateBeneficiaryData).subscribe((Response: any) => {
    if (Response.code == 'U001') {
      alert(Response.data)
      this.viewuserDetails()
    } else {
      this.spinner.hide()
      alert(Response.data)
    }
  }, (error: any) => {
    this.spinner.hide()
    alert(error.error.data)
  })

}
     
  }
  uploadFile(event: any) {
    let reader = new FileReader();
    let file = event.target.files[0];
    this.filedata=event.target.files[0]
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
     
      }
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();          
    }
  }


  checkValidation(data:any){

    console.log(this.Addbeneficiaryform.value.Age)
   let pattern='/^[6-9][0-9]{9}$/'
 if(this.Addbeneficiaryform.value.Age.match(pattern) &&this.Addbeneficiaryform.value.Age!=null){
  this.agebtn=true
 }else{
  this.agebtn=false
 }
  }
}

