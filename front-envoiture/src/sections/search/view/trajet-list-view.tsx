import { useCallback, useState } from 'react';
import { Card, Container, Divider, Grid, Stack, Tab, Tabs } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { m } from 'framer-motion';
import { MotionViewport, varHover } from 'src/components/animate';
import { useDispatch, useSelector } from 'src/redux/store';
import { useResponsive } from 'src/hooks/use-responsive';
import Label from 'src/components/label';
import { TRAJET_TYPE_OPTIONS } from 'src/_mock/_trajet';
import { useTable, getComparator } from 'src/components/table';
import EmptyContent from 'src/components/empty-content';
import { TRideTableFilterValue } from 'src/types/ride';
import SearchRideComponent from 'src/components/search-rides';
import { TrajetAnalystic, SearchResultView } from '../component';
import SearchToolbar from '../component/search-toolbar';
import { applySearchFilter } from '../utils/search-filter';

const defaultFilters = {
  type: 'tout',
  isBagAllowed: false,
  isAnimalAllowed: false,
  price: 0,
  isFoodAllowed: false,
  isMusicAllowed: false,
  isDetourAllowed: false,
};

const TYPE_OPTIONS = [{ value: 'tout', label: 'Tout' }, ...TRAJET_TYPE_OPTIONS];

export default function TrajetListView() {
  const table = useTable({ defaultRowsPerPage: 10 });
  const { searchRidesResult } = useSelector((state) => state.rides);
  const theme = useTheme();
  const isMobile = useResponsive('down', 'sm');
  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applySearchFilter({
    inputData: searchRidesResult,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const notFound = !dataFiltered.length;

  const getTrajetLength = (type: string) =>
    searchRidesResult.filter((item) => item.type === type).length;

  const handleFilters = useCallback((name: string, value: TRideTableFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('type', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <Container
      component={MotionViewport}
      sx={{
        pt: 5,
        pb: 3,
        minHeight: 1,
      }}
    >
      <Card
        sx={{
          p: 4,
          mb: 5,
          boxShadow: `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
        }}
      >
        <SearchRideComponent formDirection="row" />
      </Card>
      <Divider sx={{ borderBottomWidth: 5, mb: 5 }} />
      <>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
          sx={{
            py: isMobile ? 5 : 2,
            mb: 5,
            boxShadow: `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
            '&:hover': {
              bgcolor: 'background.paper',
              boxShadow: `-1px 2px 20px ${alpha(theme.palette.common.black, 0.24)}`,
            },
          }}
        >
          {!isMobile && (
            <TrajetAnalystic
              title="Total"
              rides={searchRidesResult}
              total={searchRidesResult.length}
              percent={100}
              icon="ph:car-light"
              color={theme.palette.info.main}
            />
          )}
          <TrajetAnalystic
            title="Conducteur"
            rides={searchRidesResult}
            total={getTrajetLength('conducteur')}
            percent={100}
            icon="healthicons:truck-driver-outline"
            color="#619FCB"
          />

          <TrajetAnalystic
            title="Passager"
            rides={searchRidesResult}
            total={getTrajetLength('passager')}
            percent={100}
            icon="carbon:passenger-plus"
            color="#663F81"
          />
        </Stack>
        <Grid container spacing={10} sx={{ py: 5 }}>
          <Grid item xs={12} md={5}>
            <Card
              component={m.div}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              sx={{
                mb: { xs: 3, md: 5 },
                boxShadow: `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
                '&:hover': {
                  bgcolor: 'background.paper',
                  boxShadow: `-1px 2px 20px ${alpha(theme.palette.common.black, 0.24)}`,
                },
              }}
            >
              <Tabs
                value={filters.type}
                onChange={handleFilterStatus}
                sx={{
                  px: 2.5,
                  boxShadow: `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                }}
              >
                {TYPE_OPTIONS.map((tab, idx) => (
                  <Tab
                    key={idx}
                    iconPosition="end"
                    value={tab.value}
                    label={tab.label}
                    icon={
                      <Label
                        variant={
                          ((tab.value === 'tout' || tab.value === filters.type) && 'filled') ||
                          'soft'
                        }
                        sx={{
                          color: '#ffff',
                          bgcolor:
                            (tab.value === 'conducteur' && '#619FCB') ||
                            (tab.value === 'passager' && '#663F81') ||
                            'default',
                        }}
                      >
                        {tab.value === 'tout' && searchRidesResult.length}
                        {tab.value === 'conducteur' &&
                          searchRidesResult.filter((search) => search.type === 'conducteur').length}

                        {tab.value === 'passager' &&
                          searchRidesResult.filter((search) => search.type === 'passager').length}
                      </Label>
                    }
                  />
                ))}
              </Tabs>
              <SearchToolbar
                filters={filters}
                onFilters={handleFilters}
                onResetFilters={handleResetFilters}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            {notFound ? (
              <EmptyContent
                filled
                title="Aucun trajet trouvé"
                imgUrl="/assets/images/12.png"
                sx={{
                  py: 10,
                }}
              />
            ) : (
              <SearchResultView
                table={table}
                data={searchRidesResult}
                dataFiltered={dataFiltered}
              />
            )}
          </Grid>
        </Grid>
      </>
    </Container>
  );
}
