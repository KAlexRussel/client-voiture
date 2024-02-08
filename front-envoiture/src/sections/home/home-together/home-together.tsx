import { m } from 'framer-motion';
import { alpha } from '@mui/material/styles';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import Image from 'src/components/image';
import { useSettingsContext } from 'src/components/settings';
import { MotionContainer, MotionViewport, varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify';

export default function HomeTogetherView() {
  const settings = useSettingsContext();
  const upMd = useResponsive('up', 'md');
  const renderImg = (
    <m.div variants={varFade().inUp}>
      <Image
        alt="darkmode"
        src="/assets/images/home/undraw.png"
        sx={{
          borderRadius: 2,
          my: { xs: 5, md: 10 },
          boxShadow: (theme) => `-40px 40px 80px ${alpha(theme.palette.common.black, 0.24)}`,
        }}
      />
    </m.div>
  );
  const renderDescription = (
    <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mt: { xs: 10, md: 1 } }}>
      <m.div variants={varFade().inUp}>
        <Typography
          variant="h4"
          color="white"
          sx={{
            mt: 3,
            mb: 5,
          }}
        >
          Ensemble, protégeons-nous !
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          variant="body1"
          sx={{
            mt: 3,
            mb: 10,
            width: '100%',
            color: '#ffff'
          }}
        >
          Veuillez sur la sécurité de nos membres est notre priorité, nous mettons en œuvre les
          moyens nécessaires afin de vous garantir une sécurité pendant vos voyages. Les
          comportements abusifs et toxiques pendant les trajets demeurent une réalité que nous
          souhaitons limiter voir éradiquer au sein de notre communauté. Face à ce genre de
          situation, vous trouverez ici comment vous comporter.
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Button
          sx={{ backgroundColor: '#663F81', '&:hover': {  boxShadow: (theme) => `-1px 5px 10px ${alpha(theme.palette.common.black, 0.24)}` } }}
          size="large"
          variant="contained"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          target="_blank"
          rel="noopener"
          href="/"
        >
          EN SAVOIR PLUS
        </Button>
      </m.div>
    </Box>
  );
  return (
    <Box
      sx={{
        textAlign: 'center',
        bgcolor: '#619FCB',
      }}
    >
      <Container component={MotionContainer} sx={{ py: { xs: 10, md: 1 } }} maxWidth={settings.themeStretch ? false : 'xl'}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 1, md: 0 }}
        >
          <Grid item xs={12} md={6}>
            {renderDescription}
          </Grid>
          {upMd && (
            <Grid item xs={12} md={6}>
              {renderImg}
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
