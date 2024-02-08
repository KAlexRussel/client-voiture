import { useCallback, useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import {
  Card,
  Grid,
  Paper,
  ListSubheader,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Stack,
  Divider,
  Box,
} from '@mui/material';
import { m } from 'framer-motion';
import { varHover } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import { fNumber } from 'src/utils/format-number';
import { _ToBeTrajet, _PasseTrajet } from 'src/_mock/_trajet';
import { useDispatch, useSelector } from 'src/redux/store';
import { getCurrentUserBookingsAction } from 'src/redux/actions/account-action';
import UserBookedRidesSection from './booked/user-booked-rides-section';
import UserPublishRideSection from './publish/user-publish-ride-section';

function useInitial(userId: number) {
  const dispatch = useDispatch();

  const getProductsCallback = useCallback(() => {
    dispatch(getCurrentUserBookingsAction(userId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    getProductsCallback();
  }, [getProductsCallback]);

  return null;
}

export default function UserTrajetView() {
  const [seeBookedRides, setSeeBookedRides] = useState(false);
  const [seePublishRides, setSeePublishRides] = useState(true);
  const { profil } = useSelector((state) => state.account);
  useInitial(profil.id);

  const handleSeeBookedRides = () => {
    setSeeBookedRides(true);
    setSeePublishRides(false);
  };
  const handleSeePublishRides = () => {
    setSeePublishRides(true);
    setSeeBookedRides(false);
  };

  const renderTrajetCount = (
    <Card
      sx={{
        py: 2.8,
        textAlign: 'center',
        typography: 'h4',
        boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {fNumber(profil.rides.length)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
          Trajets publiés
          </Box>
        </Stack>

        <Stack width={1}>
          {fNumber(profil.reservedBookings.length)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
          Trajets réservés
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderVerticalNav = (
    <Card
      sx={{
        p: 2.8,
        boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
      }}
    >
      <Paper variant="outlined" sx={{ width: 1 }}>
        <List subheader={<ListSubheader>Trajets</ListSubheader>}>
          <ListItemButton
            component={m.div}
            whileHover="hover"
            variants={varHover(1.1)}
            onClick={handleSeePublishRides}
          >
            <ListItemAvatar>
              <Iconify icon="material-symbols:published-with-changes-rounded" width={30} />
            </ListItemAvatar>
            <ListItemText primary="Trajets publiés" secondary="Consultation des trajets effectué" />
          </ListItemButton>
          <ListItemButton
            component={m.div}
            whileHover="hover"
            variants={varHover(1.1)}
            onClick={handleSeeBookedRides}
          >
            <ListItemAvatar>
              <Iconify icon="ic:twotone-airline-stops" width={30} />
            </ListItemAvatar>
            <ListItemText primary="Trajets réservés" secondary="Consultation des trajets planifié" />
          </ListItemButton>
        </List>
      </Paper>
    </Card>
  );

  return (
    <Grid container spacing={3} sx={{ py: 5 }}>
      <Grid item xs={12} md={4}>
        {renderTrajetCount}
        <br />
        {renderVerticalNav}
      </Grid>
      <Grid item xs={12} md={8}>
        { seePublishRides && <UserPublishRideSection publishRides={profil.rides}/> }
        {seeBookedRides && <UserBookedRidesSection bookedRides={profil.reservedBookings} /> }
      </Grid>
    </Grid>
  );
}
