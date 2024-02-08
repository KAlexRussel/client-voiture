import { useCallback, useEffect, useState } from 'react';
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Drawer, IconButton, Stack } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import { useRouter } from 'src/routes/hook';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TChatConversationsState, TChatParticipant } from 'src/types/chat';
import useCollapseNav from '../hooks/use-collapse-nav';
import ChatNavItem from './chat-nav-item';
import { ChatNavItemSkeleton } from './chat-skeleton';
import ChatNavSearchResults from './chat-nav-search-results';
import ChatNavAccount from './chat-nav-account';

const NAV_WIDTH = 320;

const NAV_COLLAPSE_WIDTH = 96;

type Props = {
  loading: boolean;
  contacts: TChatParticipant[];
  currentConversationId: string | null;
  conversations: TChatConversationsState;
  onClickConversation: (id: string) => void;
};

export default function ChatNav({
  loading,
  contacts,
  conversations,
  onClickConversation,
  currentConversationId,
}: Props) {
  const theme = useTheme();
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const {
    collapseDesktop,
    onCloseDesktop,
    onCollapseDesktop,
    //
    openMobile,
    onOpenMobile,
    onCloseMobile,
  } = useCollapseNav();

  useEffect(() => {
    if (!mdUp) {
      onCloseDesktop();
    }
  }, [onCloseDesktop, mdUp]);

  const handleToggleNav = useCallback(() => {
    if (mdUp) {
      onCollapseDesktop();
    } else {
      onCloseMobile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdUp]);

  const handleClickCompose = useCallback(() => {
    if (!mdUp) {
      onCloseMobile();
    }
    // router.push(paths.dashboard.chat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdUp]);

  const handleClickConversation = useCallback(
    (id: string) => {
      if (!mdUp) {
        onCloseMobile();
      }
      onClickConversation(id);
    },

    [onCloseMobile, mdUp, onClickConversation]
  );

  const renderMobileBtn = (
    <IconButton
      onClick={onOpenMobile}
      sx={{
        left: 0,
        top: 84,
        zIndex: 9,
        width: 32,
        height: 32,
        position: 'absolute',
        borderRadius: `0 12px 12px 0`,
        bgcolor: theme.palette.primary.main,
        boxShadow: theme.customShadows.primary,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          bgcolor: theme.palette.primary.darker,
        },
      }}
    >
      <Iconify width={16} icon="solar:users-group-rounded-bold" />
    </IconButton>
  );

  const renderList = (
    <>
      {(loading ? [...Array(12)] : conversations.allIds).map((conversationId, index) =>
        conversationId ? (
          <ChatNavItem
            key={conversationId}
            collapse={collapseDesktop}
            conversation={conversations.byId[conversationId]}
            onClickConversation={() => handleClickConversation(conversationId)}
            selected={conversationId === currentConversationId}
          />
        ) : (
          <ChatNavItemSkeleton key={index} />
        )
      )}
    </>
  );

  const renderContent = (
    <>
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ p: 2.5, pb: 0 }}>
        {!collapseDesktop && (
          <>
            <ChatNavAccount />
            <Box sx={{ flexGrow: 1 }} />
          </>
        )}

        <IconButton onClick={handleToggleNav}>
          <Iconify
            icon={collapseDesktop ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'}
          />
        </IconButton>

        {!collapseDesktop && (
          <IconButton onClick={handleClickCompose}>
            <Iconify width={24} icon="solar:user-plus-bold" />
          </IconButton>
        )}
      </Stack>

      <Scrollbar sx={{ pb: 1 }}>{renderList}</Scrollbar>
    </>
  );

  return (
    <>
      {!mdUp && renderMobileBtn}
      {mdUp ? (
        <Stack
          sx={{
            height: 1,
            flexShrink: 0,
            width: NAV_WIDTH,
            boxShadow: `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
            borderRight: `solid 1px ${theme.palette.divider}`,
            transition: theme.transitions.create(['width'], {
              duration: theme.transitions.duration.shorter,
            }),
            ...(collapseDesktop && {
              width: NAV_COLLAPSE_WIDTH,
            }),
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openMobile}
          onClose={onCloseMobile}
          slotProps={{
            backdrop: { invisible: true },
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}
