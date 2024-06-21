<form name="partnerProfileForm" role="form" novalidate show-validation>


    <div class="panel" style="padding: 0px;">




        <!-- Business Operation Details -->
        <div class="row">
            <div class="col-md-12 ph10 mb5">
                <h5 style="padding: 0px;margin: 0px;">Business Operation Details</h5>
            </div>
        </div>
        <div class="row allcp-form">

            <form name="BussinessDaysForm" role="form" novalidate show-validation>

            </form>

        </div>
        <!-- Business Operation Details -->

        <!-- Point Of Contact Details -->
        <div class="row allcp-form">
            <div class="col-md-12 ph10 mb5">
                <h5 style="padding: 0px;margin: 0px;">Point Of Contact Details</h5>
            </div>
        </div>

        <div class="row allcp-form">
            <div class="col-md-12 ph10 mb5">

                <div class="col-md-3 ph10 mb5">
                    <h6 style="color: #9b9ead">Contact Person Name</h6>
                    <input class="form-control" type="text" ng-model="PartnerProfile.PointOfContact.ContactName"
                        name="ContactName" id="ContactName" placeholder="Contact Person Name" required>
                    <span for="ContactName" class="error"
                        ng-show="partnerProfileForm.ContactName.$invalid && showErrors">
                        Contact Person Name is Required
                    </span>
                </div>
                <div class="col-md-3 ph10 mb5">
                    <h6 style="color: #9b9ead">Contact No</h6>
                    <input class="form-control" type="text" ng-model="PartnerProfile.PointOfContact.ContactNo"
                        name="ContactNo" id="ContactNo" placeholder="Contact No" required>
                    <span for="ContactNo" class="error" ng-show="partnerProfileForm.ContactNo.$invalid && showErrors">
                        Contact Number is Required
                    </span>
                </div>
                <div class="col-md-3 ph10 mb5">
                    <h6 style="color: #9b9ead">Alternative Contact No</h6>
                    <input class="form-control" type="text" ng-model="PartnerProfile.PointOfContact.AlternativeNo"
                        name="AlternativeNo" required id="AlternativeNo" placeholder="Alternative Contact No">
                    <!-- <span for="AlternativeNo" class="error"
                    ng-show="partnerProfileForm.AlternativeNo.$invalid && showErrors">
                    Contact Person Name is Required
                </span> -->
                </div>
                <div class="col-md-3 ph10 mb5">
                    <h6 style="color: #9b9ead">Street Address</h6>
                    <textarea class="form-control" type="text"
                        ng-model="PartnerProfile.PointOfContact.Address.StreetAddress" name="StreetAddress" required
                        id="StreetAddress" placeholder="Address Details" style="height: 36px;"></textarea>
                    <span for="StreetAddress" class="error"
                        ng-show="partnerProfileForm.StreetAddress.$invalid && showErrors">
                        Address is Required
                    </span>
                </div>
            </div>
            <div class="col-md-12 ph10 mb5">

                <div class="col-md-3 ph10 mb5">
                    <h6 style="color: #9b9ead">City</h6>
                    <input class="form-control" type="text" ng-model="PartnerProfile.PointOfContact.Address.City"
                        name="City" id="City" placeholder="City" required>
                    <span for="City" class="error" ng-show="partnerProfileForm.City.$invalid && showErrors">
                        City is Required
                    </span>
                </div>

                <div class="col-md-3 ph10 mb5">
                    <h6 style="color: #9b9ead">State</h6>
                    <input class="form-control" type="text" ng-model="PartnerProfile.PointOfContact.Address.State"
                        name="State" id="State" placeholder="State" required>
                    <span for="State" class="error" ng-show="partnerProfileForm.State.$invalid && showErrors">State is
                        Required
                    </span>
                </div>
                <div class="col-md-3 ph10 mb5">
                    <h6 style="color: #9b9ead">Pin Code</h6>
                    <input class="form-control" type="text" ng-model="PartnerProfile.PointOfContact.Address.PinCode"
                        name="PinCode" id="PinCode" placeholder="Pin Code" required>
                    <span for="PinCode" class="error"
                        ng-show="partnerProfileForm.PinCode.$invalid && showErrors">PinCode is Required
                    </span>
                </div>
            </div>
        </div>
        <!-- Point Of Contact Details -->


        <div class="row allcp-form">
            <div class="col-md-12 ph10 mb5">
                <h5 style="padding: 0px;margin: 0px;">Services Details</h5>
            </div>
        </div>
        <div class="row allcp-form">
            <!-- <div class="col-md-3 ph10 mb5">
                <h6 style="color: #9b9ead;">Service Catagory</h6>
                <label for="Type" class="field select">
                    <select ng-model="PartnerProfile.VendorType" name="partnerType" id="VendorType">
                        <option selected value="">Select City</option>
                        <option ng-repeat="city in ServiceAreaCityName" value="{{city.CityID}}">
                            {{city.CityName}}</option>
                    </select>
                    <i class="arrow double"></i>
                </label>
            </div> -->
            <div class="col-md-3 ph10 mb5">
                <h6 style="color: #9b9ead;">Service Catagory</h6>
                <label for="Type" class="field select">
                    <select ng-model="PartnerProfile.CategoryID" name="partnerType" id="VendorType"
                        ng-change="ViewCategoriesDetails()">
                        <option selected value=""> Select Category</option>
                        <option ng-repeat="categorie in Categories" value="{{categorie.CategoryID}}">
                            {{categorie.AliasName}}</option>
                    </select>
                    <i class="arrow double"></i>
                </label>
            </div>
            <div class="col-md-3 ph10 mb5">
                <h6 style="color: #9b9ead;">Service Sub Catagory</h6>
                <label for="Type" class="field select">
                    <select ng-model="PartnerProfile.VendorType" name="partnerType" id="VendorType">
                        <option selected value="">Select Sub Category</option>
                        <option ng-repeat="subcategorie in SubCategories" value="{{subcategorie.SubCategoryID}}">
                            {{subcategorie.AliasName}}</option>
                    </select>
                    <i class="arrow double"></i>
                </label>
            </div>
            <div class="col-md-3 ph10 mb5">
                <h6 style="color: #9b9ead;">Service Sub Sub Catagory</h6>
                <label for="Type" class="field select">
                    <select ng-model="PartnerProfile.VendorType" name="partnerType" id="VendorType">
                        <option selected value="">Internal Vendor</option>
                        <option ng-repeat="city in ServiceAreaCityName" value="{{city.CityID}}">
                            External Vendor</option>
                    </select>
                    <i class="arrow double"></i>
                </label>
            </div>
        </div>


        <div class="row allcp-form" style="padding-top: 10px;">
            <div class="col-md-3 ph10 mb5">
                <h6 style="color: #9b9ead;">Vendor Tariff</h6>
                <label for="Type" class="field select">
                    <select ng-model="PartnerProfile.VendorType" name="partnerType" id="VendorType">
                        <option selected value="">Hourly Charge</option>
                        <option selected value="">Daily Charge</option>
                        <option selected value="">Weekly Charge</option>
                        <option selected value="">Montly Charge</option>
                        <option selected value="">12 Hours Charge</option>
                        <option selected value="">24/7 Charge</option>
                    </select>
                    <i class="arrow double"></i>
                </label>
            </div>
            <div class="col-md-3 ph10 mb5">
                <h6 style="color: #9b9ead;">Vendor Charge</h6>
                <input class="form-control" type="text" ng-model="PartnerProfile.startDate" name="startDate"
                    id="STdatepicker" placeholder="Vendor Charge Depend on Tariff" required>

            </div>
            <div class="col-md-3 ph10 mb5">
                <h6 style="color: #9b9ead;">Anvayaa Referal Fee</h6>
                <input class="form-control" type="text" ng-model="PartnerProfile.startDate" name="startDate"
                    id="STdatepicker" placeholder="Enter % Agreed By Vendor" required>

            </div>
        </div>

        <div class="row" style="padding-top: 5px;">
            <div class="col-md-12 ph10 mb5">
                <h5 style="margin: 0px;padding: 0px;">MOU Details</h5>
            </div>
        </div>
        <div class="row allcp-form">
            <div class="col-md-3 ph10 mb5">
                <h6 style="color: #9b9ead;">Start Date</h6>
                <div class="input-group date" id="MOUStartDatePicker">
                    <input class="form-control" ng-model="PartnerProfile.MoUStartDate" name="startDate" required
                        id="STdatepicker" placeholder="MOU Start Date" style="height: 42px;">
                    <span class="input-group-addon"><img src="images/calendar_1x.png" /></span>
                </div>
                <span for="startDate" class="error" ng-show="FilterForm.startDate.$invalid && showErrors">MOU Start Date
                    is Required
                </span>
            </div>
            <div class="col-md-3 ph10 mb5">
                <h6 style="color: #9b9ead;">End Date</h6>
                <div class="input-group date" id="MOUEndDatePicker">
                    <input class="form-control" ng-model="PartnerProfile.MoUExpiryDate" name="endDate" required
                        id="EDdatepicker" placeholder="MOU End Sate" style="height: 42px;">
                    <span class="input-group-addon"><img src="images/calendar_1x.png" /></span>
                </div>
                <span for="endDate" class="error" ng-show="FilterForm.endDate.$invalid && showErrors">MOU
                    End Date is Required
                </span>
            </div>
            <div class="col-md-3 ph10 mb5">
                <h6 style="color: #9b9ead;">Period Of Service</h6>
                <input class="form-control" type="text" ng-model="PartnerProfile.startDate" name="startDate"
                    id="STdatepicker" placeholder="Enter Peroid Of Service" required>

            </div>
        </div>


    </div>
