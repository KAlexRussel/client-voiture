import { Box } from '@mui/material';
import { m } from 'framer-motion';
import { varFade } from 'src/components/animate';
import {TextAnimateProps} from './type'

export default function TextAnimate({ text, variants, sx, ...other }: TextAnimateProps) {
    return (
      <Box
        component={m.div}
        sx={{
          typography: 'h2',
          overflow: 'hidden',
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        {text.split('').map((letter, index) => (
          <m.span key={index} variants={variants || varFade().inUp}>
            {letter}
          </m.span>
        ))}
      </Box>
    );
  }