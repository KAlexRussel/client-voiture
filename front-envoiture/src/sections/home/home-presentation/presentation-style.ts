import { m } from 'framer-motion';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { textGradient, bgGradient, bgBlur } from 'src/theme/css';
import { HEADER } from 'src/layouts/config-layout';

export const StyledRoot = styled('div')(({ theme }) => ({
    ...bgGradient({
      color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.2 : 0.4),
      imgUrl: '/assets/images/home/Banner_1.png',
    }),
    width: '100%',
    height: '100vh',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      top: 0,
      left: 0,
      position: 'fixed',
    },
  }));
  
  export const StyledWrapper = styled('div')(({ theme }) => ({
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      marginTop: HEADER.H_DESKTOP_OFFSET,
    },
  }));
  
  export const StyledTextGradient = styled(m.h1)(({ theme }) => ({
    ...textGradient(
      `300deg, #663F81 10%, white 25%, ${theme.palette.primary.main} 50%, #663F81 75%, #619FCB 100%`
    ),
    padding: 0,
    marginTop: 50,
    lineHeight: 1,
    marginBottom: 3,
    letterSpacing: 8,
    textAlign: 'center',
    backgroundSize: '400%',
    fontSize: `${30 / 16}rem`,
    fontFamily: "'Barlow', sans-serif",
    [theme.breakpoints.up('md')]: {
      fontSize: `${96 / 16}rem`,
    },
  }));
  
  export const StyledEllipseTop = styled('div')(({ theme }) => ({
    top: -80,
    width: 480,
    right: -80,
    height: 480,
    borderRadius: '50%',
    position: 'absolute',
    filter: 'blur(100px)',
    WebkitFilter: 'blur(100px)',
    backgroundColor: alpha(theme.palette.primary.darker, 0.12),
  }));
  
  export const StyledEllipseBottom = styled('div')(({ theme }) => ({
    height: 400,
    bottom: -200,
    left: '10%',
    right: '10%',
    borderRadius: '50%',
    position: 'absolute',
    filter: 'blur(100px)',
    WebkitFilter: 'blur(100px)',
    backgroundColor: alpha(theme.palette.primary.darker, 0.12),
  }));
  
  type StyledPolygonProps = {
    opacity?: number;
    anchor?: 'left' | 'right';
  };
  export const StyledPolygon = styled('div')<StyledPolygonProps>(
    ({ opacity = 1, anchor = 'left', theme }) => ({
      ...bgBlur({
        opacity,
        color: theme.palette.background.default,
      }),
      zIndex: 9,
      bottom: 0,
      height: 20,
      width: '30%',
      position: 'absolute',
      clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
      ...(anchor === 'left' && {
        left: 0,
      }),
      ...(anchor === 'right' && {
        right: 0,
        transform: 'scaleX(-1)',
      }),
      [theme.breakpoints.up('md')]: {
        height: 80,
        width: '50%',
      },
    })
  );