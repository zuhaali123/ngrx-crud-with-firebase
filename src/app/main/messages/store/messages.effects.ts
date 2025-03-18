import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { loadMessages, loadMessagesSuccess, loadMessagesFailure, sendMessageSuccess, sendMessageFailure, sendMessage, updateMessageSuccess, updateMessageFailure, deleteMessageSuccess, deleteMessageFailure, updateMessage, deleteMessage } from './messages.actions';
import { MessageService } from '../../../services/message.service';

@Injectable()
export class MessagesEffects {
  constructor(private actions$: Actions, private messageService: MessageService) {}
    loadMessages$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadMessages),
        mergeMap(() =>
          this.messageService.getMessages().pipe(
            map((messages) => loadMessagesSuccess({ messages })),
            catchError((error) => {
              console.error('Error loading messages:', error);
              return of(loadMessagesFailure({ error }));
            })
          )
        )
      )
    );

    sendMessage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(sendMessage),
        exhaustMap(({ message }) =>
          this.messageService.sendMessage(message).pipe(
            map(() => sendMessageSuccess({ message })), 
            catchError((error) => {
              console.error('Error sending message:', error);
              return of(sendMessageFailure({ error }));
            })
          )
        )
      )
    );
  
    updateMessage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updateMessage),
        exhaustMap(({ message }) =>
          this.messageService.updateMessage(message).pipe(
            map(() => updateMessageSuccess({ message })),
            catchError((error) => {
              console.error('Error updating message:', error);
              return of(updateMessageFailure({ error }));
            })
          )
        )
      )
    );
  
    deleteMessage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(deleteMessage),
        exhaustMap(({ id }) =>
          this.messageService.deleteMessage(id).pipe(
            map(() => deleteMessageSuccess({ id })),
            catchError((error) => {
              console.error('Error deleting message:', error);
              return of(deleteMessageFailure({ error }));
            })
          )
        )
      )
  );
}