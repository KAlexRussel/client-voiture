import { Helmet } from 'react-helmet-async';
import SearchView from 'src/sections/search/view/search-view'

export default function SearchPage() {
  return (
    <>
      <Helmet>
        <title> Envoiture | Rechercher un trajet</title>
      </Helmet>

      <SearchView />
    </>
  );
}