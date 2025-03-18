import { createReducer, on } from '@ngrx/store';
import { loadMessages, loadMessagesFailure, loadMessagesSuccess, sendMessage, sendMessageFailure, sendMessageSuccess } from './messages.actions';
import { Message } from '../../../models/message.model';

export interface MessageState {
  messages: Message[]; 
  loading: boolean;
  error: string | null;
}

export const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
};

export const messageReducer = createReducer(
  initialState,

  on(loadMessages, (state) => ({
    ...state,
    loading: true, 
    error: null
  })),

  on(loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages: messages ?? [], 
    loading: false, 
  })),

  on(loadMessagesFailure, (state, { error }) => ({
    ...state,
    loading: false, 
    error,
  })),

  on(sendMessage, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(sendMessageSuccess, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
    loading: false,
    error: null,
  })),

  on(sendMessageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export interface AppState {
  messages: MessageState;
}