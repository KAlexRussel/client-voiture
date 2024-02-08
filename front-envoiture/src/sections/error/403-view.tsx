import { m } from 'framer-motion';
// @mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// assets
import { ForbiddenIllustration } from 'src/assets/illustrations';
// components
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varBounce } from 'src/components/animate';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function View403() {
  return (
    <MotionContainer>
      <Stack justifyContent='center' alignItems='center'>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" paragraph>
          Veuillez vous connecter
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
      </m.div>

      <Button component={RouterLink} href="/" size="large" variant="contained">
      Page d&apos;accueille
      </Button>
      </Stack>
    </MotionContainer>
  );
}
