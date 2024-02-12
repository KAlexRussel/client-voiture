import * as Yup from 'yup';
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { useLocales } from 'src/locales';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useAuthContext } from 'src/auth/hooks';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { IconButton, InputAdornment, MenuItem, Stack } from '@mui/material';
import { useSnackbar } from 'src/components/snackbar';
import { DatePicker } from '@mui/x-date-pickers';
import { m } from 'framer-motion';
import { varHover } from 'src/components/animate';
import moment from 'moment';
import VerifyForm from '../verify/verify-form';

type FormValuesProps = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: Date;
  phoneNumber: string;
  sex: string;
};

const sexe = [
  { value: 'm', label: 'Homme' },
  { value: 'f', label: 'Femme' },
];

export default function RegisterForm() {
  const { register } = useAuthContext();
  const password = useBoolean();
  const [activeStep, setActtiveStep] = useState<number>(0);
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const registerStep = ['email', 'name', 'sex', 'birthdate', 'phone', 'password'];
  const completedStep = activeStep === registerStep.length - 1;

  const onNextStep = useCallback((s: number) => {
    let Step = s;
    Step += 1;
    setActtiveStep(Step);
  }, []);

  const onBackStep = useCallback((s: number) => {
    let Step = s;
    Step -= 1;
    setActtiveStep(Step);
  }, []);

  const RegisterSchema = Yup.object().shape({
    fname: Yup.string().required('Le prénom est obligatoire'),
    lname: Yup.string().required('Le nom est obligatoire'),
    birthDate: Yup.date().required('La date de naissance est obligatoire'),
    phoneNumber: Yup.string().required('Le tel est obligatoire'),
    sex: Yup.string().required('Le sexe est obligatoire'),
    email: Yup.string().required('Email est obligatoire').email('Email doit être valide'),
    password: Yup.string()
      .required('le mot de passe est obligatoire')
      .min(8, 'Minimum 8 caractère'),
    confirmPassword: Yup.string()
      .required('Veillez confirmer votre mot de passe')
      .oneOf([Yup.ref('password')], 'Les mots de passe ne sont pas identique'),
  });

  const defaultValues = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: new Date('13/03/2023'),
    phoneNumber: '',
    sex: 'm',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        await register?.(
          data.email,
          data.password,
          data.fname,
          data.lname,
          moment(data.birthDate).format('YYYY-MM-DD'),
          data.phoneNumber,
          data.sex,
          data.confirmPassword
        );
        onNextStep(activeStep);
        reset();
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
    [register, reset, onNextStep, activeStep, enqueueSnackbar]
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {activeStep === 0 && (
        <Stack mt={5} spacing={2}>
          Votre adresse e-mail:
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
            // loading={isSubmitting}
            onClick={() => onNextStep(activeStep)}
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            sx={{
              backgroundColor: '#619FCB',
              borderRadius: 4,
              mt: 5,
            }}
          >
            Je continue
          </LoadingButton>
        </Stack>
      )}
      {activeStep === 1 && (
        <Stack mt={5} spacing={2.5}>
          Votre nom et prénom:
          <RHFTextField
            name="fname"
            placeholder="Prénom"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify color="#619FCB" icon="ph:user-thin" />
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="lname"
            placeholder="Nom"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify color="#619FCB" icon="ph:user-thin" />
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row" spacing={2}>
            <LoadingButton
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              size="large"
              fullWidth
              type="submit"
              variant="contained"
              // loading={isSubmitting}
              onClick={() => onBackStep(activeStep)}
              startIcon={<Iconify icon="eva:arrow-ios-back-outline" />}
              sx={{
                backgroundColor: '#619FCB',
                borderRadius: 4,
                mt: 5,
              }}
            >
              retour
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
              // loading={isSubmitting}
              onClick={() => onNextStep(activeStep)}
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
              sx={{
                backgroundColor: '#619FCB',
                borderRadius: 4,
                mt: 5,
              }}
            >
              Je continue
            </LoadingButton>
          </Stack>
        </Stack>
      )}
      {activeStep === 2 && (
        <Stack mt={5} spacing={2.5}>
          Je suis un(e)
          <RHFSelect
            name="sex"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify color="#619FCB" icon="healthicons:sexual-reproductive-health-outline" />
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
            {sexe.map((gender, idx) => (
              <MenuItem key={idx} value={gender.value}>
                {gender.label}
              </MenuItem>
            ))}
          </RHFSelect>
          <Stack direction="row" spacing={2}>
            <LoadingButton
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              size="large"
              fullWidth
              type="submit"
              variant="contained"
              // loading={isSubmitting}
              onClick={() => onBackStep(activeStep)}
              startIcon={<Iconify icon="eva:arrow-ios-back-outline" />}
              sx={{
                backgroundColor: '#619FCB',
                borderRadius: 4,
                mt: 5,
              }}
            >
              retour
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
              // loading={isSubmitting}
              onClick={() => onNextStep(activeStep)}
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
              sx={{
                backgroundColor: '#619FCB',
                borderRadius: 4,
                mt: 5,
              }}
            >
              Je continue
            </LoadingButton>
          </Stack>
        </Stack>
      )}
      {activeStep === 3 && (
        <Stack mt={5} spacing={2.5}>
          Ma date de naissance:
          <Controller
            name="birthDate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                {...field}
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
                format="dd/MM/yyyy"
                slots={{
                  openPickerIcon: CalendarTodayOutlinedIcon,
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!error,
                    helperText: error?.message,
                    placeholder: 'Birth date',
                  },
                }}
              />
            )}
          />
          <Stack direction="row" spacing={2}>
            <LoadingButton
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              size="large"
              fullWidth
              type="submit"
              variant="contained"
              // loading={isSubmitting}
              onClick={() => onBackStep(activeStep)}
              startIcon={<Iconify icon="eva:arrow-ios-back-outline" />}
              sx={{
                backgroundColor: '#619FCB',
                borderRadius: 4,
                mt: 5,
              }}
            >
              retour
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
              // loading={isSubmitting}
              onClick={() => onNextStep(activeStep)}
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
              sx={{
                backgroundColor: '#619FCB',
                borderRadius: 4,
                mt: 5,
              }}
            >
              Je continue
            </LoadingButton>
          </Stack>
        </Stack>
      )}
      {activeStep === 4 && (
        <Stack mt={5} spacing={2.5}>
          Mon numero de telephone:
          <RHFTextField
            name="phoneNumber"
            placeholder="Mon numéro de téléphone"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify color="#619FCB" icon="iconoir:phone" />
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row" spacing={2}>
            <LoadingButton
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              size="large"
              fullWidth
              type="submit"
              variant="contained"
              // loading={isSubmitting}
              onClick={() => onBackStep(activeStep)}
              startIcon={<Iconify icon="eva:arrow-ios-back-outline" />}
              sx={{
                backgroundColor: '#619FCB',
                borderRadius: 4,
                mt: 5,
              }}
            >
              retour
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
              // loading={isSubmitting}
              onClick={() => onNextStep(activeStep)}
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
              sx={{
                backgroundColor: '#619FCB',
                borderRadius: 4,
                mt: 5,
              }}
            >
              Je continue
            </LoadingButton>
          </Stack>
        </Stack>
      )}
      {activeStep === 5 && (
        <Stack mt={5} spacing={2.5}>
          Mot de passe:
          <RHFTextField
            name="password"
            type={password.value ? 'text' : 'password'}
            placeholder="Choisir un mot de passe"
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
            type={password.value ? 'text' : 'password'}
            placeholder="Confirmer votre mot de passe"
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
          <Stack direction="row" spacing={2}>
            <LoadingButton
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              size="large"
              fullWidth
              type="submit"
              variant="contained"
              // loading={isSubmitting}
              onClick={() => onBackStep(activeStep)}
              startIcon={<Iconify icon="eva:arrow-ios-back-outline" />}
              sx={{
                backgroundColor: '#619FCB',
                borderRadius: 4,
                mt: 5,
              }}
            >
              retour
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
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
              sx={{
                backgroundColor: '#619FCB',
                borderRadius: 4,
                mt: 5,
              }}
            >
              S&apos;enregistrer
            </LoadingButton>
          </Stack>
        </Stack>
      )}
    </FormProvider>
  );

  return <>{completedStep ? <VerifyForm /> : <>{renderForm}</>}</>;
}
