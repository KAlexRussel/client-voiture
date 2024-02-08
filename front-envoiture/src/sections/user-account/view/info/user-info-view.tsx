import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import {
  Card,
  Stack,
  Typography,
  LinearProgress,
  Grid,
  Paper,
  ListSubheader,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { m } from 'framer-motion';
import { varHover } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import UserInfoSection from './generalite/user-info-section';
import UserPaymentSection from './payment/user-payment-section';

export default function UserInfoView() {
  const [userForm, setUserForm] = useState(true);
  const [userPayement, setUserPayement] = useState(false);

  const handleOpenUserForm = () => {
    setUserForm(true);
    setUserPayement(false);
  };
  const handleOpenUserPayement = () => {
    setUserForm(false);
    setUserPayement(true);
  };

  const renderVerticalNav = (
    <Card
      sx={{
        p: 2.8,
        boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
      }}
    >
      <Paper variant="outlined" sx={{ width: 1 }}>
        <List subheader={<ListSubheader>Profil</ListSubheader>}>
          <ListItemButton
            component={m.div}
            whileHover="hover"
            variants={varHover(1.1)}
            onClick={handleOpenUserForm}
          >
            <ListItemAvatar>
              <Iconify icon="clarity:avatar-line" width={30} />
            </ListItemAvatar>
            <ListItemText primary="Généralite" secondary="Informations sur le profil" />
          </ListItemButton>
          <ListItemButton
            component={m.div}
            whileHover="hover"
            variants={varHover(1.1)}
            onClick={handleOpenUserPayement}
          >
            <ListItemAvatar>
              <Iconify icon="fluent:payment-32-regular" width={30} />
            </ListItemAvatar>
            <ListItemText
              primary="Données bancaires"
              secondary="Informations sur les méthode de paiement"
            />
          </ListItemButton>
        </List>
      </Paper>
    </Card>
  );

  const renderProfilProgressBar = (
    <Card
      sx={{
        p: 2.8,
        boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
      }}
    >
      <Stack alignItems="center">
        <Typography variant="body1"> Profil completé a 30%</Typography>
      </Stack>
      <LinearProgress
        value={40}
        variant="determinate"
        color="inherit"
        sx={{
          my: 2,
          color: '#619FCB',
          height: 11,
          '&::before': {
            bgcolor: 'divider',
            opacity: 1,
          },
        }}
      />
    </Card>
  );

  return (
    <Grid container spacing={3} sx={{ py: 5 }}>
      <Grid item xs={12} md={4}>
        {renderProfilProgressBar}
        <br />
        {renderVerticalNav}
      </Grid>
      <Grid item xs={12} md={8}>
        {userForm && <UserInfoSection />}
        {userPayement && <UserPaymentSection />}
      </Grid>
    </Grid>
  );
}
