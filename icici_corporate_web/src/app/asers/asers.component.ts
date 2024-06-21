import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';
import * as _constants from '../constants';

import * as ApexCharts from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexCharts.ApexAxisChartSeries;
  chart: ApexCharts.ApexChart;
  xaxis: ApexCharts.ApexXAxis;
  yaxis: ApexCharts.ApexYAxis,
  dataLabels: ApexCharts.ApexDataLabels;
  grid: ApexCharts.ApexGrid;
  stroke: ApexCharts.ApexStroke;
  title: ApexCharts.ApexTitleSubtitle;
};
@Component({
  selector: 'app-asers',
  templateUrl: './asers.component.html',
  styleUrls: ['./asers.component.css']
})
export class AsersComponent implements OnInit {
  @ViewChild("chart") chart: ApexCharts.ChartComponent | undefined;

  [x: string]: any;

  constructor(private userservice: UsersService, private datePipe: DatePipe, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }
  Devices: any = [];
  DashboardData: _constants.aserDashboardData[] = [];
  isVitalTypeSelected: boolean = false;
  chartOptions: any = {};
  selectedDevice: any = {};
  isNotAChart: boolean = false;
  Image: string | undefined = '';
  vitalType: string = '';
  EcgData: any
  customerDetails: any = [];
  customerDeviceDetails: any = []

  selectedButton: any = 0
  ngOnInit(): void {
    this.dropdowndetails(),
      this.viewUserDetails()
  }




