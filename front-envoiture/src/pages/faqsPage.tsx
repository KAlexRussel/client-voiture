import { Helmet } from 'react-helmet-async';
import  FaqsView  from 'src/sections/faqs/faqs-view';

export default function FaqsPage() {
  return (
    <>
      <Helmet>
        <title> Envoiture | Faqs </title>
      </Helmet>

      <FaqsView />
    </>
  );
}