import { useCallback, useEffect } from 'react';
import { getUserReviewAction } from 'src/redux/actions/review-action';
import { useDispatch } from 'src/redux/store';

export function useInitial(userId: number) {
  const dispatch = useDispatch();

  const getProductsCallback = useCallback(() => {
    dispatch(getUserReviewAction(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    getProductsCallback();
  }, [getProductsCallback]);

  return null;
}
