import { Helmet } from 'react-helmet-async';
import AboutView from 'src/sections/about-us/about-us-view';

export default function FaqsPage() {
  return (
    <>
      <Helmet>
        <title> Envoiture | Qui sommes-nous </title>
      </Helmet>

      <AboutView />
    </>
  );
}