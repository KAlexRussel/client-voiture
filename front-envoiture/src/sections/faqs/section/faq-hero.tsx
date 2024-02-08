import { alpha, useTheme } from '@mui/material/styles';
import { Stack, Container, Box } from '@mui/material';
import { bgGradient } from 'src/theme/css';
import { MotionContainer, varFade } from 'src/components/animate';
import { TextAnimate } from 'src/components/textAnimate';

export default function FaqsHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          // imgUrl: '/assets/images/faqs/hero.jpg',
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
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <div>
            <TextAnimate text="FAQs" sx={{ color: '#619FCB' }} variants={varFade().inRight} />
            <br />

            <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
              <TextAnimate text="besoins" />
              <TextAnimate text="d'aide ?" />
            </Stack>
          </div>
        </Box>
      </Container>
    </Box>
  );
}