</form>

<!-- 


<div class="bs-example">
                            <div class="accordion" id="accordionExample">
                                <div class="card">
                                    <div class="card-header" id="headingOne" style="background-color: #67d3e0;">
                                        <h2 class="mb-0">
                                            <button type="button" class="btn btn-link" data-toggle="collapse"
                                                data-target="#collapseOne"
                                                style="color: black; font-size: 15px;font-weight: bold;">
                                                Business Information
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne"
                                        data-parent="#accordionExample">
                                        <div class="card-body">

                                            <div class="row allcp-form">

                                                <div class="col-md-12 ph10 mb5">
                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead;">Vendor Type</h6>
                                                        <label for="PartnerType" class="field select">
                                                            <select ng-model="PartnerProfile.PartnerType"
                                                                name="PartnerType" id="PartnerType">
                                                                <option selected value="">Select Vendor Type</option>
                                                                <option selected value="Internal_Partner">Internal
                                                                    Vendor</option>
                                                                <option selected value="External_Partner">External
                                                                    Vendor</option>
                                                            </select>
                                                            <i class="arrow double"></i>
                                                        </label>
                                                        <span for="PartnerType" class="error"
                                                            ng-show="partnerProfileForm.PartnerType.$invalid && showErrors">
                                                            Vendor Type is Required
                                                        </span>
                                                    </div>
                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead">Business Name</h6>
                                                        <input class=" form-control" type="text"
                                                            ng-model="PartnerProfile.BusinessNature"
                                                            name="BusinessNature" id="BusinessNature"
                                                            placeholder="Business Name" required>
                                                        <span for="BusinessNature" class="error"
                                                            ng-show="partnerProfileForm.BusinessNature.$invalid && showErrors">
                                                            Business Name is Required
                                                        </span>

                                                    </div>

                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead">Contact Person Name</h6>
                                                        <input class="form-control" type="text"
                                                            ng-model="PartnerProfile.PartnerName" name="PartnerName"
                                                            id="PartnerName" placeholder="Contact Person Name"
                                                            data-ng-pattern='/^[A-Za-z\s]+$/' required>
                                                        <span for="PartnerName" class="error"
                                                            ng-show="partnerProfileForm.PartnerName.$invalid && showErrors">
                                                            Contact Person Name is Required
                                                        </span>
                                                        <span for="PartnerName" class="error"
                                                            ng-if="partnerProfileForm.PartnerName.$error.pattern">
                                                            Name must be alphabets only</span>
                                                    </div>
                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead">Email Id</h6>
                                                        <input class="form-control" type="text"
                                                            ng-model="PartnerProfile.BusinessAddress.EmailID"
                                                            name="EmailID" id="EmailID" placeholder="Email Id"
                                                            data-ng-pattern="/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/" required>
                                                        <span for="EmailID" class="error"
                                                            ng-show="partnerProfileForm.EmailID.$invalid && showErrors">Email
                                                            is Required
                                                        </span>
                                                        <span for="EmailID" class="error"
                                                            ng-if="partnerProfileForm.EmailID.$error.pattern">
                                                            Enter Valid Email Id.</span>
                                                    </div>

                                                </div>
                                                <div class="col-md-12 ph10 mb5">

                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead">Bussiness Address</h6>
                                                        <textarea class="form-control"
                                                            ng-model="PartnerProfile.BusinessAddress.StreetAddress"
                                                            name="StreetAddress" id="StreetAddress"
                                                            placeholder="Business Address" style="height: 35px;"
                                                            required>
                                                    </textarea>
                                                        <span for="StreetAddress" class="error"
                                                            ng-show="partnerProfileForm.StreetAddress.$invalid && showErrors">
                                                            Bussiness Address is Required
                                                        </span>
                                                    </div>

                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead">City</h6>
                                                        <input class="form-control" type="text"
                                                            ng-model="PartnerProfile.BusinessAddress.City" name="City"
                                                            required id="City" placeholder="City">
                                                        <span for="City" class="error"
                                                            ng-show="partnerProfileForm.City.$invalid && showErrors">
                                                            City is Required
                                                        </span>
                                                    </div>

                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead">State</h6>
                                                        <input class="form-control" type="text"
                                                            ng-model="PartnerProfile.State" name="State" required
                                                            id="State" placeholder="State">
                                                        <span for="State" class="error"
                                                            ng-show="partnerProfileForm.State.$invalid && showErrors">State
                                                            is Required
                                                        </span>
                                                    </div>
                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead">Pin Code</h6>
                                                        <input class="form-control" type="text"
                                                            ng-model="PartnerProfile.BusinessAddress.PinCode"
                                                            name="PinCode" id="PinCode" placeholder="Pin Code" required>
                                                        <span for="PinCode" class="error"
                                                            ng-show="partnerProfileForm.PinCode.$invalid && showErrors">PinCode
                                                            is Required
                                                        </span>
                                                    </div>


                                                </div>
                                                <div class="col-md-12 ph10 mb5">
                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead;">GST Details</h6>
                                                        <input class="form-control" type="text"
                                                            ng-model="PartnerProfile.GSTNumber" name="GSTNumber"
                                                            required id="GSTNumber" placeholder="GST No"
                                                            data-ng-pattern="/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/">
                                                        <span for="GSTNumber" class="error"
                                                            ng-if="partnerProfileForm.GSTNumber.$error.pattern">
                                                            Enter Valid GST Number.</span>
                                                    </div>
                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead;">Company Type</h6>
                                                        <label for="CompanyType" class="field select">
                                                            <select
                                                                ng-model="PartnerProfile.BusinessOperationalDetails.Type"
                                                                name="CompanyType" id="CompanyType"
                                                                style="height: 36px;" required>
                                                                <option selected value="">Select Company Type</option>
                                                                <option value="Pvt_LTD">Pvt_LTD</option>
                                                                <option value="Partnership">Partnership</option>
                                                                <option value="Propritorship">Propritorship</option>

                                                            </select>
                                                            <i class="arrow double" style="top: 5px"></i>
                                                        </label>
                                                        <span for="CompanyType" class="error"
                                                            ng-show="partnerProfileForm.CompanyType.$invalid && showErrors">
                                                            Company Type is Required
                                                        </span>
                                                    </div>
                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead;">Bussiness Start Date</h6>
                                                        <div class="input-group date" id="BussinessStartDatePicker">
                                                            <input class="form-control" name="BussinessStartDate"
                                                                id="Bussdatepicker" placeholder="Bussiness Start Date "
                                                                ng-model="PartnerProfile.BussinessStartDate" required
                                                                style="height: 42px;">
                                                            <span class="input-group-addon"><img
                                                                    src="images/calendar_1x.png" /></span>
                                                        </div>
                                                        <span for="BussinessStartDate" class="error"
                                                            ng-show="FilterForm.BussinessStartDate.$invalid && showErrors">MOU
                                                            End Date is Required
                                                        </span>
                                                    </div>
                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead; padding-left: 15px;">Experience </h6>
                                                        <input class="form-control" type="text"
                                                            ng-model="PartnerProfile.BusinessOperationalDetails.Experience"
                                                            name="Experience" id="Experience"
                                                            placeholder="Year Of Experience"
                                                            style="margin: 10px; width: 90%;" required>
                                                        <span for="Experience" class="error"
                                                            ng-show="partnerProfileForm.Experience.$invalid && showErrors">
                                                            Experience is Required
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="col-md-12 ph10 mb5">
                                                    <button class="btn btn-primary pull-right" type="button"
                                                        style="margin-top: 25px;"
                                                        ng-click="createBusinessInformation(partnerProfileForm)">SAVE</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>



                                <div class="card">
                                    <div class="card-header" id="headingTwo" style="background-color: #67d3e0;">
                                        <h2 class="mb-0">
                                            <button type="button" class="btn btn-link" data-toggle="collapse"
                                                data-target="#collapseTwo"
                                                style="color: black; font-size: 15px;font-weight: bold;">
                                                Business Operation Details
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo"
                                        data-parent="#accordionExample">
                                        <div class="card-body">
                                            <div class="row allcp-form">

                                                <div class="col-md-12 ph10 mb5">

                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead;padding-left: 15px;">Day</h6>
                                                        <input class="form-control" type="text"
                                                            ng-model="BussinessDaysObj.Day" name="Day" id="Day"
                                                            placeholder="Enter Day" required>
                                                        <span for="Day" class="error"
                                                            ng-show="BussinessDaysForm.Experience.$invalid && BusinessDaysErrors">
                                                            Experience is Required
                                                        </span>
                                                    </div>
                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead;padding-left: 15px;">Start Time</h6>
                                                        <input class="form-control" type="text"
                                                            ng-model="PartnerProfile.StartTime" name="StartTime"
                                                            id="StartTime" placeholder="Business Days" required>
                                                        <span for="StartTime" class="error"
                                                            ng-show="BussinessDaysForm.StartTime.$invalid && BusinessDaysErrors">
                                                            Experience is Required
                                                        </span>
                                                    </div>
                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead;padding-left: 15px;">End Time</h6>
                                                        <input class="form-control" type="text"
                                                            ng-model="PartnerProfile.EndTime" name="EndTime"
                                                            id="EndTime" placeholder="Business Days" required>
                                                        <span for="EndTime" class="error"
                                                            ng-show="BussinessDaysForm.EndTime.$invalid && BusinessDaysErrors">
                                                            Experience is Required
                                                        </span>
                                                    </div>
                                                    <div class="col-md-3 ph10 mb5">
                                                        <h6 style="color: #9b9ead;padding-left: 15px;">End Time</h6>
                                                        <input class="form-control" type="text"
                                                            ng-model="PartnerProfile.EndTime" name="EndTime"
                                                            id="EndTime" placeholder="Business Days" required>
                                                        <span for="EndTime" class="error"
                                                            ng-show="BussinessDaysForm.EndTime.$invalid && BusinessDaysErrors">
                                                            Experience is Required
                                                        </span>
                                                    </div>


                                                </div>
                                                <div class="col-md-12 ph10 mb5">

                                                    <div class="col-md-1 ph10 mb5">
                                                        <h6 style="color: #9b9ead;"></h6>
                                                        <button class="btn btn-primary" type="button"
                                                            style="margin-top: 25px;"
                                                            ng-click=" AddBusinessDays(BussinessDaysForm)">ADD</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>


 -->


