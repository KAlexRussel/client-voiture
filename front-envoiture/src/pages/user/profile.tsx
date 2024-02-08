import { Helmet } from 'react-helmet-async';
import { UserProfileView } from 'src/sections/user-account/view';

export default function UserProfilePage() {
  return (
    <>
      <Helmet>
        <title> Envoiture | Profile</title>
      </Helmet>

      <UserProfileView />
    </>
  );
}