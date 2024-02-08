import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  IconButton,
  ListItemText,
  Stack,
  Typography,
  Tooltip,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { useDispatch, useSelector } from 'src/redux/store';
import { m } from 'framer-motion';
import { varHover } from 'src/components/animate';
import { AvatarShape } from 'src/assets/illustrations';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';
import { TRides } from 'src/types/ride';
import AddReviewForm from 'src/sections/reviews/add-review-form';
import ReviewList from 'src/sections/reviews/review-list';
import { useAuthContext } from 'src/auth/hooks';
import UserReviewCard from './user-review-card';

interface Props extends DialogProps {
  onClose: any;
  open: boolean;
  profil?: any;
  rideInfo: TRides | null;
}

export default function RiderProfilDialog({ open, onClose, profil, rideInfo, ...other }: Props) {
  const newReview = useBoolean();
  const theme = useTheme();
  const isDeskTop = useResponsive('up', 'md');
  const ProfilAccount = useSelector((state) => state.account.profil);
  const { authenticated, user } = useAuthContext();

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose} {...other}>
      <Box sx={{ position: 'relative' }}>
        <AvatarShape
          sx={{
            left: 0,
            right: 0,
            zIndex: 10,
            mx: 'auto',
            bottom: -26,
            position: 'absolute',
          }}
        />
        <Avatar
          alt={profil ? profil.fname : ProfilAccount.imageName}
          src={profil ? profil.imageName : ProfilAccount.imageName}
          sx={{
            width: 84,
            height: 84,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -52,
            mx: 'auto',
            position: 'absolute',
          }}
        />
        <Image
          src="/assets/images/cover/cover_21.jpg"
          alt="cover"
          sx={{ height: 170, width: '100%' }}
          overlay={alpha(theme.palette.grey[900], 0.48)}
        />
      </Box>
      <DialogContent>
        <Stack alignItems="center">
          <ListItemText
            sx={{ mt: 7, mb: 1 }}
            primary={
              <Typography variant="h5">
                {profil ? profil.fname : ProfilAccount.imageName}
              </Typography>
            }
            secondary={
              <Typography variant="body2" sx={{ ml: 1.5 }}>
                {profil ? profil.age : ProfilAccount.age} ans
              </Typography>
            }
            primaryTypographyProps={{ typography: 'subtitle1' }}
          />
        </Stack>
        <Grid container spacing={3} sx={{ py: 5 }}>
          <Grid item xs={6} md={5}>
            <Stack spacing={3}>
              <Typography variant="h5">Autorisation</Typography>
              <Stack direction="column">
                {rideInfo?.isMusicAllowed && (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    🎶 Musique autorisée
                  </Typography>
                )}
                {rideInfo?.isAnimalAllowed && (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    🐶 Animaux autorisés
                  </Typography>
                )}
                {rideInfo?.isBagAllowed && (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    🧳 Gros bagages
                  </Typography>
                )}
                {rideInfo?.isFoodAllowed && (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    🍔 Repas autorisés
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6} md={7}>
            <Stack spacing={1}>
              <Typography variant="h5" align="right">
                Véhicule
              </Typography>
              <Typography variant="body2" align="right">
                {profil ? profil.vehicle?.designation : ProfilAccount.vehicle?.designation}
              </Typography>

              {profil ? (
                <Stack>
                  {profil.vehicle && profil.vehicle.imageName ? (
                    <Image
                      alt="carImg"
                      src={profil.vehicle?.imageName}
                      sx={{
                        borderRadius: 2,
                        height: { xs: 80, md: 100 },
                        // my: { xs: 5, md: 10 },
                      }}
                    />
                  ) : (
                    <Typography variant="body1">Aucun véhicule enregistré.</Typography>
                  )}
                </Stack>
              ) : (
                <Stack>
                  {ProfilAccount.vehicle && ProfilAccount.vehicle.imageName ? (
                    <Image
                      alt="carImg"
                      src={ProfilAccount.vehicle?.imageName}
                      sx={{
                        borderRadius: 2,
                        my: { xs: 5, md: 10 },
                      }}
                    />
                  ) : (
                    <Typography variant="body1">Aucun véhicule enregistré.</Typography>
                  )}
                </Stack>
              )}
            </Stack>
          </Grid>
        </Grid>
        <Stack sx={{ mb: 5 }} direction="row" justifyContent="space-between">
          <Stack>
            <Typography variant="h4"> Avis </Typography>
            {profil ? (
              <ReviewList userId={profil.id} /> 
            ) : (
              <ReviewList userId={ProfilAccount.id} /> 
            )}
          </Stack>
          {authenticated && profil.id !== user?.id && (
            <Stack>
              <Stack alignItems="center" justifyContent="center">
                <IconButton
                  component={m.button}
                  whileTap="tap"
                  whileHover="hover"
                  variants={varHover(1.2)}
                  onClick={newReview.onTrue}
                >
                  <Tooltip title="Ajouter un commentaire">
                    <Iconify icon="solar:pen-bold" />
                  </Tooltip>
                </IconButton>
              </Stack>

              <AddReviewForm open={newReview.value} onClose={newReview.onFalse} rideId={rideInfo?.id} />
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
