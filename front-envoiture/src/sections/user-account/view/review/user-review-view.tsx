import { useSelector, useDispatch } from 'src/redux/store';
import { useBoolean } from 'src/hooks/use-boolean';
import { Box, Divider, LinearProgress, Rating, Stack, Typography } from '@mui/material';
import { fShortenNumber } from 'src/utils/format-number';
import { sumBy } from 'lodash';
import ReviewList from 'src/sections/reviews/review-list';
import { useCallback } from 'react';
import { getUserReviewAction } from 'src/redux/actions/review-action';
import { useInitial } from 'src/sections/reviews/utils/init-review';

export default function UserReviewView() {
  const { profil } = useSelector((state) => state.account);
  useInitial(profil.id);
  const { reviewList } = useSelector((state) => state.review);
  const total = sumBy(reviewList, (star: any) => star.rate);

  const renderSummary = (
    <Stack spacing={1} alignItems="center" justifyContent="center">
      <Typography variant="subtitle2">Avis</Typography>
      <Typography variant="h2">{reviewList.length}/5</Typography>
      
      <Rating readOnly value={reviewList.length} precision={0.1} />

      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        ({fShortenNumber(reviewList.length)} avis)
      </Typography>
    </Stack>
  );

  const renderProgress = (
    <Stack
      spacing={1.5}
      sx={{
        py: 5,
        px: { xs: 3, md: 5 },
        borderLeft: (theme) => ({
          md: `dashed 1px ${theme.palette.divider}`,
        }),
        borderRight: (theme) => ({
          md: `dashed 1px ${theme.palette.divider}`,
        }),
      }}
    >
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" component="span" sx={{ width: 42 }}>
          {reviewList.length} avis
        </Typography>

        <LinearProgress
          color="inherit"
          variant="determinate"
          value={(sumBy(reviewList, 'rate') / total) * 100}
          sx={{
            mx: 2,
            flexGrow: 1,
          }}
        />
      </Stack>
    </Stack>
  );

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        sx={{
          py: { xs: 5, md: 0 },
        }}
      >
        {renderSummary}
        {renderProgress}
      </Box>

      <Divider sx={{ borderBottomWidth: 3, mt: 5 }} />

      <ReviewList userId={profil.id} />
    </>
  );
}
