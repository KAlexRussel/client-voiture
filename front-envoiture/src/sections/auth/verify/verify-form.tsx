import * as Yup from 'yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router';
import { useRouter } from 'src/routes/hook';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFCode, RHFTextField } from 'src/components/hook-form';

type FormValuesProps = {
  otp: string;
  email: string;
};

export default function VerifyForm() {
  const location = useLocation();
  const router = useRouter();
  const { verifyCode } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const VerifySchema = Yup.object().shape({
    otp: Yup.string().min(4, 'le code doit contenir 4 caractères').required('Code is required'),
    email: Yup.string().required('Email est obligatoire').email('Email doit être valide'),
  });

  const defaultValues = {
    otp: '',
    email: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        await verifyCode?.(data.email, data.otp);
        enqueueSnackbar('Bienvenue sur Envoitures !', { variant: 'success' });
        router.replace(location.pathname);
        reset();
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
    [enqueueSnackbar, router, location, verifyCode, reset]
  );

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField
        name="email"
        placeholder="example@gmail.com"
        InputLabelProps={{ shrink: true }}
      />

      <RHFCode name="otp" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{
          backgroundColor: '#619FCB',
          borderRadius: 4,
        }}
      >
        Verify
      </LoadingButton>
    </Stack>
  );

  const renderHead = (
    <>
      <Stack spacing={1} sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Un code a 4 chiffres vous a été transmis. Veuillez entrer ce code dans le champ ci-dessous
          afin de finaliser votre inscription
        </Typography>
      </Stack>
    </>
  );
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
