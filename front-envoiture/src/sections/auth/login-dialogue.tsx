import { useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Link,
  Stack,
  Typography,
  Dialog,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import { m } from 'framer-motion';
import { varFade } from 'src/components/animate';
import { useLocales } from 'src/locales';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgGradient } from 'src/theme/css';
import Image from 'src/components/image';
import LoginForm from './login/login-form';
import RegisterForm from './register/register-form';
import ForgotPwdForm from './forgot-pwd/forgotPwd-form';

type Props = {
  openModal: boolean;
  onClose: () => void;
};

export default function LoginDialogue({ openModal, onClose }: Props) {
  const { t } = useLocales();
  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp, SetIsSignUp] = useState(false);
  const [isForgotpwd, SetIsforgotPwd] = useState(false);
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');

  const handleClosenModal = () => {
    onClose();
    setIsLogin(true);
    SetIsSignUp(false);
    SetIsforgotPwd(false);
  };
  const handleIsLogin = () => {
    setIsLogin(true);
    SetIsSignUp(false);
    SetIsforgotPwd(false);
  };
  const handleIsSignUp = () => {
    setIsLogin(false);
    SetIsSignUp(true);
    SetIsforgotPwd(false);
  };
  const handleIsForgotPwd = () => {
    setIsLogin(false);
    SetIsSignUp(false);
    SetIsforgotPwd(true);
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={openModal} onClose={() => handleClosenModal()}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 5, md: 0 }}
        >
          {isDesktop && (
            <Grid item xs={12} md={6}>
              <Stack
                flexGrow={1}
                alignItems="center"
                justifyContent="center"
                spacing={10}
                sx={{
                  ...bgGradient({
                    color: alpha(theme.palette.background.default, 0),
                    imgUrl: '/assets/images/login/Rectangle_15.png',
                  }),
                }}
              >
                <m.div variants={varFade().inRight}>
                  <Image
                    alt="darkmode"
                    src="/assets/images/login/Group_4.png"
                    sx={{
                      borderRadius: 2,
                      my: { xs: 5, md: 10 },
                    }}
                  />
                </m.div>
              </Stack>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                sx={{ textAlign: 'center' }}
                title={
                  <Typography variant="h4">{isSignUp ? 'Inscription' : 'Connexion'}</Typography>
                }
              />
              <CardContent>
                <Box textAlign="center">
                  {isLogin && (
                    <Stack spacing={2} textAlign="left">
                      <Typography variant="body2">
                        Pas encore membre ?
                        <Link onClick={() => handleIsSignUp()} sx={{ cursor: 'pointer' }}>
                          {' '}
                          je m&apos;inscris !
                        </Link>
                      </Typography>
                      <LoginForm forgotPassword={handleIsForgotPwd} />
                    </Stack>
                  )}
                  {isSignUp && (
                    <Stack spacing={2}>
                      <Typography variant="body2">
                        {t('auth.haveAccount')}
                        <Link onClick={() => handleIsLogin()} sx={{ cursor: 'pointer' }}>
                          {t('auth.signIn')}
                        </Link>
                      </Typography>
                      <RegisterForm />
                    </Stack>
                  )}
                  {isForgotpwd && (
                    <Stack spacing={2}>
                      <Stack spacing={2} textAlign="center">
                        <Typography variant="body2">
                          Un lien de réinitialisation de mot de passe vous sera envoyer
                        </Typography>
                      </Stack>
                      <ForgotPwdForm />
                    </Stack>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
