import { useState } from 'react';
import { Avatar, Box, IconButton, Link, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import LoginForm from './login/login-form';
import RegisterForm from './register/register-form';

export default function LoginPopover() {
  const popover = usePopover();
  const { user } = useAuthContext();
  const { t } = useLocales();
  const [isNewUser, setIsNewUser] = useState(false);
  console.log('sdfsd',user)

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={popover.open ? 'inherit' : 'default'}
        onClick={popover.onOpen}
        sx={{
          ...(popover.open && {
            bgcolor: (theme) => theme.palette.action.selected,
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
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          />
        ) : (
          <Iconify icon="solar:users-group-rounded-bold-duotone" width={24} />
        )}
      </IconButton>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: isNewUser ? 360 : 320 }}
      >
        <Box textAlign="center">
          {user ? (
            'logout'
          ) : (
            <>
              <Typography variant="h6">{t('auth.signIn')}</Typography>
              <Scrollbar sx={{ height: isNewUser ? 360 : 290 }}>
                {isNewUser ? (
                  <Stack spacing={2}>
                    <Typography variant="body2">
                      {t('auth.haveAccount')}
                      <Link onClick={() => setIsNewUser(false)}>{t('auth.signIn')}</Link>
                    </Typography>

                    <RegisterForm />
                  </Stack>
                ) : (
                  <Stack spacing={2}>
                    <Typography variant="body2">
                      {t('auth.newUser')}
                      <Link onClick={() => setIsNewUser(true)}>{t('auth.createAccount')}</Link>
                    </Typography>

                    <LoginForm forgotPassword/>
                  </Stack>
                )}
              </Scrollbar>
            </>
          )}
        </Box>
      </CustomPopover>
    </>
  );
}
