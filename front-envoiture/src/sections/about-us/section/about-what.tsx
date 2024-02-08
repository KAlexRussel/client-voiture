import { m } from 'framer-motion';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Stack, Button, Container, Grid, Typography, LinearProgress } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import { useBoolean } from 'src/hooks/use-boolean';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import AboutText from './about-us-text-dialog';

export default function AboutWhat() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const allText = useBoolean();
  const shadow = `-40px 40px 80px ${alpha(theme.palette.common.black, 0.24)}`;

  return (
    <>
      <Container
        component={MotionViewport}
        sx={{
          py: { xs: 10, md: 15 },
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Grid container columnSpacing={{ md: 5 }} alignItems="flex-start" spacing={2}>
          <Grid xs={12} md={12} lg={7}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                A propos de nous
              </Typography>
            </m.div>
            <m.div variants={varFade().inRight}>
              <Typography
                sx={{
                  color: theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                }}
              >
                Depuis toujours, se déplacer est vital pour l’homme. Les mouvements démographiques
                amènent les populations à se déplacer massivement en quête de nouveaux horizons.
                Pour favoriser et faciliter ces déplacements, l’homme a mis en place des moyens de
                transport public et privé tel que : l’avions, bateau, voitures, vélo, moto, trains…
              </Typography>
            </m.div>
            <br />
            <m.div variants={varFade().inRight}>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={allText.onTrue}
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
              >
                Lire plus
              </Button>
            </m.div>
          </Grid>
          <Grid container xs={12} md={6} lg={5} alignItems="center" sx={{ pr: { md: 7 } }}>
            <m.div variants={varFade().inUp}>
              <Box sx={{ height: 320, width: { xs: 320, md: 520 }, py: { xs: 1.5, md: 2.5 } }}>
                <iframe
                  id="a"
                  src="/assets/videos/qui_sommes_nous.mp4"
                  title="Qui sommes nous"
                  width="100%"
                  height="100%"
                  style={{ borderRadius: 20, borderColor: 'transparent' }}
                />
              </Box>
            </m.div>
          </Grid>
        </Grid>
      </Container>
      <AboutText open={allText.value} onClose={allText.onFalse} />
    </>
  );
}
