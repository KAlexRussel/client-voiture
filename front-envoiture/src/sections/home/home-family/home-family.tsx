import { m } from 'framer-motion';
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import { MotionViewport, varFade } from 'src/components/animate';
import { useSettingsContext } from 'src/components/settings';

export default function HomeFamilyView() {
  const theme = useTheme();
  const upMd = useResponsive('up', 'md');
  const settings = useSettingsContext();

  const renderImg = (
    <Box
      component={m.img}
      src="/assets/images/home/Icone_Envoiture_41.png"
      variants={varFade().in}
      sx={{
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
        boxShadow: `-80px 80px 80px ${alpha(theme.palette.grey[500], 0.48)}`,
      }}
    />
  );

  const renderDescription = (
    <Box sx={{ textAlign: { xs: 'center', md: 'unset' }, mt: { xs: 10, md: 20 } }}>
      <m.div variants={varFade().inUp}>
        <Typography
          variant="h4"
          color="#619FCB"
          sx={{
            mt: 3,
            mb: 5,
          }}
        >
          Et si co-voiturer devenait une histoire de famille <br /> <br />
          <span style={{ color: 'black' }}>
          Tout ne s’arrête pas à un trajet. Via notre plateforme, nous permettons à nos membres d’échanger, de partager, et surtout de favoriser l’entraide
          </span>
        </Typography>
      </m.div>
    </Box>
  );
  return (
    <Box
      sx={{
        minHeight: { xs: 460, md: 560 },
        overflow: 'hidden',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <Container component={MotionViewport} maxWidth={settings.themeStretch ? false : 'xl'}>
        <Grid container>
          <Grid item xs={12} md={6}>
            {renderDescription}
          </Grid>
          {upMd && (
            <Grid item xs={12} md={4}>
              {renderImg}
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
