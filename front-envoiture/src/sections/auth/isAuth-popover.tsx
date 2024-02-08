import { m } from 'framer-motion';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Stack,
  Avatar,
  Divider,
  MenuItem,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import { useAuthContext } from 'src/auth/hooks';
import { varHover } from 'src/components/animate';
import { useSnackbar } from 'src/components/snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useLocation } from 'react-router';
import { useSelector } from 'src/redux/store';

export default function IsAuthPopover() {
  const router = useRouter();
  const location = useLocation();
  const { logout } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const popover = usePopover();
  const { profil } = useSelector((state) => state.account);

  const OPTIONS = [
    {
      label: 'My account',
      linkTo: paths.user.profile(profil?.id, `${profil?.lname}`),
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace('/');
      enqueueSnackbar('Good Bye!', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={profil?.imageName}
          alt="avatar"
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>
      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {profil?.fname} {profil?.lname}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {profil?.email}
          </Typography>
        </Box>

        <Divider />

        <Stack>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {option.label}
              </Typography>
            </MenuItem>
          ))}
        </Stack>

        <Divider />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
