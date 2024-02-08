import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Card,
  Stack,
  Typography,
  Dialog,
  DialogContent,
  Box,
  Button,
  DialogActions,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { varHover } from 'src/components/animate';
import { m } from 'framer-motion';
import FormProvider, { RHFTextField, RHFUpload, RHFCheckbox } from 'src/components/hook-form';
import { useDispatch, useSelector } from 'src/redux/store';
import { useSnackbar } from 'src/components/snackbar';
import Image from 'src/components/image';
import Block from 'src/components/block/block';
import { LoadingButton } from '@mui/lab';
import { addUserVehicleAction, updateUserVehicleAction } from 'src/redux/actions/account-action';
import { TVehicle } from 'src/types/account';

type FormValuesProps = {
  designation: string;
  imageName: string | null;
  isMusicAllowed: boolean;
  isAnimalAllowed: boolean;
  isBagAllowed: boolean;
  isFoodAllowed: boolean;
};

export default function RenderCarInfo() {
  const { enqueueSnackbar } = useSnackbar();
  const [openDialogue, setOpenDialogue] = useState(false);
  const { profil } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const userSchema = Yup.object().shape({
    designation: Yup.string().required('le nom du véhicule est requis'),
  });

  const defaultValues = {
    designation: profil.vehicle?.designation ?? 'CITROËN C4',
    imageName: profil.vehicle?.imageName ?? '',
    isMusicAllowed: profil.vehicle?.isMusicAllowed ?? false,
    isAnimalAllowed: profil.vehicle?.isAnimalAllowed ?? true,
    isBagAllowed: profil.vehicle?.isBagAllowed ?? false,
    isFoodAllowed: profil.vehicle?.isFoodAllowed ?? false,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(userSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        const updateData: TVehicle = {
          userId: profil.id,
          designation: data.designation,
          description: 'envoiture',
          imageName: data.imageName?.substring(22),
          isMusicAllowed: data.isMusicAllowed,
          isAnimalAllowed: data.isAnimalAllowed,
          isBagAllowed: data.isBagAllowed,
          isFoodAllowed: data.isFoodAllowed,
        };
        if (profil.vehicle?.id) {
          dispatch(updateUserVehicleAction(profil.vehicle.id, updateData));
          enqueueSnackbar('les informations du véhicule ont mis a jour !', { variant: 'success' });
        } else {
          dispatch(addUserVehicleAction(updateData));
          enqueueSnackbar('les informations du véhicule ont ajouté !', { variant: 'success' });
        }
        setOpenDialogue(false)
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
    [enqueueSnackbar, profil, dispatch]
  );

  const handleDropCarImg = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setValue('imageName', base64String, { shouldValidate: true });
      };
      reader.readAsDataURL(newFile);
    },
    [setValue]
  );

  return (
    <>
      <Card
        sx={{
          p: 2.8,
          boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
        }}
      >
        <Stack alignItems="left">
          <Typography variant="h5">Mon véhicule</Typography>
        </Stack>
        <br />
        <Stack spacing={1} alignItems="center" justifyContent="center" flexWrap="wrap">
          <Image
            alt="carImg"
            src={profil.vehicle?.imageName ?? '/assets/images/22.png'}
            sx={{
              borderRadius: 2,
              my: { xs: 5, md: 10 },
            }}
          />
          {!profil.vehicle?.imageName && (
            <Typography variant="body1">Aucun véhicule enregistré.</Typography>
          )}

          <Stack alignItems="right">
            <LoadingButton
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              size="large"
              type="submit"
              variant="contained"
              onClick={() => setOpenDialogue(true)}
              sx={{
                backgroundColor: '#619FCB',
                borderRadius: 3,
                pl: 2,
                pr: 1.5,
              }}
            >
              JE RENSEIGNE MON VEHICULE
            </LoadingButton>
            <br />
          </Stack>
        </Stack>
      </Card>
      <Dialog maxWidth="lg" open={openDialogue} onClose={() => setOpenDialogue(false)}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
            <Stack alignItems="center" spacing={1} sx={{ my: 2 }}>
              <Typography variant="h3">Ajouter un véhicule</Typography>
            </Stack>
            <Stack spacing={3}>
              <RHFTextField name="designation" label="Désignation" />
              <Block label="Photo du vehicule">
                <Stack>
                  <RHFUpload
                    name="imageName"
                    imsrc={profil.vehicle?.imageName}
                    maxSize={3145728}
                    onDrop={handleDropCarImg}
                    onDelete={() => setValue('imageName', null, { shouldValidate: true })}
                  />
                </Stack>
              </Block>
              <Stack alignItems="left" spacing={1} sx={{ my: 2 }}>
                <Typography sx={{ fontWeight: 'bold' }} variant="body1">
                  Autorisations
                </Typography>
                <Box
                  rowGap={0}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    marginBottom: 20,
                  }}
                >
                  <RHFCheckbox name="isMusicAllowed" label="Musique autorisée 🎶" />
                  <RHFCheckbox name="isAnimalAllowed" label="Animaux autorisés 🐶" />
                  <RHFCheckbox name="isBagAllowed" label="Gros bagages 🧳" />
                  <RHFCheckbox name="isFoodAllowed" label="Repas autorisés 🍔" />
                </Box>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              variant="outlined"
              color="inherit"
              onClick={() => setOpenDialogue(false)}
            >
              ANNULER
            </Button>

            <LoadingButton
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              ENREGISTRER
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
