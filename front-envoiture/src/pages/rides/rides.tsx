import { Helmet } from 'react-helmet-async';
import RideView from 'src/sections/rides/view/ride-view';

export default function RidePage() {
  return (
    <>
      <Helmet>
        <title> Envoiture | Publier un trajet</title>
      </Helmet>

      <RideView />
    </>
  );
}