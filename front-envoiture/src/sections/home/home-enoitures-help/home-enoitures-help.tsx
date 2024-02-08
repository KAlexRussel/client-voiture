import { m } from 'framer-motion';
import { alpha } from '@mui/material/styles';
import { Stack, Card, Typography, Box, Container } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/animate';
import { useSettingsContext } from 'src/components/settings';

const CARDS = [
  {
    icon: '/assets/images/home/Icone_En_Voiture_1.png',
    title: 'Voyager à frais réduits',
    description:
      'Vous pouvez vous déplacer partout en France en fonction de votre budget, faire des économies et payer moins de frais sur vos voyages.',
  },
  {
    icon: '/assets/images/home/Icone_En_Voiture_3.png',
    title: 'Être acteur de votre voyage',
    description:
      'Moi passager(ère), je peux réserver, publier un trajet et décider avec quel conduct(rice)eur voyager. Moi conduct(rice)eur, j’ai la possibilité de booker les passager(es)s dans le but de remplir ma voiture et de réduire mes frais.',
  },
  {
    icon: '/assets/images/home/Icone_En_Voiture_2.png',
    title: 'Voyager serein(e)',
    description:
      'Nous vérifions chaque document/informations communiquées (pièces d’identité, permis de conduire, avis…) afin de garantir la confiance et la sécurité de tous nos membres.',
  },
];

export default function HomeEnvoituresHelp() {
  const settings = useSettingsContext();
  return (
    <Container
      component={MotionViewport}
      maxWidth={settings.themeStretch ? false : 'xl'}
      sx={{
        py: { xs: 10, md: 8 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: 'center',
          mb: 1,
        }}
      >
        <m.div variants={varFade().inDown}>
          <Typography sx={{ color: '#619FCB' }} variant="h2">
            Avec Envoitures vous pouvez…
          </Typography>
        </m.div>
      </Stack>

      <Box
        gap={{ xs: 3, lg: 15 }}
        display="grid"
        alignItems="center"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {CARDS.map((card, index) => (
          <m.div variants={varFade().inUp} key={card.title}>
            <Card
              sx={{
                textAlign: 'center',
                boxShadow: { md: 'none' },
                bgcolor: 'background.default',
                p: (theme) => theme.spacing(10, 5),
                ...(index === 1 && {
                  boxShadow: (theme) => ({
                    md: `-40px 40px 80px ${
                      theme.palette.mode === 'light'
                        ? alpha(theme.palette.grey[500], 0.16)
                        : alpha(theme.palette.common.black, 0.4)
                    }`,
                  }),
                }),
              }}
            >
              <m.div
                animate={{
                  y: index === 1 ? [-20, 5, -20] : [20, 0, 20],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Box
                  component="img"
                  src={card.icon}
                  alt={card.title}
                  sx={{ mx: 'auto', width: 100, height: 100 }}
                />
              </m.div>
              <Typography variant="h5" sx={{ mt: 3, mb: 2, color: '#663F81' }}>
                {card.title}
              </Typography>

              <Typography sx={{ color: 'text.secondary' }}>{card.description}</Typography>
            </Card>
          </m.div>
        ))}
      </Box>
    </Container>
  );
}
