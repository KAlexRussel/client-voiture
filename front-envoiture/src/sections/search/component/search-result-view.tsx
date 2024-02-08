import { useDispatch, useSelector } from 'src/redux/store';
import { TableProps } from 'src/components/table';
import { TTrajet } from 'src/types/search';
import { Box, Card, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { varHover } from 'src/components/animate';
import { m } from 'framer-motion';
import { fDate } from 'src/utils/format-time';
import Iconify from 'src/components/iconify/iconify';
import { TRides } from 'src/types/ride';
import TrajetCardtView from './trajet-card-view';

type Props = {
  table: TableProps;
  data: TRides[];
  dataFiltered: TRides[];
};

export default function SearchResultView({ table, data, dataFiltered }: Props) {
  const dispatch = useDispatch();
  const { searchItems } = useSelector((state) => state.rides);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  return (
    <>
      {tomorrow === new Date(searchItems?.startAt) && <Typography variant="h5">Demain</Typography>}
      {today === new Date(searchItems?.startAt) && (
        <Typography variant="h5">Aujourd’hui</Typography>
      )}
      {today !== searchItems.startAt && tomorrow !== new Date(searchItems?.startAt) && (
        <Typography variant="h5">{fDate(searchItems?.startAt)}</Typography>
      )}
      <Stack direction="row" spacing={1}>
        <Typography variant="body1">{searchItems?.start}</Typography>
        <Iconify icon="pepicons-print:arrow-right" />
        <Typography variant="body1">{searchItems?.end}</Typography>
      </Stack>
      <br />
      {dataFiltered.map((ride, idx) => (
        <Card
          key={idx}
          component={m.div}
          whileTap="tap"
          whileHover="hover"
          variants={varHover(1.1)}
          sx={{
            p: 1,
            mb: 5,
            maxWidth: '100%',
            border: '1px solid red',
            borderColor: ride.type === 'conducteur' ? '#619FCB' : '#663F81',
            boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
            '&:hover': {
              bgcolor: 'background.paper',
              boxShadow: (theme) => `-1px 2px 20px ${alpha(theme.palette.common.black, 0.24)}`,
            },
          }}
        >
          <TrajetCardtView ride={ride} />
        </Card>
      ))}
    </>
  );
}
