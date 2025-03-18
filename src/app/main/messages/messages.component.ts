import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { Observable } from 'rxjs';
import { deleteMessage, loadMessages, sendMessage, updateMessage } from './store/messages.actions';
import { Store } from '@ngrx/store';
import { AppState } from './store/messages.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-messages',
  standalone: false,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  providers: [Store],
})

export class MessagesComponent {

  messages$: Observable<any[]>;
  loading$: Observable<boolean>;

  constructor(private dialog: MatDialog, private store: Store<AppState>, private snackBar: MatSnackBar) {

    this.messages$ = this.store.select(state => state.messages.messages);
    this.loading$ = this.store.select(state => state.messages.loading);
  }

  ngOnInit() {
    this.store.dispatch(loadMessages());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.action === 'add') {
        this.showSnackbar('Message added successfully!', 'success');
      }
    });
  }

  editMessage(message: any) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: message,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.action === 'update') {
        this.showSnackbar('Message updated successfully!', 'success');
      }
    });
  }

  deleteMessage(messageId: string) {
    this.store.dispatch(deleteMessage({ id: messageId }));
    this.showSnackbar('Message deleted successfully!', 'success');
  }

  showSnackbar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}