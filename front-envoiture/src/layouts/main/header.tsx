import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur } from 'src/theme/css';
import { paths } from 'src/routes/paths';
import Logo from 'src/components/logo';
import Label from 'src/components/label';
import { LoginDialogue } from 'src/sections/auth';
import { useAuthContext } from 'src/auth/hooks';
import IsAuthPopover from 'src/sections/auth/isAuth-popover';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { HeaderShadow, LanguagePopover, LoginPopoverButton } from '../_common';

export default function Header() {
  const theme = useTheme();
  const { authenticated } = useAuthContext();
  const isDesktop = useResponsive('up', 'md');
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Badge
            sx={{
              [`& .${badgeClasses.badge}`]: {
                top: 8,
                right: -16,
              },
            }}
          >
           <Logo /> 
          </Badge>

          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <NavDesktop offsetTop={offsetTop} data={navConfig} />}

          {!isDesktop && (
            <>
              <LanguagePopover />
              {!authenticated ? <LoginPopoverButton /> : <IsAuthPopover />}
            </>
          )}

          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
            {isDesktop ? (
              <>
                <LanguagePopover />
                {!authenticated ? <LoginPopoverButton /> : <IsAuthPopover />}
              </>
            ) : (
              <NavMobile offsetTop={offsetTop} data={navConfig} />
            )}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
