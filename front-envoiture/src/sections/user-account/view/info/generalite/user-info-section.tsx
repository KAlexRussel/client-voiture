import { Card, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Iconify from 'src/components/iconify/iconify';
import RenderCarInfo from './user-car-info';
import RenderUserEdit from './user-info-edit';

export default function UserInfoSection() {
  const renderConfidential = (
    <Card
      sx={{
        p: 4,
        boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
      }}
    >
      <Stack alignItems="center" spacing={2}>
        <Iconify color="#619FCB" icon="fluent:info-24-regular" />
        <Typography variant="body1">
          vos informations sont classées confidentielles et ne seront en aucun cas divulguées.
        </Typography>
      </Stack>
    </Card>
  );
  return (
    <>
      {renderConfidential}
      <br />
      <RenderUserEdit />
      <br />
      <RenderCarInfo />
    </>
  );
}
