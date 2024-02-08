import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Card, Stack, Typography, ListItemText, InputAdornment, MenuItem } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider, {
  RHFTextField,
  RHFRadioGroup,
  RHFSelect,
} from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import Iconify from 'src/components/iconify/iconify';
import { useDispatch, useSelector } from 'src/redux/store';
import { CniPermisForm } from 'src/sections/user-account/component';
import moment from 'moment';
import {
  updateAccountProfilAction,
} from 'src/redux/actions/account-action';
import { m } from 'framer-motion';
import { varHover } from 'src/components/animate';

type FormValuesProps = {
  fname: string;
  lname: string;
  birthDate: Date;
  phoneNumber: string;
  sex: string;
  isAcceptedAutomatically: boolean;
  isDetourPossible: boolean;
};

const types = [
  { value: 'm', label: 'Homme' },
  { value: 'f', label: 'Femme' },
];

export default function RenderUserEdit() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { profil } = useSelector((state) => state.account);

  const defaultValues = {
    fname: profil.fname,
    lname: profil.lname,
    birthDate: new Date(profil.birthDate),
    phoneNumber: profil.phoneNumber,
    sex: profil.sex,
    isAcceptedAutomatically: profil.isAcceptedAutomatically,
    isDetourPossible: profil.isDetourPossible,
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        const datas = {
          fname: data.fname,
          lname: data.lname,
          birthDate: moment(data.birthDate).format('YYYY-MM-DD'),
          phoneNumber: data.phoneNumber,
          sex: data.sex,
          isAcceptedAutomatically: data.isAcceptedAutomatically,
          isDetourPossible: data.isDetourPossible,
        };
        // console.log('sdfsd', data.isDetourPossible, datas.isDetourPossible)
        dispatch(updateAccountProfilAction(profil.id, datas));
        enqueueSnackbar('le profile a été mis a jour !', { variant: 'success' });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Une erreur est survenue !', { variant: 'error' });
      }
    },
    [enqueueSnackbar, dispatch, profil]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card
          sx={{
            p: 2.8,
            boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
          }}
        >
          <Stack alignItems="left">
            <Typography variant="h5"> Informations Personelles</Typography>
          </Stack>
          <br />
          <Stack spacing={3}>
            <RHFTextField name="fname" label="Prénom" />
            <RHFTextField name="lname" label="Nom" />
            <RHFTextField name="phoneNumber" label="Téléphone" />
            <Controller
              name="birthDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  defaultValue={profil.birthDate}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'transparent' },
                      '&:hover fieldset': { borderColor: 'transparent' },
                      '&.Mui-focused fieldset': { borderColor: 'transparent' },
                      background: 'rgb(232, 241, 250)',
                      borderRadius: 3,
                      flexDirection: 'row-reverse',
                    },
                    '& .MuiSvgIcon-root': { color: '#619FCB' },
                  }}
                  format="dd/MM/yyyy"
                  slots={{
                    openPickerIcon: CalendarTodayOutlinedIcon,
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                      label: 'Né(e) le',
                    },
                  }}
                />
              )}
            />
            <RHFSelect
              name="sex"
              label="Sexe"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify color="#619FCB" icon="healthicons:truck-driver-outline" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'transparent' },
                  '&:hover fieldset': { borderColor: 'transparent' },
                  '&.Mui-focused fieldset': { borderColor: 'transparent' },
                  background: 'rgb(232, 241, 250)',
                  borderRadius: 3,
                },
              }}
            >
              {types.map((type, idx) => (
                <MenuItem key={idx} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>
          <br />
          <Stack alignItems="left">
            <Typography variant="h5"> Autres informations</Typography>
          </Stack>
          <br />
          <Stack direction="row" spacing={10}>
            <Stack direction="row">
              <Iconify icon="typcn:flash-outline" width={35} />
              <ListItemText
                primary="Acceptations"
                secondary="Toutes les reservations sont acceptées de façon : "
                primaryTypographyProps={{
                  typography: 'body1',
                }}
                secondaryTypographyProps={{
                  mt: 0.5,
                  color: 'inherit',
                  component: 'span',
                  typography: 'body2',
                }}
              />
            </Stack>
            <Stack>
              <RHFRadioGroup
                row
                name="isAcceptedAutomatically"
                options={[
                  { label: 'Automatiques', value: true },
                  { label: 'Manuelles', value: false },
                ]}
              />
            </Stack>
          </Stack>
          <br />
          <Stack direction="row" spacing={10}>
            <Stack direction="row">
              <Iconify icon="tabler:repeat" width={35} />
              <ListItemText
                primary="Detours possibles"
                secondary="En tant que conducteur, je peux faire un détour pour prendre ou deposer une personne : "
                primaryTypographyProps={{
                  typography: 'body1',
                }}
                secondaryTypographyProps={{
                  mt: 0.5,
                  color: 'inherit',
                  component: 'span',
                  typography: 'body2',
                }}
              />
            </Stack>
            <Stack>
              <RHFRadioGroup
                row
                name="isDetourPossible"
                options={[
                  { label: 'Oui', value: true },
                  { label: 'Non', value: false },
                ]}
              />
            </Stack>
          </Stack>
          <Stack alignItems="right" sx={{ p: 3 }}>
            <LoadingButton
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
                backgroundColor: '#619FCB',
                borderRadius: 3,
                pl: 2,
                pr: 1.5,
              }}
            >
              ENREGISTRER
            </LoadingButton>
          </Stack>
        </Card>
      </FormProvider>
      <br />
      <CniPermisForm />
    </>
  );
}
