import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { varHover } from 'src/components/animate';
import { m } from 'framer-motion';
import { useDispatch } from 'src/redux/store';
import { useSnackbar } from 'src/components/snackbar';
import { useCallback } from 'react';
import { paths } from 'src/routes/paths';
import { useNavigate } from 'react-router-dom';
import { deleteRideByIdAction } from 'src/redux/actions/rides-action';
import { useParams } from 'src/routes/hook';

interface Props extends DialogProps {
  onClose: any;
  open: boolean;
}

export default function CancelRideDialog({ open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const onSubmit = useCallback(async () => {
    try {
      dispatch(deleteRideByIdAction(Number(params.id)));
      navigate(paths.search.root);
      enqueueSnackbar('le trajet a été supprimé avec success !', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  }, [enqueueSnackbar, navigate, dispatch, params]);

  return (
    <Dialog maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle> Annulation de trajet </DialogTitle>
      <DialogContent sx={{ overflow: 'unset' }}>
        <Typography variant="h5">Êtes-vous certain de vouloir annuler ce trajet ?</Typography>
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
          non
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
          onClick={onSubmit}
          sx={{
            backgroundColor: 'red',
            borderRadius: 4,
          }}
        >
          Oui
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
