import { TRides, TRidesFilters } from 'src/types/ride';
import { TTrajet, TTrajetFilters } from 'src/types/search';

export function applySearchFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: TRides[];
  comparator: (a: any, b: any) => number;
  filters: TRidesFilters;
}) {
  const {
    isBagAllowed,
    isAnimalAllowed,
    isFoodAllowed,
    isMusicAllowed,
    isDetourAllowed,
    price,
    type,
  } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const rides = comparator(a[0], b[0]);
    if (rides !== 0) return rides;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (isBagAllowed) {
    inputData = inputData.filter((ride) => ride.isBagAllowed === isBagAllowed);
  }

  if (isAnimalAllowed) {
    inputData = inputData.filter((ride) => ride.isAnimalAllowed === isAnimalAllowed);
  }

  if (isFoodAllowed) {
    inputData = inputData.filter((ride) => ride.isFoodAllowed === isFoodAllowed);
  }

  if (isMusicAllowed) {
    inputData = inputData.filter((ride) => ride.isMusicAllowed === isMusicAllowed);
  }

  if (isDetourAllowed) {
    inputData = inputData.filter((ride) => ride.isDetourAllowed === isDetourAllowed);
  }

  if (type !== 'tout') {
    inputData = inputData.filter((trajet) => trajet.type === type);
  }

  if (price === 1) {
    inputData = inputData.sort((a, b) => a.price - b.price);
  }
  return inputData;
}
