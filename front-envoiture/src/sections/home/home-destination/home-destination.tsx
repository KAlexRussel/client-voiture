import { m } from 'framer-motion';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import Image from 'src/components/image';
import SearchRideComponent from 'src/components/search-rides';
import { useSettingsContext } from 'src/components/settings';
import { MotionViewport, varFade } from 'src/components/animate';

export default function HomeDestinationView() {
  const upMd = useResponsive('up', 'md');
  const settings = useSettingsContext();
  const renderHeader = (
    <Stack alignItems="center" spacing={3}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ color: '#619FCB' }}>
          Où allez vous ?
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
          <Divider />
      </m.div>
    </Stack>
  );

  const renderImg = (
    <m.div variants={varFade().inUp}>
      <Image
        alt="darkmode"
        src="/assets/images/home/undraw_by.png"
        sx={{
          borderRadius: 2,
          my: { xs: 5, md: 10 },
        }}
      />
    </m.div>
  );

  return (
    <Box
      sx={{
        textAlign: 'center',
        bgcolor: 'white',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 20 },
      }}
    >
      <Container component={MotionViewport}>
        {renderHeader}
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 5, md: 0 }}
        >
          <Grid item xs={12} md={6}>
            {renderImg}
          </Grid>
          <Grid item xs={12} md={6}>
            <m.div variants={varFade().inUp}>
              <Card
                sx={{
                  marginLeft: upMd ? 20 : 0,
                  borderRadius: 2,
                  my: { xs: 5, md: 10 },
                  boxShadow: (theme) =>
                    `-10px 40px 80px ${alpha(theme.palette.common.black, 0.24)}`,
                }}
              >
                <CardContent>
                <SearchRideComponent  formDirection= "column"/>
                </CardContent>
              </Card>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
