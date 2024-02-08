// @mui
import Box from '@mui/material/Box';
// types
import { TChatParticipant, TChatMessage } from 'src/types/chat';
// components
import Scrollbar from 'src/components/scrollbar';
//
import useMessagesScroll from '../hooks/use-messages-scroll';
import ChatMessageItem from './chat-message-item';

// ----------------------------------------------------------------------

type Props = {
  messages: TChatMessage[];
  participants: TChatParticipant[];
};

export default function ChatMessageList({ messages, participants }: Props) {
  const { messagesEndRef } = useMessagesScroll(messages);

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          {messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
              participants={participants}
            />
          ))}
        </Box>
      </Scrollbar>
    </>
  );
}
