import * as Yup from 'yup';
import { useCallback} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Stack,
  Dialog,
  DialogProps,
  DialogTitle,
  DialogContent,
  InputAdornment,
  DialogActions,
} from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';

type FormValuesProps = {
  bankName: string;
  rib: string;
  name: string;
};

interface Props extends DialogProps {
  onClose: any;
  open: boolean;
}

export default function PaymentNewCardDialog({ open, onClose, ...other }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const userSchema = Yup.object().shape({
    name: Yup.string().required('le nom est requis'),
    rib: Yup.string().required('le RIB est requis'),
    bankName: Yup.string().required('le nom de la banque est requis'),
  });

  const defaultValues = {
    name: '',
    rib: '',
    bankName: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(userSchema),
    defaultValues,
  });

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        console.log('data save', data);
        enqueueSnackbar('le rib a été mis a jour !', { variant: 'success' });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Une erreur est survenue !', { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose} {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle> Ajouter une banque </DialogTitle>
        <DialogContent dividers sx={{ overflow: 'unset', pt: 1, pb: 0 }}>
          <Stack spacing={2.5}>
            <RHFTextField
              name="bankName"
              label="Nom de la banque"
              placeholder="Ex: Caisse d’épargne"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify color="#619FCB" icon="basil:bank-outline" />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="rib"
              label="IBAN"
              placeholder="FR00 0000 0000 0000 0000 0000 000 45678912345"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify color="#619FCB" icon="basil:bank-outline" />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="name"
              label="Nom et prénom"
              placeholder="Dark Vador"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify color="#619FCB" icon="ep:user" />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            ANNULER
          </Button>
          <LoadingButton
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
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
