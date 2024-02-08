import { m, useScroll } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme, alpha } from '@mui/material/styles';
import { Stack, Button, Typography, Box, Container, Grid, Card } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import { HEADER } from 'src/layouts/config-layout';
// components
import { MotionContainer, varFade } from 'src/components/animate';
import { useSettingsContext } from 'src/components/settings';
import { useLocales } from 'src/locales';
import SearchRideComponent from 'src/components/search-rides';
import {
  StyledRoot,
  StyledWrapper,
  StyledTextGradient,
  StyledEllipseTop,
  StyledEllipseBottom,
  StyledPolygon,
} from './presentation-style';

export default function HomePresentation() {
  const mdUp = useResponsive('up', 'md');
  const { t } = useLocales();
  const theme = useTheme();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const [percent, setPercent] = useState(0);
  const settings = useSettingsContext();

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const opacity = 1 - percent / 100;
  const hide = percent > 120;
  const renderDescription = (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        mx: 'auto',
        maxWidth: '100%',
        opacity: opacity > 0 ? opacity : 0,
        mt: {
          md: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
          xs: `-${30 + percent * 2.5}px`,
        },
      }}
    >
      <m.div variants={varFade().in}>
        <StyledTextGradient
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          Co-voiturage simple et abordable
        </StyledTextGradient>
      </m.div>
      {/* <m.div variants={varFade().in}>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Rejoignez la plateforme qui vous donne accès à un vaste réseau de co-voiturage actifs
        </Typography>
      </m.div> */}

      <m.div variants={varFade().in}>
        <br />
      </m.div>

      <m.div variants={varFade().in}>
        <Card
          sx={{
            p: 4,
            '&:hover': { boxShadow: `-1px 5px 30px ${alpha(theme.palette.common.black, 0.24)}` },
          }}
        >
          <SearchRideComponent  formDirection= "row"/>
        </Card>
      </m.div>
    </Stack>
  );

  const renderPolygons = (
    <>
      <StyledPolygon />
      <StyledPolygon anchor="right" opacity={0.48} />
      <StyledPolygon anchor="right" opacity={0.48} sx={{ height: 48, zIndex: 10 }} />
      <StyledPolygon anchor="right" sx={{ zIndex: 11, height: 24 }} />
    </>
  );

  const renderEllipses = (
    <>
      {mdUp && <StyledEllipseTop />}
      <StyledEllipseBottom />
    </>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <StyledRoot
        ref={heroRef}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      >
        <StyledWrapper>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid container columnSpacing={{ md: 10, xs: 5 }} sx={{ height: 1 }}>
              <Grid item xs={12} md={12}>
                {renderDescription}
              </Grid>
            </Grid>
          </Container>

          {renderEllipses}
        </StyledWrapper>
      </StyledRoot>

      {mdUp && renderPolygons}

      <Box sx={{ height: { md: '100vh' } }} />
    </Container>
  );
}
