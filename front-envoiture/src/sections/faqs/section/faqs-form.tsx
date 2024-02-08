import { m } from 'framer-motion';
import { useCallback } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Button, TextField, Typography, Card, CardHeader } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { varFade, MotionViewport } from 'src/components/animate';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { LoadingButton } from '@mui/lab';

type FormValuesProps = {
  email: string;
  fullName: string;
  subject: string;
  question: string;
};

export default function FaqsForm() {
  const { enqueueSnackbar } = useSnackbar();
  const userSchema = Yup.object().shape({
    fullName: Yup.string().required('le nom du est requis'),
    email: Yup.string().required('votre email du est requis').email('cette email est incorrecte'),
    question: Yup.string().required('votre question du est requis'),
  });

  const defaultValues = {
    fullName: '',
    email: '',
    subject: '',
    question: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(userSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        console.log('data to be update', data);
        enqueueSnackbar('Votre question a bien été prise en compte !', { variant: 'success' });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Une erreur est survenue !', { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );

  return (
    <Card
      sx={{
        boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
      }}
    >
      <CardHeader title={`Voulez-vous poser d'autres questions ?`} />

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          component={MotionViewport}
          spacing={3}
          sx={{
            p: 3,
          }}
        >
          <m.div variants={varFade().inUp}>
            <RHFTextField fullWidth name='fullName' label="Nom complet" />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField fullWidth name='email' label="Email" />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField fullWidth name='subject' label="Sujet" />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField fullWidth name='question' label="Votre question..." multiline rows={4} />
          </m.div>

          <m.div variants={varFade().inUp}>
            <LoadingButton fullWidth type="submit" variant="contained" loading={isSubmitting} sx={{
              backgroundColor: '#619FCB',
              borderRadius: 3,
              pl: 2,
              pr: 1.5,
            }}>
              Envoyer
            </LoadingButton>
          </m.div>
        </Stack>
      </FormProvider>
    </Card>
  );
}
