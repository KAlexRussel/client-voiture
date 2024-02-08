import { Helmet } from 'react-helmet-async';
import TrajetDetailsView from 'src/sections/search/view/trajet-details-view';

export default function TrajetDetailPage() {
  return (
    <>
      <Helmet>
        <title> Envoiture | trajets info</title>
      </Helmet>

      <TrajetDetailsView />
    </>
  );
}