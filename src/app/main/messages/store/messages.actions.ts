import { createAction, props } from '@ngrx/store';
import { Message } from '../../../models/message.model';

// Load Messages
export const loadMessages = createAction('[Messages] Load Messages');
export const loadMessagesSuccess = createAction(
  '[Messages] Load Messages Success',
  props<{ messages: Message[] }>()
);
export const loadMessagesFailure = createAction(
  '[Messages] Load Messages Failure',
  props<{ error: any }>()
);

export const sendMessage = createAction(
  '[Messages] Send Message',
  props<{ message: Message }>()
);
export const sendMessageSuccess = createAction(
  '[Messages] Send Message Success',
  props<{ message: Message }>() 
);
export const sendMessageFailure = createAction(
  '[Messages] Send Message Failure',
  props<{ error: any }>()
);

export const updateMessage = createAction(
  '[Messages] Update Message',
  props<{ message: Message }>()
);
export const updateMessageSuccess = createAction(
  '[Messages] Update Message Success',
  props<{ message: Message }>()
);
export const updateMessageFailure = createAction(
  '[Messages] Update Message Failure',
  props<{ error: any }>()
);

export const deleteMessage = createAction(
  '[Messages] Delete Message',
  props<{ id: string }>() 
);
export const deleteMessageSuccess = createAction(
  '[Messages] Delete Message Success',
  props<{ id: string }>()
);
export const deleteMessageFailure = createAction(
  '[Messages] Delete Message Failure',
  props<{ error: any }>()
);