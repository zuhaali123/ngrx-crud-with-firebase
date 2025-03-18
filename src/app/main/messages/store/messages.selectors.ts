import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageState } from '../store/messages.reducer';

export const selectMessagesState = createFeatureSelector<MessageState>('messages');

export const selectMessages = createSelector(
  selectMessagesState,
  (state) => state.messages
);