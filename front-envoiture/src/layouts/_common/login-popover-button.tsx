import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, IconButton } from '@mui/material';
import { m } from 'framer-motion';
import { varHover } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { LoginDialogue } from 'src/sections/auth';

export default function LoginPopoverButton() {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuthContext();
  const theme = useTheme();

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleClosenModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={openModal ? 'inherit' : 'default'}
        onClick={handleOpenModal}
        sx={{
          ...(openModal && {
            bgcolor: theme.palette.action.selected,
          }),
        }}
      >
        {user ? (
          <Avatar
            src="/assets/images/avatar.jpg"
            alt="avatar"
            sx={{
              width: 36,
              height: 36,
              border: `solid 2px ${theme.palette.background.default}`,
            }}
          />
        ) : (
          <Iconify icon="solar:users-group-rounded-bold-duotone" width={24} />
        )}
      </IconButton>

      <LoginDialogue openModal={openModal} onClose={() => handleClosenModal()} />
    </>
  );
}
