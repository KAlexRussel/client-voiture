import { Avatar, ListItemText, Rating, Stack, Typography } from '@mui/material';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import { useCallback, useEffect } from 'react';
import { getUserReviewAction } from 'src/redux/actions/review-action';
import { useDispatch, useSelector } from 'src/redux/store';
import { fDate } from 'src/utils/format-time';
import { useInitial } from './utils/init-review';

type Props = {
  userId: number;
};

export default function ReviewList({ userId }: Props) {
  useInitial(userId);
  const { reviewList } = useSelector((state) => state.review);
  return (
    <>
      {reviewList?.map((review) => (
        <Stack
          key={review.id}
          spacing={2}
          direction={{
            xs: 'column',
            md: 'row',
          }}
          sx={{ mt: 5, px: { xs: 2.5, md: 0 } }}
        >
          <Stack
            spacing={2}
            alignItems="center"
            direction={{
              xs: 'row',
              md: 'column',
            }}
            sx={{
              width: { md: 240 },
              textAlign: { md: 'center' },
            }}
          >
            <Avatar
              src={review.user.imageName}
              sx={{
                width: { xs: 48, md: 64 },
                height: { xs: 48, md: 64 },
              }}
            />
            <ListItemText
              primary={review.user.fname}
              secondary={fDate(review.createdAt)}
              primaryTypographyProps={{ noWrap: true, typography: 'subtitle2', mb: 0.5 }}
              secondaryTypographyProps={{
                noWrap: true,
                typography: 'caption',
                component: 'span',
              }}
            />
          </Stack>
          <Stack spacing={1} flexGrow={1}>
            <Rating size="small" value={review.rate} precision={0.1} readOnly />
            <Typography variant="body2">{review.comment}</Typography>
          </Stack>
        </Stack>
      ))}
      {/* <Pagination
        count={10}
        sx={{
          mx: 'auto',
          [`& .${paginationClasses.ul}`]: {
            my: 5,
            mx: 'auto',
            justifyContent: 'center',
          },
        }}
      /> */}
    </>
  );
}
