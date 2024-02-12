import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'src/routes/hook';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Iconify from 'src/components/iconify';
import { getCities } from 'src/redux/actions/search-action';
import { useDispatch, useSelector } from 'src/redux/store';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Clock } from '@mui/x-date-pickers/TimeClock/Clock';
import { useAuthContext } from 'src/auth/hooks';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import {
  Autocomplete,
  CardHeader,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { TRides } from 'src/types/ride';
import { useSnackbar } from 'src/components/snackbar';
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { getRidePriceAction, postRideAction } from 'src/redux/actions/rides-action';
import { decreasePrice, increasePrice } from 'src/redux/reducer/ride-reducer';
import { varHover } from 'src/components/animate';
import { m } from 'framer-motion';
import moment from 'moment';
import { paths } from 'src/routes/paths';

type FormValuesProps = {
  start: string;
  end: string;
  price: number;
  startDate: string;
  startTime: string;
  startAt: Date;
  type: string;
  placesNumber: number;
};

const types = [
  { value: 'conducteur', label: 'Conducteur(trice)' },
  { value: 'passager', label: 'Passager(ère)' },
];

const PASSENGERS = [
  { value: 1, label: '1 Place' },
  { value: 2, label: '2 Places' },
  { value: 3, label: '3 Places' },
];

export default function NewRideForm() {
  const [activeStep, setActtiveStep] = useState<number>(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const newRideStep = ['type', 'adresse!§', 'dateTime', 'passengerNb', 'price'];
  const completedStep = activeStep === newRideStep.length;
  const { user } = useAuthContext();
  const { searchCityList } = useSelector((state) => state.search);
  const { profil } = useSelector((state) => state.account);
  const { calculatedPrice, newRide } = useSelector((state) => state.rides);
  const { enqueueSnackbar } = useSnackbar();
  const [startCity, setStartCity] = useState('');
  const [endCity, setEndCity] = useState();
  const [givenPrice, setGivenPrice] = useState<number>();

  const handleInputChange = async (event: any, value: string) => {
    dispatch(getCities(value));
  };

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
    start: Yup.string().required('Adresse de départ est obligatoire'),
    end: Yup.string().required('Adresse de arrivée est obligatoire'),
    price: Yup.number().required('Adresse de arrivée est obligatoire'),
    startAt: Yup.date().required('La date de départ est obligatoire'),
    type: Yup.string().required('Le type de trajet est obligatoire'),
    placesNumber: Yup.number().required('le nombre de passager est obligatoire'),
  });

  const actualDate = new Date();
  const startdate = actualDate.toISOString().split('T')[0];
  const starttime = actualDate.toISOString().split('T')[1].slice(0, 5);

  const defaultValues = {
    start: '',
    end: '',
    price: calculatedPrice.recommanded,
    startDate: startdate, // Extracting date part
    startTime: starttime, // Extracting time part, keeping HH:MM format
    type: 'conducteur',
    placesNumber: 1,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { isSubmitting },
  } = methods;

  const handleSetStartCity = useCallback(
    async (_: any, value: any) => {
      if (value) {
        setValue('start', value.place_name);
        setStartCity(value.center);
      } else {
        setValue('start', '');
      }
    },
    [setValue]
  );

  const handleSetEndCity = useCallback(
    async (_: any, value: any) => {
      if (value) {
        setValue('end', value.place_name);
        setEndCity(value.center);
      } else {
        setValue('end', '');
      }
    },
    [setValue]
  );

  const handlePriceChange = (value: any) => {
    setValue('price', calculatedPrice.recommanded);
  };
  const handleButtonClick = (action: any) => {
    if (action === 'increase') {
      dispatch(increasePrice());
    } else if (action === 'decrease') {
      dispatch(decreasePrice());
    }
  };

  useEffect(() => {
    if (endCity && startCity) {
      dispatch(getRidePriceAction(startCity, endCity));
    }
  }, [startCity, endCity, dispatch]);

  const isDateDisabled = (date: any) => {
    const currentDate = new Date();
    const compare = currentDate.getDate() === date.getDate();

    return date < currentDate && !compare;
  };

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        const rideData: TRides = {
          userId: user?.id,
          start: data.start,
          end: data.end,
          price: calculatedPrice.recommanded,
          startAt: moment(data.startAt).format('YYYY-MM-DD hh:mm:ss'),
          type: data.type,
          placesNumber: data.placesNumber,
          availablePlaces: data.placesNumber,
          tripTime: calculatedPrice.time,
          acceptAuctions: true,
          isDetourAllowed: true,
          isMusicAllowed: true,
          isAnimalAllowed: true,
          isFoodAllowed: true,
          isBagAllowed: true,
          isFood: true,
          isBookable: true,
          user: profil,
        };
        dispatch(postRideAction(rideData));
        onNextStep(activeStep);
        reset();
        /* if (newRide) {
        } else {
          enqueueSnackbar('Merci de completer votre profile', { variant: 'error' });
        } */
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
    [user, onNextStep, profil, activeStep, calculatedPrice, dispatch, enqueueSnackbar, reset]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {completedStep ? (
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="h5" sx={{ color: '#663F81', mb: 5 }}>
            Félicitation !
          </Typography>
          Votre annonce a été publiée avec succès
          <Link href={paths.search.trajetsDetails(newRide?.id)} sx={{ mb: 5 }}>
            voir mon annonce
          </Link>
          <Stack direction="column">
            Souhaitez vous publier un trajet retour ?
            <Stack direction="row" spacing={2}>
              <LoadingButton
                size="large"
                fullWidth
                type="submit"
                variant="contained"
                href="/"
                sx={{
                  backgroundColor: '#567286',
                  borderRadius: 4,
                  mt: 5,
                }}
              >
                Non
              </LoadingButton>
              <LoadingButton
                size="large"
                fullWidth
                type="submit"
                variant="contained"
                href="/ride"
                sx={{
                  backgroundColor: '#619FCB',
                  borderRadius: 4,
                  mt: 5,
                }}
              >
                oui
              </LoadingButton>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <>
          {activeStep === 0 && (
            <>
              <Stack alignItems="center" justifyContent="center">
                <CardHeader title="Je suis un(e)" />
              </Stack>
              <Stack mt={5} spacing={2.5}>
                <RHFSelect
                  name="type"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify color="#619FCB" icon="healthicons:truck-driver-outline" />
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
                  {types.map((type, idx) => (
                    <MenuItem key={idx} value={type.value}>
                      {type.label}
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
                    onClick={() => onNextStep(activeStep)}
                    endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                    sx={{
                      backgroundColor: '#619FCB',
                      borderRadius: 4,
                      mt: 5,
                    }}
                  >
                    Suivant
                  </LoadingButton>
                </Stack>
              </Stack>
            </>
          )}
          {activeStep === 1 && (
            <>
              <Stack alignItems="center" justifyContent="center">
                <CardHeader title="Adresse départ / arrivée" />
              </Stack>
              <Stack mt={5} spacing={2.5}>
                <Autocomplete
                  options={searchCityList}
                  getOptionLabel={(city) => city.place_name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: 'transparent' },
                          '&:hover fieldset': { borderColor: 'transparent' },
                          '&.Mui-focused fieldset': { borderColor: 'transparent' },
                          background: 'rgb(232, 241, 250)',
                          borderRadius: 3,
                        },
                      }}
                      placeholder="Adresse départ"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Iconify color="#619FCB" icon="ep:location-filled" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  onChange={handleSetStartCity}
                  onInputChange={handleInputChange}
                  isOptionEqualToValue={(option, value) => option.type === value.type}
                />
                <Autocomplete
                  options={searchCityList}
                  getOptionLabel={(city) => city.place_name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: 'transparent' },
                          '&:hover fieldset': { borderColor: 'transparent' },
                          '&.Mui-focused fieldset': { borderColor: 'transparent' },
                          background: 'rgb(232, 241, 250)',
                          borderRadius: 3,
                        },
                      }}
                      placeholder="Adresse d'arrivée"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Iconify color="#619FCB" icon="ep:location-filled" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  onChange={handleSetEndCity}
                  onInputChange={handleInputChange}
                  isOptionEqualToValue={(option, value) => option.type === value.type}
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
                    onClick={() => onBackStep(activeStep)}
                    startIcon={<Iconify icon="eva:arrow-ios-back-outline" />}
                    sx={{
                      backgroundColor: '#567286',
                      borderRadius: 4,
                      mt: 5,
                    }}
                  >
                    Précédent
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
                    Suivant
                  </LoadingButton>
                </Stack>
              </Stack>
            </>
          )}
          {activeStep === 2 && (
            <>
              <Stack alignItems="center" justifyContent="center">
                <CardHeader title="Date de départ/Heure" />
              </Stack>
              <Stack mt={5} spacing={2.5}>
                {/* Departure Date */}
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      type="date"
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                      label="Date"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                    />
                  )}
                />

                {/* Departure Time */}
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      type="time"
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                      label="Heure et Minute "
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 minutes
                      }}
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
                    onClick={() => onBackStep(activeStep)}
                    startIcon={<Iconify icon="eva:arrow-ios-back-outline" />}
                    sx={{
                      backgroundColor: '#567286',
                      borderRadius: 4,
                      mt: 5,
                    }}
                  >
                    Précédent
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
                    Suivant
                  </LoadingButton>
                </Stack>
              </Stack>
            </>
          )}
          {activeStep === 3 && (
            <>
              <Stack alignItems="center" justifyContent="center">
                <CardHeader title="Nombre de place disponible" />
              </Stack>
              <Stack mt={5} spacing={2.5}>
                <RHFSelect
                  name="placesNumber"
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
                    onClick={() => onBackStep(activeStep)}
                    startIcon={<Iconify icon="eva:arrow-ios-back-outline" />}
                    sx={{
                      backgroundColor: '#567286',
                      borderRadius: 4,
                      mt: 5,
                    }}
                  >
                    Précédent
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
                    Suivant
                  </LoadingButton>
                </Stack>
              </Stack>
            </>
          )}
          {activeStep === 4 && (
            <>
              <Stack alignItems="center" justifyContent="center">
                <CardHeader title="Tarif" />
              </Stack>
              <Stack mt={5} spacing={2.5}>
                <Stack direction="row" spacing={2}>
                  <RHFTextField
                    name="price"
                    type="number"
                    value={calculatedPrice.recommanded.toFixed(2)}
                    // onChange={(e) => handlePriceChange(e.target.value)}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify color="#619FCB" icon="grommet-icons:money" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <IconButton onClick={() => handleButtonClick('decrease')}>
                    <Iconify width={35} color="#619FCB" icon="gala:remove" />
                  </IconButton>
                  <IconButton onClick={() => handleButtonClick('increase')}>
                    <Iconify width={35} color="#619FCB" icon="gala:add" />
                  </IconButton>
                </Stack>
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
                    onClick={() => onBackStep(activeStep)}
                    startIcon={<Iconify icon="eva:arrow-ios-back-outline" />}
                    sx={{
                      backgroundColor: '#567286',
                      borderRadius: 4,
                      mt: 5,
                    }}
                  >
                    Précédent
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
                    // onClick={() => onNextStep(activeStep)}
                    endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                    sx={{
                      backgroundColor: '#619FCB',
                      borderRadius: 4,
                      mt: 5,
                    }}
                  >
                    Publier
                  </LoadingButton>
                </Stack>
              </Stack>
            </>
          )}{' '}
        </>
      )}
    </FormProvider>
  );
}
