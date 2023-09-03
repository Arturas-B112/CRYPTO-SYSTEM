import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <Stack my={2} mx={2}>
        <Link to={'/'}>
          <Typography variant="h1">Crypto Stash</Typography>
        </Link>
      </Stack>
    </>
  );
};

export default Header;