  benificiaryDetails(custID: any, buttonIndex: any) {
    this.selectedButton = buttonIndex;

    const newcustomerdetails = this.Devices.filter((user: any) => {

      return user.CustomerDetails.CustID === custID
    })

    this.customerDeviceDetails = newcustomerdetails

    this.DashboardData = []
  }
  dropdowndetails() {
    this.userservice.getdevicesandname().subscribe((response) => {
      switch (response.code) {
        case 'S001':
          this.Devices = response.data;
          break;
        case 'ND01':
          this.Devices = [];
          break;
        default:
          alert(response.data);
      };

      // if (this.Devices.length > 0) {
      //   this.onDeviceChange(this.Devices[0].UserDetails.CustomerID, this.Devices[0].DeviceDetails.IMEINumber)
      // };
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })

  }
  onDeviceChange(customer_id: string, device_id: string) {
    this.DashboardData = [];
    this.isVitalTypeSelected = false;
    this.isNotAChart = false
    this.userservice.getAserCustomerDashBoardData({ CustomerID: customer_id, DeviceID: device_id }).subscribe(dashBoardDataResponse => {
      if (dashBoardDataResponse.code === "S001") {
        for (let key in dashBoardDataResponse.data) {
          const obj: any = {};
          obj["tittle"] = key;
          if (dashBoardDataResponse.data[key] && Object.keys(dashBoardDataResponse.data[key]).length > 0 && key !== 'Glucose' && key !== 'Ecgdata') {
            if (dashBoardDataResponse.data[key].Data) {
              obj["value"] = dashBoardDataResponse.data[key].Data[key] ? parseFloat(dashBoardDataResponse.data[key].Data[key]).toFixed(2) : '---';
            }
          };
          if (dashBoardDataResponse.data[key]) {
            obj['time'] = dashBoardDataResponse.data[key].CreatedDate;
            obj['customer_id'] = dashBoardDataResponse.data[key].CustomerID;
            obj['device_id'] = dashBoardDataResponse.data[key].DeviceID;
            obj['image'] = dashBoardDataResponse.data[key].image;
          }
          if (key === 'Ecgdata') {
            obj['data'] = dashBoardDataResponse.data[key].Data
            obj['pdf'] = dashBoardDataResponse.data[key].Data['PDFFile']
          }
          this.DashboardData.push(obj)
        }
      } else {
        alert(dashBoardDataResponse.data);
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  }
  onMonthlyOrCustomSelect(data: any, timeInterval: string) {
    this.isVitalTypeSelected = true;
    const paramsForWatchData = {
      ID: data.device_id,
      Type: data.tittle,
      Interval: timeInterval ? timeInterval : "Hour",
      CustomerID: data.customer_id
    }
    this.userservice.getAserWatchMonthlyData(paramsForWatchData).subscribe((response) => {
      this.chartDataReplecation(paramsForWatchData.Type, response.data);
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  };

  onSelectDataType(data: any, timeInterval: string) {
    this.vitalType = data.tittle
    this.isVitalTypeSelected = true;
    this.isNotAChart = false;
    if (data.tittle === "Ecgdata") {
      this.isVitalTypeSelected = false;
      this.isNotAChart = true;
      this.handleNotAChartClick(data.tittle);
    }
    this.selectedDevice = data;
    const paramsForWatchData: _constants.getAserWatchDataParams = {
      ID: data.device_id,
      Type: data.tittle,
      Interval: timeInterval ? timeInterval : "Hour",
      CustomerID: data.customer_id
    };
    this.userservice.getAserWatchData(paramsForWatchData).subscribe((aserData: any) => {
      if (aserData.code === "S001") {
        let graphValues: number[] = [];
        let xAxisValues = [];
        let seriesValues: Array<{ name: string, data: number[] }> = []
        if (aserData.data.length > 0) {
          if (paramsForWatchData.Type !== 'BloodPressure' && paramsForWatchData.Type !== 'Ecgdata') {
            graphValues = aserData.data.map((graphValuesObj: any) => graphValuesObj[paramsForWatchData.Type] ? graphValuesObj[data.tittle] : graphValuesObj.Data[data.tittle]);
            seriesValues.push({ name: paramsForWatchData.Type, data: graphValues });
          }
          if (paramsForWatchData.Type === 'BloodPressure') {
            let hypertension: number[] = [];
            let hypotension: number[] = [];
            aserData.data.map((dataObj: any) => {
              const bp = dataObj.Data[paramsForWatchData.Type];
              const splittedValues = bp.split('/');
              hypertension.push(splittedValues[0]);
              hypotension.push(splittedValues[1]);
            });
            seriesValues.push({ name: 'Hypertension', data: hypertension });
            seriesValues.push({ name: 'Hypotension', data: hypotension })
          }
          if (paramsForWatchData.Type === 'Ecgdata') {
            this.EcgData = aserData.data;
          }
          xAxisValues = aserData.data.map((xAxisObj: any) => xAxisObj['formattedDate']);

        };
        this.chartDetails(xAxisValues, paramsForWatchData.Type, seriesValues)
      }
      else {
        this.isVitalTypeSelected = false;
      }
    }, (err) => {
      this.isVitalTypeSelected = false;
      this.spinner.hide();
      alert(err.error.message);
    })


  }

  chartDataReplecation(type: string, data: any) {
    let graphValues = [];
    let xAxisValues = [];
    let seriesValues: Array<{ name: string, data: number[] }> = []
    if (data.length > 0) {
      if (type !== 'BloodPressure') {
        graphValues = data.map((data: { [x: string]: any; }) => data[type] ? data[type] : data['averageValue']);
        seriesValues.push({ name: type, data: graphValues });
      }
      if (type === 'BloodPressure') {
        let hypertension: number[] = [];
        let hypotension: number[] = [];
        data.map((dataObj: any) => {
          const bp = dataObj[type];
          const splittedValues = bp.split('/');
          hypertension.push(splittedValues[0]);
          hypotension.push(splittedValues[1]);
        });
        seriesValues.push({ name: 'Hypertension', data: hypertension });
        seriesValues.push({ name: 'Hypotension', data: hypotension })
      };
      xAxisValues = data.map((data: { [x: string]: any; }) => data['_id']);
      this.chartDetails(xAxisValues, type, seriesValues)
    };
  };
  chartDetails(xAxisValues: any[], intervalType: string, values: { name: string, data: number[] }[]) {
    intervalType = intervalType ? intervalType : "";
    this.chartOptions = {
      series: values,
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: intervalType,
        align: "center"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: xAxisValues
      }
    };

  };
  onTimeChangeClick(timePeriod: string) {
    switch (timePeriod) {
      case 'Hour':
        this.onSelectDataType(this.selectedDevice, timePeriod)
        break;
      case 'Day':
        this.onSelectDataType(this.selectedDevice, timePeriod)
        break;
      case 'Week':
        this.onSelectDataType(this.selectedDevice, timePeriod)
        break;
      case 'Month':
        this.onMonthlyOrCustomSelect(this.selectedDevice, timePeriod)
        break;
    }
  }

  handleNotAChartClick(type: string) {
    const imageRef: _constants.aserDashboardData | undefined = this.DashboardData.find(obj => obj['tittle'] === type);
    this.Image = imageRef ? imageRef['pdf'] : '';
  }
  onDownloadClick(image: string) {
    image != '' ? window.open(image) : window.open(this.Image);
  }
  onTimeChangeForEcgClick(timeInterval: string) {
    this.onSelectDataType(this.selectedDevice, timeInterval)

  }


  viewUserDetails() {
    this.isVitalTypeSelected = true;

    this.userservice.viewUser().subscribe((response) => {
      this.customerDetails = response.data
      this.benificiaryDetails(this.customerDetails.customer.CustRecID, 0)


    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })
  };
}


