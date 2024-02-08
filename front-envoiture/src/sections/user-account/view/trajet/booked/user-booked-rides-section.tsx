import { useState } from 'react';
import {
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
  TableSelectedAction,
  emptyRows,
  getComparator,
  useTable,
} from 'src/components/table';
import { _PasseTrajet } from 'src/_mock/_trajet';
import Iconify from 'src/components/iconify';
import { applyFilter } from '../utile/trajet-filter';
import UserTrajetTableToolBar from '../utile/user-table-toolBar';
import UserTrajetTableList from '../utile/user-trajet-table';
import { TABLE_HEAD } from '../publish/user-publish-ride-section';

type Props = {
  bookedRides: any[];
};

export default function UserBookedRidesSection({ bookedRides }: Props) {
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
  const [tableData, setTableData] = useState(bookedRides);
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
        <Typography variant="h5"> Trajets réservés </Typography>
      </Stack>
      <Stack alignItems="center">
        <Typography variant="body1"> Aucun trajet enregistré !</Typography>
        <Image
          alt="darkmode"
          src="/assets/images/1.png"
          sx={{
            borderRadius: 2,
            my: { xs: 5, md: 10 },
          }}
        />
      </Stack>
    </Card>
  );

  const renderPasseTrajet = (
    <Card
      sx={{
        p: 4,
        boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
        <Stack alignItems="left">
          <Typography variant="h5"> Trajets passés </Typography>
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
      {bookedRides.length && bookedRides.length > 0 ? (
        <> {renderPasseTrajet}</>
      ) : (
        <> {renderEmtyTrajet}</>
      )}
    </>
  );
}
