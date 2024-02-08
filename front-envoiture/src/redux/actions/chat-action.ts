import { Dispatch } from '@reduxjs/toolkit';
import { TChatParticipant } from 'src/types/chat';
import {
  getContactsSuccess,
  getConversationSuccess,
  getConversationsFailure,
  getConversationsStart,
  getConversationsSuccess,
  markAsSeenSuccess,
  sendMessageSuccess,
} from '../reducer/chat-reducer';

export function getContacts() {
  return async (dispatch: Dispatch) => {
    try {
      const contacts = {};
      dispatch(getContactsSuccess(contacts));
    } catch (error) {
      console.error(error);
    }
  };
}

export function getConversations() {
  return async (dispatch: Dispatch) => {
    dispatch(getConversationsStart());
    try {
      const conversations = {};
      dispatch(getConversationsSuccess(conversations));
    } catch (error) {
      dispatch(getConversationsFailure(error));
    }
  };
}

export function getConversation(conversationId: string) {
  return async (dispatch: Dispatch) => {
    try {
      const conversation = {};
      dispatch(getConversationSuccess(conversation));
    } catch (error) {
      console.error(error);
    }
  };
}

export function sendMessage(conversationId: string, body: string) {
  return async (dispatch: Dispatch) => {
    try {
      const data = {};
      dispatch(sendMessageSuccess(data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function createNewConversation(recipients: TChatParticipant[], body: string) {
  return async (dispatch: Dispatch) => {
    try {
      const response = {};
      dispatch(getConversationSuccess(response));
    } catch (error) {
      console.error(error);
    }
  };
}

export function markAsSeen(conversationId: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(markAsSeenSuccess({ conversationId }));
    } catch (error) {
      console.error(error);
    }
  };
}
