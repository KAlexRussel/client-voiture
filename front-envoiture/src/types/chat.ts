import { IErrorType } from './error';

// ----------------------------------------------------------------------

export type TChatAttachment = {
  name: string;
  size: number;
  type: string;
  path: string;
  preview: string;
  createdAt: Date;
  modifiedAt: Date;
};

export type TChatMessage = {
  id: string;
  body: string;
  createdAt: Date;
  senderId: string;
  // contentType: 'image' | 'text';
  // attachments: TChatAttachment[];
};

export type TChatParticipant = {
  id: string;
  userId: number,
  name: string;
  email: string;
  age: string;
  address: string;
  imageName: string;
  phoneNumber: string;
  lastActivity: Date | string | number;
  status: 'online' | 'offline' | 'alway' | 'busy';
};

export type TChatConversation = {
  id: string;
  type: string;
  unreadCount: number;
  messages: TChatMessage[];
  participants: TChatParticipant[];
};

// ----------------------------------------------------------------------

export type TChatContactsState = {
  byId: Record<string, TChatParticipant>;
  allIds: string[];
};

export type TChatConversationsState = {
  byId: Record<string, TChatConversation>;
  allIds: string[];
};

export type TChatState = {
  contacts: TChatParticipant[];
  recipients: TChatParticipant[];
  conversations: TChatConversationsState;
  currentConversationId: string | null;
  conversationsStatus: {
    loading: boolean;
    empty: boolean;
    error: IErrorType;
  };
};
