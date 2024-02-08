// types
import { TChatParticipant, TChatMessage } from 'src/types/chat';

// ----------------------------------------------------------------------

type Props = {
  message: TChatMessage;
  currentUserId: string;
  participants: TChatParticipant[];
};

export default function useGetMessage({ message, participants, currentUserId }: Props) {
  const sender = participants.find((participant) => participant.id === message.senderId);

  const senderDetails =
    message.senderId === currentUserId
      ? {
          type: 'me',
        }
      : {
          avatarUrl: sender?.imageName,
          firstName: sender?.name.split(' ')[0],
        };

  const me = senderDetails.type === 'me';

  return {
    me,
    senderDetails,
  };
}
