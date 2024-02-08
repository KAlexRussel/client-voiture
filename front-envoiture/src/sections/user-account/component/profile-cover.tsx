import { Box, Stack, Avatar, ListItemText, Typography } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { TUserProfileCover } from 'src/types/user';
import { bgGradient } from 'src/theme/css';
import React, { Fragment } from 'react';
import UserEditAvater from './edit-avatar';

export default function ProfileCover({ name, avatarUrl, coverUrl, age, tel }: TUserProfileCover) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.darker, 0.4),
          imgUrl: coverUrl,
        }),
        height: 1,
        color: 'common.white',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          left: { md: 24 },
          bottom: { md: 50 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: 'absolute' },
        }}
      >
        <UserEditAvater />
        <ListItemText
          sx={{
            mt: 3,
            ml: { md: 3 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
          primary={name}
          secondary={
            <>
              <Typography> {age} ans </Typography>
              {tel}
            </>
          }
          primaryTypographyProps={{
            typography: 'h3',
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            color: 'inherit',
            component: 'span',
            typography: 'body1',
          }}
        />
      </Stack>
    </Box>
  );
}
