import { forwardRef } from 'react';
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
import { RouterLink } from 'src/routes/components';
import Image from '../image';

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  sizeWidth?: number;
  sizeHeight?: number;
  maxSizeWidth?: number;
  maxSizeHeight?: number;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    { disabledLink = false, sizeWidth, sizeHeight, maxSizeHeight, maxSizeWidth, sx, ...other },
    ref
  ) => {

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: sizeWidth ?? 130,
          height: sizeHeight ?? 40,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <Image
          disabledEffect
          visibleByDefault
          alt="overview"
          src="/logo/logo_single.png"
          sx={{ maxWidth: maxSizeWidth ?? 130, maxHeight: maxSizeHeight ?? 40 }}
        />
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
