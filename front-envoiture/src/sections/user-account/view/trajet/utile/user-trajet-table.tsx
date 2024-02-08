import { TableRow, TableCell, Typography, Tooltip, IconButton } from '@mui/material';
import { m } from 'framer-motion';
import { varContainer, varHover } from 'src/components/animate';
import { fDate, fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
import Iconify from 'src/components/iconify/iconify';

type Props = {
  row: any;
};

const UserTrajetTableList = ({ row }: Props) => {
  const { start, end, startAt, type, price, isBookable, placesNumber } = row;

  return (
    <>
      <TableRow hover  component={m.tr} whileTap="tap" whileHover="hover" variants={varHover(0.9)} onClick={() => console.log('sdfsd')} sx={{cursor: 'pointer',}}>
        <TableCell>
          <Typography variant="subtitle2" >
            {start}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">
            {end}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {fDateTime(startAt)}
          </Typography>
        </TableCell>
        <TableCell sx={{ textTransform: 'capitalize' }}>{fCurrency(price)} €</TableCell>
        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {type}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {placesNumber}
          </Typography>
        </TableCell>
        <TableCell>
          {isBookable && new Date(startAt) >= new Date() ? (
            <Typography variant="subtitle2" noWrap>
              Réservable
            </Typography>
          ) : (
            <Typography variant="subtitle2" noWrap>
              {new Date(startAt) < new Date() ? 'Passé ' : 'Complet'}
            </Typography>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};
export default UserTrajetTableList;
