import { m } from 'framer-motion';
import { useCallback } from 'react';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputAdornment, MenuItem, Stack } from '@mui/material';
import { varFade, MotionViewport, varHover } from 'src/components/animate';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FormProvider, { RHFSelect, RHFAutocomplete } from 'src/components/hook-form';
import { useDispatch, useSelector } from 'src/redux/store';
import { useSnackbar } from 'src/components/snackbar';
import { LoadingButton } from '@mui/lab';
import Iconify from 'src/components/iconify';
import { DatePicker } from '@mui/x-date-pickers';
import { paths } from 'src/routes/paths';
import { getCitiesAutocompletAction, getSearchResultAction } from 'src/redux/actions/rides-action';
import moment from 'moment';

const PASSENGERS = [
  { value: 1, label: '1 Passager' },
  { value: 2, label: '2 Passagers' },
  { value: 3, label: '3 Passagers' },
];

type Props = {
  formDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse' | null | undefined;
};

type FormValuesProps = {
  start: string;
  end: string;
  startAt: Date | string;
  availablePlaces: number;
};

export default function SearchRideComponent({ formDirection = 'row' }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { cityAutocompletList } = useSelector((state) => state.rides);

  const handleInputChange = async (event: any, value: string) => {
    dispatch(getCitiesAutocompletAction(value));
  };

  const userSchema = Yup.object().shape({
    start: Yup.string().required('ce champs est requis'),
    end: Yup.string().required('ce champs est requis'),
    startAt: Yup.date().required('ce champs du est requis'),
  });

  const defaultValues = {
    start: '',
    end: '',
    startAt: new Date(),
    availablePlaces: 1,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(userSchema),
    defaultValues,
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        const searchData = {
          start: data.start,
          end: data.end,
          startAt: moment(data.startAt).format('YYYY-MM-DD'),
          availablePlaces: data.availablePlaces,
        };
        dispatch(getSearchResultAction(searchData));
        navigate(paths.search.trajets);
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
    [enqueueSnackbar, navigate, dispatch]
  );

  const isDateDisabled = (date: any) => {
    const currentDate = new Date();
    const compare = currentDate.getDate() === date.getDate();

    return date < currentDate && !compare;
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack component={MotionViewport} spacing={{xs: 1, md: 4}} direction={{ xs: 'column', md: formDirection }}>
        <m.div variants={varFade().inUp}>
          <RHFAutocomplete
            name="start"
            onInputChange={handleInputChange}
            onChange={(e, value) => setValue('start', value)}
            style={{ width: formDirection === 'row' ? 250 : '100%' }}
            placeholder="Adresse de départ"
            options={cityAutocompletList.map((city: any) => city.place_name)}
            isOptionEqualToValue={(option, value) => option.type === value.type}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => {
              const { place_name } = cityAutocompletList.filter(
                (city: any) => city.place_name === option
              )[0];

              if (!place_name) {
                return null;
              }
              return (
                <li {...props} key={place_name}>
                  {place_name}
                </li>
              );
            }}
          />
        </m.div>
        <m.div variants={varFade().inUp}>
          <RHFAutocomplete
            name="end"
            onInputChange={handleInputChange}
            onChange={(e, value) => setValue('end', value)}
            style={{ width: formDirection === 'row' ? 250 : '100%' }}
            placeholder="Adresse de d'arriver"
            options={cityAutocompletList.map((city: any) => city.place_name)}
            isOptionEqualToValue={(option, value) => option.type === value.type}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => {
              const { place_name } = cityAutocompletList.filter(
                (city: any) => city.place_name === option
              )[0];

              if (!place_name) {
                return null;
              }
              return (
                <li {...props} key={place_name}>
                  {place_name}
                </li>
              );
            }}
          />
        </m.div>
        <m.div variants={varFade().inUp}>
          <Controller
            name="startAt"
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
                shouldDisableDate={isDateDisabled}
                slots={{
                  openPickerIcon: CalendarTodayOutlinedIcon,
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!error,
                    helperText: error?.message,
                    placeholder: 'Départ le',
                  },
                }}
              />
            )}
          />
        </m.div>
        <m.div variants={varFade().inUp}>
          <RHFSelect
            name="availablePlaces"
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
                background: 'rgb(232, 241, 250)',
                borderRadius: 3,
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
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
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
