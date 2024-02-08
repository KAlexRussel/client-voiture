import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import Iconify from 'src/components/iconify/iconify';
import Image from 'src/components/image';
import { useDispatch, useSelector } from 'src/redux/store';
import { useSnackbar } from 'src/components/snackbar';
import {
  addUserStripeAccountService,
  deleteUserStripeAccountService,
} from 'src/services/user-service';
import { activatePaymentAccount } from 'src/redux/reducer/account-reducer';
import { LoadingButton } from '@mui/lab';

export default function UserPaymentSection() {
  const [openDialogue, setOpenDialogue] = useState(false);
  const dispatch = useDispatch();
  const { profil } = useSelector((state) => state.account);
  const { enqueueSnackbar } = useSnackbar();

  const handleOnClose = () => {
    setOpenDialogue(false);
  };

  const handleRedirectionToStripe = useCallback(async () => {
    try {
      const data = {
        userId: profil.id,
        url: `http://localhost:3000/user/${profil?.id}/${profil?.lname}`,
      };
      const res = await addUserStripeAccountService(data);
      if (res.data) {
        window.location.href = res.data;
      }
    } catch (error) {
      console.error(error);
    }
  }, [profil]);

  const handleDeleteStripe = useCallback(async () => {
    try {
      await deleteUserStripeAccountService(profil.id);
      enqueueSnackbar('Votre compte Stripe a bien été supprimé !', { variant: 'success' });
      handleOnClose();
      dispatch(activatePaymentAccount(null))
    } catch (error) {
      console.error(error);
    }
  }, [profil, enqueueSnackbar, dispatch]);

  const renderConfidential = (
    <Card
      sx={{
        p: 4,
        boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
      }}
    >
      <Stack alignItems="center" spacing={2}>
        <Iconify color="#619FCB" icon="fluent:info-24-regular" />
        <Stack alignItems="center" spacing={1}>
          <Typography variant="body1">
            Pour vous permettre de recevoir des paiements suite aux prestations que vous réalisez
            sur notre plateforme, nous vous invitons à renseigner ci-dessous un numéro de compte
            bancaire valide en zone Europe.
          </Typography>
          <Typography variant="body1">
            Une fois votre compte validé, vous pourrez percevoir vos dues par virement
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );

  const renderCard = (
    <Card
      sx={{
        p: 4,
        boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
      }}
    >
      <Stack alignItems="left">
        <Typography variant="h5">Données bancaires</Typography>
      </Stack>
      <br />
      <Stack alignItems="center" spacing={1}>
        <Typography variant="body1">Je renseigne mes coordonnées bancaires</Typography>
        <Image
          alt="darkmode"
          src="/assets/images/11.png"
          sx={{
            borderRadius: 2,
            my: { xs: 5, md: 10 },
          }}
        />
        <Button
          size="large"
          type="submit"
          variant="contained"
          onClick={handleRedirectionToStripe}
          sx={{
            backgroundColor: '#619FCB',
            borderRadius: 3,
          }}
        >
          Ajouter un compte
        </Button>
      </Stack>
    </Card>
  );

  const renderFelicitation = (
    <Card
      sx={{
        p: 4,
        boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
      }}
    >
      <Stack alignItems="center" spacing={2}>
        <Iconify color="green" icon="fluent:info-24-regular" />
        <Stack alignItems="center" spacing={1}>
          <Typography variant="h5">Félicitations !</Typography>
          <Typography variant="body1">
            Vous avez un compte fonctionnel sur notre services tiers pour la gestion des paiements
            Stripe.
          </Typography>
        </Stack>
      </Stack>
      <br />
      <CardActions>
        <Button
          size="large"
          type="submit"
          variant="contained"
          color="error"
          onClick={() => setOpenDialogue(true)}
          sx={{
            backgroundColor: '#619FCB',
            borderRadius: 3,
          }}
        >
          Supprimer votre compte stripe
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <>
      {renderConfidential}
      <br />
      {profil && profil.paymentAccount ? <>{renderFelicitation} </> : <> {renderCard} </>}
      <Dialog maxWidth="md" open={openDialogue} onClose={handleOnClose}>
        <DialogTitle> Ajouter une banque </DialogTitle>
        <DialogContent dividers sx={{ overflow: 'unset', pt: 1, pb: 0 }}>
          Souhaitez vous vraiment supprimer votre compte stripe
        </DialogContent>
        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={handleOnClose}>
            ANNULER
          </Button>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            onClick={handleDeleteStripe}
            color="error"
            sx={{
              backgroundColor: '#619FCB',
              borderRadius: 3,
              pl: 2,
              pr: 1.5,
            }}
          >
            SUPPRIMER
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
