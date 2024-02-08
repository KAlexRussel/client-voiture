import { Helmet } from 'react-helmet-async';
import { HomeView } from 'src/sections/home';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Envoiture | Accueil </title>
      </Helmet>

      <HomeView />
    </>
  );
}
