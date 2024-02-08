import { useCallback, useEffect } from 'react';
import { getContacts, getConversation, getConversations, markAsSeen } from 'src/redux/actions/chat-action';
import { resetActiveConversation } from 'src/redux/reducer/chat-reducer';
import { useDispatch } from 'src/redux/store';
import { useRouter, useSearchParams } from 'src/routes/hook';
import { useAuthContext } from 'src/auth/hooks';
import { paths } from 'src/routes/paths';

export function useInitial() {
    const dispatch = useDispatch();
    const { user } = useAuthContext();

    const router = useRouter();
  
    const searchParams = useSearchParams();
  
    const conversationParam = searchParams.get('id');
  
    const getContactsCallback = useCallback(() => {
      dispatch(getContacts());
    }, [dispatch]);
  
    const getConversationsCallback = useCallback(() => {
      dispatch(getConversations());
    }, [dispatch]);
  
    const getConversationCallback = useCallback(() => {
      try {
        if (conversationParam) {
          dispatch(getConversation(conversationParam));
          dispatch(markAsSeen(conversationParam));
        } else {
          // router.push(paths.user.profile(user?.id, user?.lname));
          dispatch(resetActiveConversation());
        }
      } catch (error) {
        console.error(error);
        router.push(paths.user.profile(user?.id, user?.lname));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversationParam, dispatch]);
  
    useEffect(() => {
      getContactsCallback();
    }, [getContactsCallback]);
  
    useEffect(() => {
      getConversationsCallback();
    }, [getConversationsCallback]);
  
    useEffect(() => {
      getConversationCallback();
    }, [getConversationCallback]);
  
    return null;
}