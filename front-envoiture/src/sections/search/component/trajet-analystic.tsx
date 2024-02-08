import { alpha, useTheme } from '@mui/material/styles';
import { TTrajet } from 'src/types/search';
import { useDispatch, useSelector } from 'src/redux/store';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { fShortenNumber } from 'src/utils/format-number';
import { useResponsive } from 'src/hooks/use-responsive';
import { TRides } from 'src/types/ride';

type Props = {
  rides: TRides[];
  total: number;
  icon: string;
  title: string;
  percent: number;
  color?: string;
};

export default function TrajetAnalystic({ rides, total, icon, title, percent, color }: Props) {
    const isMobile = useResponsive('down', 'sm');  return (
    <Stack
      spacing={2.5}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ width: 1, minWidth: isMobile ? 100 : 200 }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
        <Iconify icon={icon} width={62} sx={{ color, position: 'absolute' }} />
        <CircularProgress
          variant="determinate"
          value={percent}
          size={56}
          thickness={2}
          sx={{ color, opacity: 0.48 }}
        />
        <CircularProgress
          variant="determinate"
          value={100}
          size={56}
          thickness={3}
          sx={{
            top: 0,
            left: 0,
            opacity: 0.48,
            position: 'absolute',
            color: (theme) => alpha(theme.palette.grey[500], 0.16),
          }}
        />
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="subtitle1">{title}</Typography>

        <Box component="span" sx={{ typography: 'body2' }}>
          {total > 1 ? `${fShortenNumber(total)}  Trajets trouvé`: `${total} Trajet trouvé` } 
        </Box>
      </Stack>
    </Stack>
  );
}
