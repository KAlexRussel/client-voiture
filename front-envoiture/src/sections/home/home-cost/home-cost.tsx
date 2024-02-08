import { useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import { Container, Stack, Box, Typography, Paper } from '@mui/material';
import { MotionContainer, varFade } from 'src/components/animate';
import { m } from 'framer-motion';
import { bgGradient } from 'src/theme/css';
import Image from 'src/components/image';
import { useSettingsContext } from 'src/components/settings';

export default function HomeCostView() {
  const isDesktop = useResponsive('up', 'md');
  const theme = useTheme();
  const settings = useSettingsContext();

  const renderleftBackgroundImg = (
    <Stack alignItems="center" direction="row" spacing={20}>
      <Stack>
        <Paper
          sx={{
            borderRadius: 2,
            position: 'relative',
          }}
        >
          <Box component={m.img} src="/assets/images/home/Component_4.png" sx={{ maxWidth: 350 }} />
          <Stack
            sx={{
              bottom: 0,
              top: 15,
              zIndex: 9,
              width: '100%',
              textAlign: 'left',
              position: 'absolute',
              color: 'common.black',
              ...bgGradient({
                direction: 'to top',
              }),
            }}
          >
            sdfsdfsd
          </Stack>
        </Paper>
      </Stack>
      <Image
        disabledEffect
        alt="cost"
        src="/assets/images/home/Envoiture_11.png"
        sx={{
          maxWidth: 450,
          top: -51,
        }}
      />
      <Stack>
        <Paper
          sx={{
            borderRadius: 2,
            position: 'relative',
            top: -51,
          }}
        >
          <Box component={m.img} src="/assets/images/home/Component_4.png" sx={{ maxWidth: 350 }} />
          <Stack
            spacing={3}
            sx={{
              bottom: 0,
              top: -15,
              zIndex: 9,
              width: 350,
              textAlign: 'left',
              position: 'absolute',
              color: 'common.black',
              ...bgGradient({
                direction: 'to top',
              }),
            }}
          >
            <Typography variant="h4">
              Et si co-voiturer divisait par 4 les coûts de vos voyages ?
            </Typography>
            <Typography variant="body1">
              Proposez vos trajets sur envoiture.fr et partagez les frais avec les autres
              co-voitureurs. <span style={{ color: '#6A9C95' }}> Et ce n’est pas tout ! </span>
              Profitez de notre offre d’un mois de voyage sans frais* sur vos trajets.
            </Typography>
            <Typography variant="inherit">
              Frais*: frais de mise en relation et gestion de la plateforme
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );

  return (
    <Container component={MotionContainer} maxWidth={settings.themeStretch ? false : 'xl'}>
      <m.div variants={varFade().inRight}>
        <Stack alignItems="center" justifyContent="center">
          {/* isDesktop ? (
            renderleftBackgroundImg
          ) : (
            <Image
              disabledEffect
              alt="cost"
              src="/assets/images/home/Envoiture_11.png"
              sx={{
                maxWidth: 450,
              }}
            />
          ) */} 
          { !isDesktop && <Image
              disabledEffect
              alt="cost"
              src="/assets/images/home/Envoiture_11.png"
              sx={{
                maxWidth: '100%',
              }}
            />} 
        </Stack>
      </m.div>
    </Container>
  );
}
