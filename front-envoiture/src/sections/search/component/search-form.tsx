import { m } from 'framer-motion';
import { useCallback } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputAdornment, MenuItem, Stack } from '@mui/material';
import { varFade, MotionViewport } from 'src/components/animate';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useDispatch, useSelector } from 'src/redux/store';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { LoadingButton } from '@mui/lab';
import Iconify from 'src/components/iconify';
import { DatePicker } from '@mui/x-date-pickers';
import { getSearchItem, getSearchTrajets } from 'src/redux/actions/search-action';
import { useLocation } from 'react-router';
import { getSearchItems } from 'src/redux/reducer/search-reducer';
import { TSearch } from 'src/types/search';
import { fDate } from 'src/utils/format-time';

const PASSENGERS = [
  { value: 1, label: '1 Passenger' },
  { value: 2, label: '2 Passengers' },
  { value: 3, label: '3 Passengers' },
];

export default function SearchFormView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchItems } = useSelector((state) => state.search);

  const userSchema = Yup.object().shape({
    from: Yup.string().required('ce champs est requis'),
    to: Yup.string().required('ce champs est requis'),
    date: Yup.date().required('ce champs du est requis'),
    nbPassenger: Yup.number().required('ce champs est requis'),
  });

  const defaultValues = {
    from: searchItems.from ?? '',
    to: searchItems.to ?? '',
    date: null,
    nbPassenger: searchItems.nbPassenger ?? 1,
  };

  const methods = useForm<TSearch>({
    resolver: yupResolver(userSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: TSearch) => {
      try {
        dispatch(getSearchTrajets(data));
        dispatch(getSearchItem(data));
        if (location.pathname !== paths.search.trajets) {
          navigate(paths.search.trajets);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, navigate, location]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack component={MotionViewport} spacing={5} direction={{ xs: 'column', sm: 'row' }}>
        <m.div variants={varFade().inUp}>
          <RHFTextField
            name="from"
            placeholder="Adresse de départ"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify color="#619FCB" icon="ep:location-filled" />
                </InputAdornment>
              ),
            }}
          />
        </m.div>
        <m.div variants={varFade().inUp}>
          <RHFTextField
            name="to"
            placeholder="Adresse de d'arriver"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify color="#619FCB" icon="ep:location-filled" />
                </InputAdornment>
              ),
            }}
          />
        </m.div>
        <m.div variants={varFade().inUp}>
          <Controller
            name="date"
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
                    placeholder: 'Start date',
                  },
                }}
              />
            )}
          />
        </m.div>
        <m.div variants={varFade().inUp}>
          <RHFSelect
            name="nbPassenger"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify color="#619FCB" icon="line-md:account" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: 'transparent' },
              },
            }}
          >
            {PASSENGERS.map((passenger, idx) => (
              <MenuItem key={idx} value={passenger.value}>
                {passenger.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Stack alignItems="center">
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
                backgroundColor: '#619FCB',
                borderRadius: 3,
                justifyContent: 'space-between',
                pl: 2,
                pr: 1.5,
              }}
            >
              Rechercher
            </LoadingButton>
          </Stack>
        </m.div>
      </Stack>
    </FormProvider>
  );
}
