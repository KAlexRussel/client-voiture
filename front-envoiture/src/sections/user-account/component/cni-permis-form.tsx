import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, Stack, Typography,Tabs, tabsClasses, Tab } from '@mui/material';
import { alpha } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider, { RHFUpload } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import Iconify from 'src/components/iconify/iconify';
import Block from 'src/components/block/block';
import { useDispatch, useSelector } from 'src/redux/store';
import { addUserDocumentsAction } from 'src/redux/actions/account-action';
import { varHover } from 'src/components/animate';
import { m } from 'framer-motion';

type FormValuesProps = {
  licenseImageRecto: string | null;
  licenseImageVerso: string | null;
  idCardImageRecto: string | null;
  idCardImageVerso: string | null;
};

const TABS = [
  {
    value: 'cni',
    label: 'Carte d’identité',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'permis',
    label: 'Permis de conduire',
    icon: <Iconify icon="icon-park-outline:permissions" width={24} />,
  },
];

export default function CniPermisForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { profil } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState('cni');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const defaultValues = {
    licenseImageRecto: '',
    licenseImageVerso: '',
    idCardImageRecto: '',
    idCardImageVerso: '',
  };

  const methods = useForm<FormValuesProps>({
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
    async (data: any) => {
      try {
        const datas = {
          idCardImageRecto: data.idCardImageRecto.substring(22),
          idCardImageVerso: data.idCardImageVerso.substring(22),
          licenseImageRecto: data.licenseImageRecto.substring(22),
          licenseImageVerso: data.licenseImageVerso.substring(22),
        };
        dispatch(addUserDocumentsAction(profil?.id, datas));
        enqueueSnackbar('les doc ont été mis a jour !', { variant: 'success' });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Une erreur est survenue !', { variant: 'error' });
      }
    },
    [enqueueSnackbar, dispatch, profil]
  );

  const handleDropCniFile = useCallback(
    (acceptedFiles: File[], type: string) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      const reader = new FileReader();

      if (newFile && type === 'recto') {
        reader.onload = () => {
          const base64String = reader.result as string;
          setValue('idCardImageRecto', base64String, { shouldValidate: true });
        };
        reader.readAsDataURL(newFile);
      }
      if (newFile && type === 'verso') {
        reader.onload = () => {
          const base64String = reader.result as string;
          setValue('idCardImageVerso', base64String, { shouldValidate: true });
        };
        reader.readAsDataURL(newFile);
      }
    },
    [setValue]
  );

  const handleDropPermisFile = useCallback(
    (acceptedFiles: File[], type: string) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      const reader = new FileReader();

      if (newFile && type === 'recto') {
        reader.onload = () => {
          const base64String = reader.result as string;
          setValue('licenseImageRecto', base64String, { shouldValidate: true });
        };
        reader.readAsDataURL(newFile);
      }
      if (newFile && type === 'verso') {
        reader.onload = () => {
          const base64String = reader.result as string;
          setValue('licenseImageVerso', base64String, { shouldValidate: true });
        };
        reader.readAsDataURL(newFile);
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card
        sx={{
          p: 2.8,
          boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5"> Informations Légales </Typography>
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              bgcolor: 'background.paper',
              [`& .${tabsClasses.flexContainer}`]: {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-end',
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.label}
                sx={{
                  color: '#619FCB',
                }}
              />
            ))}
          </Tabs>
        </Stack>
        <br />
        {currentTab === 'cni' && (
          <>
            <Stack spacing={2} direction="row">
              <Block label="Recto">
                <Stack>
                  <RHFUpload
                    name="idCardImageRecto"
                    imsrc={profil?.idCard.recto}
                    maxSize={3145728}
                    onDrop={(file) => handleDropCniFile(file, 'recto')}
                    onDelete={() => setValue('idCardImageRecto', null, { shouldValidate: true })}
                  />
                </Stack>
              </Block>
              <Block label="Verso">
                <Stack>
                  <RHFUpload
                    name="idCardImageVerso"
                    imsrc={profil?.idCard.verso}
                    maxSize={3145728}
                    onDrop={(file) => handleDropCniFile(file, 'verso')}
                    onDelete={() => setValue('idCardImageVerso', null, { shouldValidate: true })}
                  />
                </Stack>
              </Block>
            </Stack>
          </>
        )}
        {currentTab === 'permis' && (
          <>
            <Stack spacing={2} direction="row">
              <Block label="Recto">
                <Stack>
                  <RHFUpload
                    name="licenseImageRecto"
                    imsrc={profil?.license.recto}
                    maxSize={3145728}
                    onDrop={(file) => handleDropPermisFile(file, 'recto')}
                    onDelete={() => setValue('licenseImageRecto', null, { shouldValidate: true })}
                  />
                </Stack>
              </Block>
              <Block label="Verso">
                <Stack>
                  <RHFUpload
                    name="licenseImageVerso"
                    imsrc={profil?.license.verso}
                    maxSize={3145728}
                    onDrop={(file) => handleDropPermisFile(file, 'verso')}
                    onDelete={() => setValue('licenseImageVerso', null, { shouldValidate: true })}
                  />
                </Stack>
              </Block>
            </Stack>
          </>
        )}

        <Stack alignItems="right" sx={{ p: 3 }}>
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
              pl: 2,
              pr: 1.5,
            }}
          >
            ENREGISTRER
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
