import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { _faqs } from 'src/_mock/_faq';
import Iconify from 'src/components/iconify';

export default function FaqsList() {
  return (
    <div>
      {_faqs.map((accordion) => (
        <Accordion key={accordion.id} sx={{
          borderRadius: 3,
          boxShadow: (theme) => `-1px 1px 10px ${alpha(theme.palette.common.black, 0.24)}`,
        }}>
          <AccordionSummary expandIcon={<Iconify color= '#619FCB' icon="eva:arrow-ios-downward-fill" />}>
            <Typography color= '#619FCB' variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
