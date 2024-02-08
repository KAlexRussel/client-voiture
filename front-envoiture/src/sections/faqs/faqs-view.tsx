import { Box, Container, Stack, Typography } from '@mui/material';
import { FaqsCategory, FaqsHero, FaqsList,FaqsForm } from './section';

export default function FaqsView() {
  return (
    <>
      <FaqsHero />

      <Container
        sx={{
          pb: 10,
          pt: { xs: 10, md: 15 },
          position: 'relative',
        }}
      >
        <FaqsCategory />
        <Stack alignItems="center">
          <Typography
            variant="h3"
            sx={{
                color: '#619FCB',
              my: { xs: 5, md: 10 },
            }}
          >
            On vous accompage !
          </Typography>
        </Stack>
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <FaqsList />
          <FaqsForm />
        </Box>
      </Container>
    </>
  );
}
