import { Card, Container, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useSettingsContext } from 'src/components/settings';
import ChatNav from './component/chat-nav';
import useChat from './hooks/use-chat';
import ChatHeaderDetail from './component/chat-header-detail';
import ChatHeaderCompose from './component/chat-header-compose';
import ChatMessageList from './component/chat-message-list';
import ChatMessageInput from './component/chat-message-input';
import ChatRoom from './component/chat-room';
import { useInitial } from './utils/init-chat';

export default function ChatView() {
  // useInitial();
  const settings = useSettingsContext();

  const {
    contacts,
    recipients,
    conversations,
    conversationsStatus,
    currentConversation,
    currentConversationId,
    participantsInConversation,
    //
    onSendCompose,
    onSendMessage,
    onAddRecipients,
    onClickNavItem,
  } = useChat();

  const details = !!currentConversationId;

  const renderNav = (
    <ChatNav
      contacts={contacts}
      conversations={conversations}
      onClickConversation={onClickNavItem}
      loading={conversationsStatus.loading}
      currentConversationId={currentConversationId}
    />
  );

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72 }}
    >
      {details ? (
        <ChatHeaderDetail participants={participantsInConversation} />
      ) : (
        <ChatHeaderCompose contacts={contacts} onAddRecipients={onAddRecipients} />
      )}
    </Stack>
  );

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <ChatMessageList
        messages={currentConversation.messages}
        participants={participantsInConversation}
      />

      <ChatMessageInput
        recipients={recipients}
        onSendCompose={onSendCompose}
        onSendMessage={onSendMessage}
        currentConversationId={currentConversationId}
      />
    </Stack>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack
        component={Card}
        direction="row"
        sx={{
          height: '72vh',
          mb: 5,
          boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
        }}
      >
        {renderNav}

        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {renderHead}
          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 1,
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            {renderMessages}

            {details && (
              <ChatRoom
                conversation={currentConversation}
                participants={participantsInConversation}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
