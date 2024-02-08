import { Card, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useDispatch } from 'src/redux/store';
import { useCallback } from 'react';
import moment from 'moment';
import { getSearchResultAction } from 'src/redux/actions/rides-action';
import { m } from 'framer-motion';
import { varHover } from 'src/components/animate';

type Props = {
  popularTrajet: any;
};

export default function PopularTrajetSection({ popularTrajet }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = useCallback(async () => {
    try {
      const data = {
        start: popularTrajet.start,
        end: popularTrajet.end,
        startAt: moment(popularTrajet.startAt).format('YYYY-MM-DD'),
        availablePlaces: popularTrajet.availablePlaces,
      };
      dispatch(getSearchResultAction(data));
      navigate(paths.search.trajets);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, popularTrajet, navigate]);

  return (
    <>
      <Stack
        direction="row"
        component={m.div}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(0.9)}
        justifyContent="space-between"
        sx={{
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#E7E3ED',
          },
        }}
        onClick={() => {
          handleSearch();
        }}
      >
        <Stack direction="row" spacing={3} sx={{ p: 1.5, mt: 1 }}>
          <Typography variant="subtitle1">{popularTrajet.start}</Typography>
          <Iconify icon="octicon:arrow-right-24" />
          <Typography variant="subtitle1">{popularTrajet.end}</Typography>
        </Stack>
        <Stack direction="row" spacing={3} sx={{ p: 1.5, mt: 1 }}>
          <Iconify icon="eva:arrow-ios-forward-fill" />
        </Stack>
      </Stack>
    </>
  );
}
