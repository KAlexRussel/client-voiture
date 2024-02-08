import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  ListItemText,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { varHover } from 'src/components/animate';
import { m } from 'framer-motion';
import { useSnackbar } from 'src/components/snackbar';
import { useTheme, alpha } from '@mui/material/styles';
import { AvatarShape } from 'src/assets/illustrations';
import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

interface Props extends DialogProps {
  onClose: any;
  open: boolean;
}

type FormValuesProps = {
  cartnumber: number;
  expDate: Date;
  cartCvc: number;
  name: string;
};

export default function RidePaymentDialog({ open, onClose }: Props) {
  const popover = usePopover();
  const { enqueueSnackbar } = useSnackbar();

  const RegisterSchema = Yup.object().shape({
    cartnumber: Yup.number().required('Ce champs est obligatoire').min(16, 'Minimum 16 caractère'),
    expDate: Yup.date().required('Ce champs est obligatoire'),
    cartCvc: Yup.number().required('Ce champs est obligatoire'),
    name: Yup.string().required('Ce champs est obligatoire'),
  });

  const defaultValues = {
    cartnumber: 1234567891234567,
    expDate: new Date(),
    cartCvc: 123,
    name: 'John Jones',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        console.log('sfd', data);
      } catch (error) {
        console.error(error);
        enqueueSnackbar('le payement a été refusé !', { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );

  return (
    <>
      <Dialog maxWidth="sm" open={open} onClose={onClose}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle> Renseignez vos coordonnées bancaire </DialogTitle>
          <DialogContent sx={{ overflow: 'unset' }}>
            <Stack spacing={2.5}>
              <RHFTextField
                autoFocus
                name="cartnumber"
                label="Numéro de carte"
                placeholder="XXXX XXXX XXXX XXXX"
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                label="Card Holder"
                name="name"
                placeholder="JOHN DOE"
                InputLabelProps={{ shrink: true }}
              />

              <Stack spacing={2} direction="row">
                <Controller
                  name="expDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DateTimePicker
                      {...field}
                      views={['year', 'month']}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: 'transparent' },
                          '&:hover fieldset': { borderColor: 'transparent' },
                          '&.Mui-focused fieldset': { borderColor: 'transparent' },
                          background: 'rgb(232, 241, 250)',
                          flexDirection: 'row-reverse',
                          borderRadius: 3,
                        },
                        '& .MuiSvgIcon-root': { color: '#619FCB' },
                      }}
                      format="MM/yy"
                      slots={{
                        openPickerIcon: CalendarTodayOutlinedIcon,
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                          placeholder: 'MM/YY',
                        },
                      }}
                    />
                  )}
                />
                <RHFTextField
                  label="CVV/CVC"
                  name="cartCvc"
                  placeholder="***"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" edge="end" onClick={popover.onOpen}>
                          <Iconify icon="eva:info-outline" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ typography: 'caption', color: 'text.disabled' }}
              >
                <Iconify icon="carbon:locked" sx={{ mr: 0.5 }} />
                Faites votre transaction en toutes sécurité
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              size="large"
              fullWidth
              type="submit"
              color="inherit"
              variant="outlined"
              onClick={onClose}
              sx={{
                borderRadius: 4,
              }}
            >
              Annuler
            </LoadingButton>
            <LoadingButton
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              size="large"
              fullWidth
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
                backgroundColor: '#619FCB',
                borderRadius: 4,
              }}
            >
              Payer
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="bottom-center"
        sx={{ maxWidth: 200, typography: 'body2', textAlign: 'center' }}
      >
        Les trois derniers chiffres de votre carte bancaire
      </CustomPopover>
    </>
  );
}
