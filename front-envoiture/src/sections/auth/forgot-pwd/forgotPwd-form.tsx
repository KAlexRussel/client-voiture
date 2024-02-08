import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSearchParams } from 'src/routes/hook';
import { useAuthContext } from 'src/auth/hooks';
import { useLocales } from 'src/locales';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Box, IconButton, InputAdornment, Link, Stack, Tooltip } from '@mui/material';
import { m } from 'framer-motion';
import { varHover } from 'src/components/animate';
import { useSnackbar } from 'src/components/snackbar';
import ResetPwdForm from './reset-pwd';

type FormValuesProps = {
  email: string;
};

export default function ForgotPwdForm() {
  const [recoveryEmail, setRecovryEmail] = useState<string | null>(null);
  const { forgotPassword } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const FormSchema = Yup.object().shape({
    email: Yup.string().required('Email est requis').email('Email doit être valide'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        await forgotPassword?.(data.email);
        setRecovryEmail(data.email);
        enqueueSnackbar('Un mail vous été transmit !', { variant: 'success' });
        reset();
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
    [forgotPassword, reset, enqueueSnackbar]
  );

  const renderForm = (
    <>
      <Stack spacing={2.5} alignItems="center">
        <RHFTextField
          name="email"
          placeholder="Adresse e-mail"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify color="#619FCB" icon="lucide:mail" />
              </InputAdornment>
            ),
          }}
        />

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
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          sx={{
            backgroundColor: '#619FCB',
            borderRadius: 4,
          }}
        >
          Valider
        </LoadingButton>
      </Stack>
    </>
  );

  return (
    <>
      {recoveryEmail ? (
        <ResetPwdForm recovryEmail={recoveryEmail} resendCode={setRecovryEmail} />
      ) : (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {renderForm}
        </FormProvider>
      )}
    </>
  );
}
