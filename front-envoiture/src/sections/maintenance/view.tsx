import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/routes/components';
import { MaintenanceIllustration } from 'src/assets/illustrations';

export default function MaintenanceView() {
  return (
    <Stack sx={{ alignItems: 'center' }}>
      <Typography variant="h3" paragraph>
        Cette page est actuellement en cour de création
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>merci de patienter!</Typography>

      <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

      <Button
        sx={{ backgroundColor: '#619FCB', borderRadius: 3 }}
        component={RouterLink}
        href="/search"
        size="large"
        variant="contained"
      >
        Rechercher un trajet
      </Button>
    </Stack>
  );
}
