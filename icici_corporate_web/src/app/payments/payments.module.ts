import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentManagmentServicesComponent } from './payment-managment-services/payment-managment-services.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaymentManagmentServicesComponent,
    TransactionHistoryComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaymentsModule { }
