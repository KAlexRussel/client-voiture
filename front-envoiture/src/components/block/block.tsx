import { Stack, Typography, StackProps } from '@mui/material';

interface BlockProps extends StackProps {
  label?: string;
  children: React.ReactNode;
}

export default function Block({ label = 'RHFTextField', sx, children }: BlockProps) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          textAlign: 'right',
          fontStyle: 'oblique',
          color: 'text.disabled',
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}
