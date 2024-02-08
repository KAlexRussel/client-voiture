import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
// hooks
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function ChatNavAccount() {
  const { user } = useAuthContext();

  return (
      <Badge variant='online' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Avatar
          src={user?.imageName}
          alt={user?.fname}
          sx={{ cursor: 'pointer', width: 48, height: 48 }}
        />
      </Badge>
  );
}
