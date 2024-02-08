import * as Yup from 'yup';
import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'src/redux/store';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormHelperText,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useAuthContext } from 'src/auth/hooks';
import { addNewReviewAction } from 'src/redux/actions/review-action';

type FormValuesProps = {
  rate: number | null;
  comment: string;
};

interface Props extends DialogProps {
  onClose: VoidFunction;
  rideId?: number;
}

export default function AddReviewForm({ onClose, rideId, ...other }: Props) {
  const { user } = useAuthContext();
  const dispatch = useDispatch()

  const ReviewSchema = Yup.object().shape({
    rate: Yup.number().required('Une note est obligatoire'),
  });

  const defaultValues = {
    rate: null,
    comment: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ReviewSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        const newReview = {
          userId: user?.id,
          rideId,
          isPrivate: false,
          rate: data.rate,
          comment: data.comment
        }
        dispatch(addNewReviewAction(newReview))
        reset();
        onClose();
        console.info('DATA', data);
      } catch (error) {
        console.error(error.message);
      }
    },
    [onClose, reset, dispatch, rideId, user]
  );

  const onCancel = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  return (
    <Dialog onClose={onClose} {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle> Ajouter un avis </DialogTitle>
        <DialogContent>
          <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1.5}>
            <Typography variant="body2">Noter cette usager :</Typography>
            <Controller
              name="rate"
              control={control}
              render={({ field }) => <Rating {...field} size="small" value={Number(field.value)} />}
            />
          </Stack>
          {!!errors.rate && <FormHelperText error> {errors.rate?.message}</FormHelperText>}

          <RHFTextField name="comment" label="Commentaire *" multiline rows={3} sx={{ mt: 3 }} />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onCancel}>
            annuler
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Commenter
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
