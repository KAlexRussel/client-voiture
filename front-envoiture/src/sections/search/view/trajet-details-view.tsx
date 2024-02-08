import { useState } from 'react';
import { Avatar, Card, Container, Divider, Link, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { m } from 'framer-motion';
import { MotionViewport, varHover } from 'src/components/animate';
import { useSelector } from 'src/redux/store';
import { useResponsive } from 'src/hooks/use-responsive';
import { useAuthContext } from 'src/auth/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import {
  calculateArrivingTime,
  convertDecimalToTimeFormat,
  fDate,
  fTime,
} from 'src/utils/format-time';
import Iconify from 'src/components/iconify';
import { CancelRideDialog, RidePaymentDialog, RiderProfilDialog } from '../component';

export default function TrajetDetailsView() {
  const { selectedRide } = useSelector((state) => state.rides);
  const { user } = useAuthContext();
  const isDeskTop = useResponsive('up', 'md');
  const [showProfil, setShowProfil] = useState(false);
  const showPayment = useBoolean();
  const cancelRide = useBoolean();

  const handleOnClose = () => {
    setShowProfil(false);
  };

  return (
    <Container
      component={MotionViewport}
      sx={{
        pt: 5,
        pb: 3,
        minHeight: 1,
      }}
    >
      <Typography variant="h3" align="center" paragraph>
        {fDate(selectedRide?.startAt)}
      </Typography>
      <Card
        sx={{
          p: isDeskTop ? 9 : 5,
          boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
        }}
      >
        <Stack justifyContent="space-between" direction={isDeskTop ? 'row' : 'column'}>
          <Stack>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Trajet
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="body1">{fTime(selectedRide?.startAt)}</Typography>
              <Iconify
                icon="ep:position"
                sx={{ color: selectedRide?.type === 'conducteur' ? '#619FCB' : '#663F81' }}
                width={isDeskTop ? 23 : 15}
              />
              <Typography variant="body1">{selectedRide?.start}</Typography>
            </Stack>
            <Stack direction="row" alignItems="left" sx={{ ml: isDeskTop ? 4 : 4 }}>
              <Typography sx={{ color: 'text.secondary' }} variant="body2">
                {convertDecimalToTimeFormat(selectedRide?.tripTime)}
              </Typography>
              <Iconify
                icon="zondicons:dots-horizontal-double"
                sx={{ color: selectedRide?.type === 'conducteur' ? '#619FCB' : '#663F81' }}
                width={isDeskTop ? 23 : 15}
              />
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Typography variant="body1">
                {calculateArrivingTime(selectedRide?.startAt, selectedRide?.tripTime)}
              </Typography>
              <Iconify
                icon="fluent:location-24-regular"
                sx={{ color: selectedRide?.type === 'conducteur' ? '#619FCB' : '#663F81' }}
                width={23}
              />
              <Typography variant="body1">{selectedRide?.end}</Typography>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={3}>
            <Typography align="center" variant="h5">
              Tarif Total par passager
            </Typography>
            <Typography
              variant="h3"
              align="center"
              sx={{ color: selectedRide?.type === 'conducteur' ? '#619FCB' : '#663F81' }}
            >
              {selectedRide?.price} €
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ borderBottomWidth: 3, mt: 3, mb: 3 }} />
        <Stack justifyContent="space-between" direction="row">
          <Stack>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Conducteur
            </Typography>
            <Stack direction="column">
              <Typography variant="body1">
                {selectedRide?.user.lname} {selectedRide?.user.fname}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.secondary',
                }}
              >
                <Iconify icon="fluent-emoji-flat:star" width={14} sx={{ mr: 0.5 }} />
                {/* fShortenNumber(ride.user.rating)}/5 - */}
                4/5 -
                <span
                  style={{ color: selectedRide?.type === 'conducteur' ? '#619FCB' : '#663F81' }}
                >
                  {selectedRide?.user.reviews && selectedRide?.user.reviews.length} avis
                </span>
              </Typography>
              <Link
                href="/"
                style={{ color: selectedRide?.type === 'conducteur' ? '#619FCB' : '#663F81' }}
              >
                Ecrire à {selectedRide?.user.lname}{' '}
                <Iconify icon="mingcute:send-line" width={14} sx={{ mr: 0.5 }} />
              </Link>
            </Stack>
          </Stack>
          <Stack sx={{ mt: 5, mr: isDeskTop ? 9 : 0 }}>
            <Avatar
              component={m.div}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.2)}
              alt="profil"
              src={selectedRide?.user.imageName}
              onClick={() => setShowProfil(true)}
              sx={{ cursor: 'pointer', width: isDeskTop ? 90 : 60, height: isDeskTop ? 90 : 60 }}
            />
          </Stack>
        </Stack>
        <Divider sx={{ borderBottomWidth: 3, mt: 3, mb: 3 }} />
        <Stack justifyContent="center" alignItems="center">
          {selectedRide?.user.id === user?.id ? (
            <LoadingButton
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              size="large"
              type="submit"
              variant="contained"
              onClick={cancelRide.onTrue}
              sx={{
                backgroundColor: 'red',
                borderRadius: 3,
                mt: 5,
              }}
            >
              Annuler
            </LoadingButton>
          ) : (
            <LoadingButton
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              size="large"
              type="submit"
              variant="contained"
              onClick={showPayment.onTrue}
              sx={{
                backgroundColor: selectedRide?.type === 'conducteur' ? '#619FCB' : '#663F81',
                borderRadius: 3,
                mt: 5,
              }}
            >
              {selectedRide?.type === 'conducteur' ? 'Reserver' : 'Booker'}
            </LoadingButton>
          )}
        </Stack>
      </Card>
      <RiderProfilDialog
        onClose={handleOnClose}
        open={showProfil}
        profil={selectedRide?.user}
        rideInfo={selectedRide}
      />
      <RidePaymentDialog onClose={showPayment.onFalse} open={showPayment.value} />
      <CancelRideDialog onClose={cancelRide.onFalse} open={cancelRide.value} />
    </Container>
  );
}
