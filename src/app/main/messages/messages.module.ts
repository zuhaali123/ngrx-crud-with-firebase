import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { MessagesRoutingModule } from './messages-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule, MessagesRoutingModule, MatFormFieldModule,
        MatTableModule,
        MatSortModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatIconModule,
  ]
})
export class MessagesModule { }
