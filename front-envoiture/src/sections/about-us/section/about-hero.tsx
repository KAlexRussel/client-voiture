import { m, MotionProps } from 'framer-motion';
import { alpha, useTheme } from '@mui/material/styles';
import { Stack, Container, Box, BoxProps } from '@mui/material';
import { bgGradient } from 'src/theme/css';
import Typography from '@mui/material/Typography';
import { MotionContainer, varFade } from 'src/components/animate';
import { TextAnimate } from 'src/components/textAnimate';

export default function AboutHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          imgUrl: '/assets/images/home/Banner_1.png',
        }),
        height: { md: 460 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: 'absolute' },
            textAlign: {
              xs: 'center',
              md: 'unset',
            },
          }}
        >
          <TextAnimate text="Qui" variants={varFade().inRight} sx={{ color: '#619FCB' }} />
          <br />
          <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
            <TextAnimate text="sommes-nous?" />
          </Stack>
          <m.div variants={varFade().inRight}>
            <Typography
              variant="h6"
              sx={{
                mt: 3,
                color: 'common.white',
                fontWeight: 'fontWeightSemiBold',
              }}
            >
              Envoitures est une plateforme de Co voiturage créer dans le but de permettre <br />à ses
              membres de voyager à cout réduit et favoriser l’entraide. 
            </Typography>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}
