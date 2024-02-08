import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'src/redux/store';
import { useSnackbar } from 'notistack';
import { CustomFile, UploadProps } from 'src/components/upload';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { Typography } from '@mui/material';
import { fData } from 'src/utils/format-number';
import { useBoolean } from 'src/hooks/use-boolean';
import { addAvatarAction, getAccountProfilAction, updateAccountProfilAction } from 'src/redux/actions/account-action';

type FormValuesProps = {
  imageName: CustomFile | string | null;
};

export default function UserEditAvater() {
  const { enqueueSnackbar } = useSnackbar();
  const { profil } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const changeAvatar = useBoolean();

  const defaultValues = useMemo(
    () => ({
      imageName: profil?.imageName || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profil]
  );

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        enqueueSnackbar('Photo de profil mis a jour !');
        console.info('DATA', data);
      } catch (error) {
        console.error(error);
      }
    },
    [enqueueSnackbar]
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      const reader = new FileReader();
      if (file) {
        setValue('imageName', newFile, { shouldValidate: true });
        reader.onload = () => {
            const base64String = reader.result as string;
          const data = {
            imageName: base64String.substring(22),
          } 
          dispatch(addAvatarAction(profil.id, data));
          // setValue('imageName', newFile, { shouldValidate: true });
        };
        reader.readAsDataURL(newFile);
      }
    },
    [setValue, dispatch, profil]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFUploadAvatar
        name="imageName"
        maxSize={3145728}
        onDrop={handleDrop}
        sx={{
          mx: 'auto',
          width: { xs: 64, md: 158 },
          height: { xs: 64, md: 158 },
          border: (theme) => `solid 2px ${theme.palette.common.white}`,
        }}
      />
    </FormProvider>
  );
}
