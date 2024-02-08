import {
  Avatar,
  Box,
  Card,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  Link,
  ListItemText,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { TReview } from 'src/types/ride';
import { fDate } from 'src/utils/format-time';

type Props = {
  review: TReview;
};

export default function UserReviewCard({ review }: Props) {
  const renderInfo = (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'row',
        md: 'row',
      }}
    >
      <Stack alignItems="center">
        <Avatar
          src={review.user.imageName}
          sx={{
            width: { xs: 48, md: 84 },
            height: { xs: 48, md: 84 },
          }}
        />
      </Stack>
      <Stack direction="column">
        <ListItemText
          primary={review.user.fname}
          secondary={
            <>
              <Typography variant="body2">{review.user.age} ans</Typography>
            </>
          }
          primaryTypographyProps={{ noWrap: true, typography: 'subtitle2', mb: 0.5 }}
          secondaryTypographyProps={{ noWrap: true, typography: 'caption', component: 'span' }}
        />
        <Stack
          spacing={1}
          flexGrow={1}
          direction={{
            xs: 'row',
            md: 'row',
          }}
        >
          <Typography variant="body2">{review.comment}</Typography>
          <Rating size="small" value={review.rate} precision={0.1} readOnly />
        </Stack>
      </Stack>
    </Stack>
  );

  const renderContent = (
    <Stack spacing={1} flexGrow={1}>
      <Rating size="small" value={review.rate} precision={0.1} readOnly />

      <Typography variant="body2">{review.comment}</Typography>
    </Stack>
  );

  return (
    <Stack
      spacing={1}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ mt: 5 }}
    >
      {renderInfo}
    </Stack>
  );
}
