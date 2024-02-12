import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import Image from 'src/components/image';
import Scrollbar from 'src/components/scrollbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  emptyRows,
  getComparator,
  useTable,
} from 'src/components/table';
import { _ToBeTrajet } from 'src/_mock/_trajet';
import Iconify from 'src/components/iconify';
import { applyFilter } from '../utile/trajet-filter';
import UserTrajetTableToolBar from '../utile/user-table-toolBar';
import UserTrajetTableList from '../utile/user-trajet-table';

export const TABLE_HEAD = [
  { id: 'start', label: 'Départ', align: 'left' },
  { id: 'end', label: 'Arrivée', align: 'left' },
  { id: 'startAt', label: 'Date', align: 'left' },
  { id: 'price', label: 'Coût', align: 'left' },
  { id: 'type', label: 'Type', align: 'left' },
  { id: 'placesNumber', label: 'Places', align: 'left' },
  { id: 'isBookable', label: 'Status', align: 'left' },
  { id: 'userId', label: '', align: 'left' },
];

type Props = {
  publishRides: any[];
};

export default function UserPublishRideSection({ publishRides }: Props) {
  const [showfilter, setShowfilter] = useState(false);
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    dense,
    setPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const [tableData, setTableData] = useState(publishRides);
  const [filterName, setFilterName] = useState('');
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const isNotFound = !dataFiltered.length && !!filterName;
  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const denseHeight = dense ? 52 : 72;
  const isFiltered = filterName !== '';

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  const renderEmtyTrajet = (
    <Card
      sx={{
        p: 4,
        boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
      }}
    >
      <Stack alignItems="left" sx={{ marginBottom: 4 }}>
        <Typography variant="h5"> Trajets publiés </Typography>
      </Stack>
      <Stack alignItems="center">
        <Typography variant="body1"> Aucun trajet enregistré !</Typography>
        <Image
          alt="darkmode"
          src="/assets/images/12.png"
          sx={{
            borderRadius: 2,
            my: { xs: 5, md: 10 },
          }}
        />
      
        <Link to="src/sections/search/view/trajet-details-view">
          <Button
            sx={{
              backgroundColor: '#619FCB',
              borderRadius: 3,
              pl: 2,
              pr: 1.5,
              color: 'white',
            }}
            variant="outlined"
            onClick={() => console.log('toto')}
          >
            PUBLIER UN TRAJET
          </Button>
        </Link>
        <Button
          sx={{
            backgroundColor: '#619FCB',
            borderRadius: 3,
            pl: 2,
            pr: 1.5,
            color: 'white',
          }}
          variant="outlined"
          onClick={() => console.log('toto')}
        >
          PUBLIER UN TRAJET
        </Button>
      </Stack>
    </Card>
  );

  const renderPublishRide = (
    <Card
      sx={{
        p: 4,
        boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
        <Stack alignItems="left">
          <Typography variant="h5"> Trajets Publié </Typography>
        </Stack>
        {!showfilter && (
          <IconButton color="default" onClick={() => setShowfilter(true)}>
            <Iconify sx={{ color: '#619FCB' }} icon="akar-icons:search" />
          </IconButton>
        )}
      </Stack>
      {showfilter && (
        <UserTrajetTableToolBar
          isFiltered={isFiltered}
          filterName={filterName}
          onFilterName={handleFilterName}
          onResetFilter={handleResetFilter}
        />
      )}
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              onSort={onSort}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <UserTrajetTableList key={idx} row={row} />
                ))}
              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
              />
              <TableNoData notFound={isNotFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
      <TablePaginationCustom
        count={dataFiltered.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        //
        dense={dense}
        onChangeDense={onChangeDense}
      />
    </Card>
  );
  return (
    <>
      {publishRides.length && publishRides.length > 0 ? (
        <>{renderPublishRide} </>
      ) : (
        <> {renderEmtyTrajet} </>
      )}
    </>
  );
}
