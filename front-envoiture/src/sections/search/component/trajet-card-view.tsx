import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'src/redux/store';
import { fCurrency } from 'src/utils/format-number';
import { calculateArrivingTime, convertDecimalToTimeFormat, fTime } from 'src/utils/format-time';
import { useCallback, useState } from 'react';
import { getSelectedRide } from 'src/redux/reducer/ride-reducer';
import { paths } from 'src/routes/paths';
import { TRides } from 'src/types/ride';
import RiderProfilDialog from './rider-profil-dialogue';

type Props = {
  ride: TRides;
};

export default function TrajetCardtView({ ride }: Props) {
  const isDeskTop = useResponsive('up', 'md');
  const [showProfil, setShowProfil] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnClose = () => {
    setShowProfil(false);
  };

  const handleOnClick = useCallback(async () => {
    dispatch(getSelectedRide(ride));
    navigate(paths.search.trajetsDetails(ride.id));
  }, [dispatch, navigate, ride]);

  const renderTimeLine = (
    <Stack direction="column" sx={{ mb: 2 }}>
      <Stack direction="row" spacing={2}>
        <Typography variant={isDeskTop ? 'h5' : 'body2'}>{fTime(ride.startAt)}</Typography>
        <Iconify
          icon="ep:position"
          sx={{ color: ride.type === 'conducteur' ? '#619FCB' : '#663F81' }}
          width={isDeskTop ? 23 : 15}
        />
        <Typography variant={isDeskTop ? 'h5' : 'body2'}>{ride.start}</Typography>
      </Stack>
      <Stack direction="row" alignItems="left" sx={{ ml: isDeskTop ? 7 : 4 }}>
        <Typography sx={{ color: 'text.secondary', fontSize: '10px' }} variant="body2">
          {convertDecimalToTimeFormat(ride.tripTime)}
        </Typography>
        <Iconify
          icon="zondicons:dots-horizontal-double"
          sx={{ color: ride.type === 'conducteur' ? '#619FCB' : '#663F81' }}
          width={isDeskTop ? 23 : 15}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant={isDeskTop ? 'h5' : 'body2'}>
          {calculateArrivingTime(ride.startAt, ride.tripTime)}
        </Typography>
        <Iconify
          icon="fluent:location-24-regular"
          sx={{ color: ride.type === 'conducteur' ? '#619FCB' : '#663F81' }}
          width={23}
        />
        <Typography variant={isDeskTop ? 'h5' : 'body2'}>{ride.end}</Typography>
      </Stack>
    </Stack>
  );

  const renderPrice = (
    <Stack direction="column">
      <Stack alignItems="right">
        <Typography
          variant="h4"
          sx={{
            ml: { xs: 10, md: 10, lg: 6 },
            mb: 1,
            color: ride.type === 'conducteur' ? '#619FCB' : '#663F81',
          }}
        >
          {fCurrency(ride.price)} €
        </Typography>
      </Stack>
      <Stack sx={{ ml: { xs: 10, lg: 6 } }} direction="row" alignItems="center" spacing={2}>
        <Stack direction="column">
          <Avatar
            alt="profil"
            src={ride.user.imageName}
            onClick={() => setShowProfil(true)}
            sx={{ cursor: 'pointer', width: isDeskTop ? 65 : 50, height: isDeskTop ? 65 : 50 }}
          />
          <Typography
            sx={{ cursor: 'pointer' }}
            variant="subtitle2"
            onClick={() => setShowProfil(true)}
          >
            {ride.user.fname}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="column">
        <Stack sx={{ ml: { xs: 10, lg: 6 } }} direction="row">
          <Iconify icon="fluent-emoji-flat:star" width={20} />
          {/* fShortenNumber(ride.user.rating)}/5 - */}
          <Typography sx={{ mr: { xs: 10, lg: 1 } }} style={{ color: ride.type === 'conducteur' ? '#619FCB' : '#663F81' }}>
            {ride.user.reviews && ride.user.reviews.length}  4/5 - avis
          </Typography>
        </Stack>
        <Typography
          variant="caption"
          sx={{
            ml: { xs: 10, lg: 6 },
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          {ride.isAnimalAllowed && (
            <Iconify icon="streamline-emojis:dog-face" width={14} sx={{ mr: 0.5 }} />
          )}
          {ride.isBagAllowed && (
            <Iconify icon="zondicons:travel-case" width={14} sx={{ mr: 0.5 }} />
          )}
          {ride.isFoodAllowed && (
            <Iconify icon="zondicons:location-food" width={14} sx={{ mr: 0.5 }} />
          )}
          {ride.isMusicAllowed && (
            <Iconify icon="zondicons:music-notes" width={14} sx={{ mr: 0.5 }} />
          )}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderProfil = (
    <Stack direction="column">
      {ride.type === 'conducteur' && (
        <>
          <Stack direction="row" spacing={1}>
            <Iconify
              icon="mdi:account-multiple-outline"
              width={isDeskTop ? 25 : 20}
              sx={{ mr: 0.5 }}
              color="#619FCB"
            />
            <Typography variant="body2"> {ride.availablePlaces} Place(s) disponible</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Iconify
              icon="lucide:zap"
              width={isDeskTop ? 25 : 20}
              sx={{ mr: 0.5 }}
              color="#619FCB"
            />
            <Typography variant="body2"> Détour possible</Typography>
          </Stack>
        </>
      )}
      {ride.type === 'passenger' && (
        <>
          <Stack direction="row" spacing={1}>
            <Iconify
              icon="mdi:account-multiple-outline"
              width={isDeskTop ? 25 : 20}
              sx={{ mr: 0.5 }}
              color="#663F81"
            />
            <Typography variant="body2"> {ride.placesNumber} Personne(s)</Typography>
          </Stack>
          <br />
        </>
      )}
      <Stack direction="row" spacing={1}>
        <Typography sx={{ color: ride.type === 'conducteur' ? '#619FCB' : '#663F81' }} variant="h5">
          {ride.type}
        </Typography>
        <Iconify
          icon="lucide:zap"
          width={25}
          sx={{ mr: 0.5 }}
          color={ride.type === 'conducteur' ? '#619FCB' : '#663F81'}
        />
      </Stack>
    </Stack>
  );

  return (
    <>
      <Stack sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          {renderTimeLine}
          {renderPrice}
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          {renderProfil}
          <LoadingButton
            size="large"
            type="submit"
            disabled={ride.availablePlaces === 0}
            variant="contained"
            onClick={handleOnClick}
            sx={{
              backgroundColor: ride.type === 'conducteur' ? '#619FCB' : '#663F81',
              borderRadius: 3,
              justifyContent: 'space-between',
              mt: 5,
            }}
          >
            {ride.type === 'conducteur' ? 'Reserver' : 'Booker'}
          </LoadingButton>
        </Stack>
      </Stack>
      <RiderProfilDialog
        onClose={handleOnClose}
        open={showProfil}
        profil={ride.user}
        rideInfo={ride}
      />
    </>
  );
}
