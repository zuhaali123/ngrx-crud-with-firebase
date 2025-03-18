import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { sendMessage, updateMessage } from '../store/messages.actions';
import { Message } from '../../../models/message.model';
import { AppState } from '../store/app.state';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule,
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ]
})
export class MessageDialogComponent implements OnInit {

  messageForm!: FormGroup;
  isEditMode = false;

  constructor(
    private dialogRef: MatDialogRef<MessageDialogComponent>,
    private fb: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

    this.isEditMode = !!this.data;

    this.messageForm = this.fb.group({
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      message: [this.data?.message || '', Validators.required]
    });

  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.messageForm.valid) {
      const message: Message = {
        ...this.data,
        ...this.messageForm.value,  
        date: new Date()  
      };
  
      if (this.isEditMode) {
        this.store.dispatch(updateMessage({ message }));  
        this.dialogRef.close({ action: 'update' });
      } else {
        this.store.dispatch(sendMessage({ message })); 
        this.dialogRef.close({ action: 'add' });
      }
    }
  }
}
