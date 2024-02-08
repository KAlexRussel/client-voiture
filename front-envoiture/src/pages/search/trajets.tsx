import { Helmet } from 'react-helmet-async';
import  TrajetListView  from 'src/sections/search/view/trajet-list-view';

export default function TrajetPage() {
  return (
    <>
      <Helmet>
        <title> Envoiture | trajets trouvé</title>
      </Helmet>

      <TrajetListView />
    </>
  );
}