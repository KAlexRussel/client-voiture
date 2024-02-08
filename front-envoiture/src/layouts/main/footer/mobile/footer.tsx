import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Logo from 'src/components/logo';

export default function FooterMobile() {
  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 3,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: 'auto' }} />

        <Typography variant="caption" component="div">
          © All rights reserved
          <br /> made by
          <Link href="#"> Envoitures </Link>
        </Typography>
      </Container>
    </Box>
  );

  return simpleFooter;
}
