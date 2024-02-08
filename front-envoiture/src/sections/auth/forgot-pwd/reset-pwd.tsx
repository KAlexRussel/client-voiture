import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAuthContext } from 'src/auth/hooks';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFCode } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';

type FormValuesProps = {
  otq: string;
  password: string;
  confirmPassword: string;
};
type Props = {
  recovryEmail: string;
  backToLogin?: any;
  resendCode: any;
};

export default function ResetPwdForm({ recovryEmail, backToLogin, resendCode }: Props) {
  const password = useBoolean();
  const { newPassword } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const NewPasswordSchema = Yup.object().shape({
    otq: Yup.string().min(4, 'Code must be at least 4 characters').required('Code is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    otq: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        await newPassword?.(recovryEmail, data.otq, data.password);
        navigate('/');
        enqueueSnackbar('Votre mot de passe a été mis a jour !', { variant: 'success' });
        console.info('DATA', data);
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
    [newPassword, enqueueSnackbar, recovryEmail, navigate]
  );

  const renderForm = (
    <Stack spacing={1} alignItems="center">
      <RHFCode
        name="otq"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& > fieldset': { borderColor: (theme) => theme.palette.grey[500] },
          },
        }}
      />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <RHFTextField
        name="confirmPassword"
        label="Confirm New Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Reinitialiser
      </LoadingButton>

      <Typography variant="body2">
        {`Vous n'avez pas reçu de code? `}
        <Link
          variant="subtitle2"
          onClick={() => resendCode(null)}
          sx={{
            cursor: 'pointer',
          }}
        >
          Renvoyer
        </Link>
      </Typography>

      <Link
        component={RouterLink}
        onClick={() => backToLogin(false)}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {renderForm}
    </FormProvider>
  );
}
