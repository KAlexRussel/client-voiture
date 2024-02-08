import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSearchParams, useRouter } from 'src/routes/hook';
import { useAuthContext } from 'src/auth/hooks';
import { useLocation } from 'react-router';
import { useLocales } from 'src/locales';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Box, IconButton, InputAdornment, Link, Stack, Tooltip } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useSnackbar } from 'src/components/snackbar';
import { varHover } from 'src/components/animate';
import { m } from 'framer-motion';

type FormValuesProps = {
  email: string;
  password: string;
};

type props = {
  forgotPassword: any;
};

export default function LoginForm({ forgotPassword }: props) {
  const location = useLocation();
  const router = useRouter();
  const { login } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
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
        await login?.(data.email, data.password);
        enqueueSnackbar('Bienvenue sur Envoitures !', { variant: 'success' });
        reset();
        router.replace(location.pathname);
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
    [login, reset, router, location, enqueueSnackbar]
  );

  const socialConnexion = [
    {
      label: 'Se connecter avec Google',
      path: '#',
      icon: 'devicon:google',
    },
    {
      label: 'Se connecter avec Facebook',
      path: '#',
      icon: 'logos:facebook',
    },
  ];

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

        <RHFTextField
          name="password"
          placeholder="mot de passe"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify color="#619FCB" icon="teenyicons:lock-outline" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify
                    color="#619FCB"
                    icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Link
          onClick={() => forgotPassword()}
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >
          mot de passe oublié ?
        </Link>

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
          Se connecter
        </LoadingButton>
        <Stack direction="row" spacing={2}>
          {socialConnexion.map((option, idx) => (
            <IconButton
              key={idx}
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.15)}
            >
              <Tooltip key={option.label} title={option.label}>
                <Link component={RouterLink} href={option.path}>
                  <Iconify
                    sx={{ width: 30, height: 30, alignItems: 'right', alignSelf: 'flex-end' }}
                    icon={option.icon}
                  />
                </Link>
              </Tooltip>
            </IconButton>
          ))}
        </Stack>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {renderForm}
    </FormProvider>
  );
}
