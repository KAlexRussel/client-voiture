import { useState } from 'react';
import { Box, Card, Container, Divider, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { _PassePopulaire } from 'src/_mock/map/_rides';
import { MotionViewport } from 'src/components/animate';
import SearchRideComponent from 'src/components/search-rides';
import { PopularTrajetSection } from '../component';

export default function SearchView() {
  const [popularRide, setPopilarRides] = useState(_PassePopulaire);

  return (
    <Container
      component={MotionViewport}
      sx={{
        pt: 5,
        pb: 3,
        minHeight: 1,
      }}
    >
      <Typography variant="h2" align="center" paragraph>
        Rechercher une destination
      </Typography>
      <Box
        gap={{ xs: 3, md: 0 }}
        sx={{ mt: 9, mb: 5, position: 'relative' }}
        alignItems={{ md: 'center' }}
        gridTemplateColumns={{ md: 'repeat(3, 1fr)' }}
      >
        <Card
          sx={{
            p: 4,
            boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
          }}
        >
          <SearchRideComponent formDirection="row" />
        </Card>
      </Box>
      <Stack
        sx={{
          py: 10,
          m: 'auto',
          maxWidth: 600,
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <Divider sx={{ borderBottomWidth: 3 }} />
        <Stack alignItems="center">
          <Typography variant="h5"> Trajets populaires </Typography>
        </Stack>
        <Box
          sx={{
            mt: 5,
            mb: 5,
            position: 'relative',
          }}
        >
          <Card
            sx={{
              '&:hover': {
                boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}`,
              },
            }}
          >
            {popularRide.map((PopularTrajet, idx) => (
              <PopularTrajetSection key={idx} popularTrajet={PopularTrajet} />
            ))}
          </Card>
        </Box>
      </Stack>
    </Container>
  );
}
