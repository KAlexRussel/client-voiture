import keyBy from 'lodash/keyBy';
import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { TChatState, TChatParticipant } from 'src/types/chat';

const initialState: TChatState = {
  contacts: [],
  recipients: [],
  currentConversationId: null,
  conversations: { byId: {}, allIds: [] },
  conversationsStatus: {
    loading: false,
    empty: false,
    error: null,
  },
};

const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // GET CONTACT
    getContactsSuccess(state, action) {
      state.contacts = action.payload;
    },

    // GET CONVERSATIONS
    getConversationsStart(state) {
      state.conversationsStatus.loading = true;
      state.conversationsStatus.empty = false;
      state.conversationsStatus.error = null;
    },
    // GET CONVERSATIONS FAILURE
    getConversationsFailure(state, action) {
      state.conversationsStatus.loading = false;
      state.conversationsStatus.empty = false;
      state.conversationsStatus.error = action.payload;
    },
    // GET CONVERSATIONS SUCCESS
    getConversationsSuccess(state, action) {
      const conversations = action.payload;

      state.conversationsStatus.loading = false;
      state.conversationsStatus.empty = !conversations.length;
      state.conversationsStatus.error = null;

      state.conversations.byId = keyBy(conversations, 'id');
      state.conversations.allIds = Object.keys(state.conversations.byId);
    },
    // GET CONVERSATION
    getConversationSuccess(state, action) {
      const conversation = action.payload;

      if (conversation) {
        state.recipients = [];
        state.currentConversationId = conversation.id;
        state.conversations.byId[conversation.id] = conversation;
        if (!state.conversations.allIds.includes(conversation.id)) {
          state.conversations.allIds.push(conversation.id);
        }
      } else {
        state.currentConversationId = null;
      }
    },
    // ON SEND MESSAGE
    sendMessageSuccess(state, action) {
      const { conversationId, message } = action.payload;

      if (conversationId) {
        state.conversations.byId[conversationId].messages.push(message);
      }
    },
    // MARK THE CONVERSATION AS SEEN
    markAsSeenSuccess(state, action) {
      const { conversationId } = action.payload;
      const conversation = state.conversations.byId[conversationId];

      if (conversation) {
        conversation.unreadCount = 0;
      }
    },
    // RESET ACTIVE CONVERSATION
    resetActiveConversation(state) {
      state.currentConversationId = null;
    },

    // ADD RECIPIENTS WHEN CREATE NEW CONVERSATION
    addRecipients(state, action) {
      state.recipients = action.payload;
    },
  },
});

// Reducer
export default chat.reducer;

// Actions
export const {
  addRecipients,
  resetActiveConversation,
  markAsSeenSuccess,
  sendMessageSuccess,
  getConversationSuccess,
  getConversationsSuccess,
  getConversationsFailure,
  getConversationsStart,
  getContactsSuccess,
} = chat.actions;
