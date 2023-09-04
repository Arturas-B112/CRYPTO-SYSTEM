import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CurrencySelector from '../currency-selector/CurrencySelector';

const Header = () => {
  return (
    <>
      <Stack my={2} mx={2} direction="row" justifyContent="space-between">
        <Link to={'/'}>
          <Typography variant="h1">Crypto Stash</Typography>
        </Link>
        <CurrencySelector />
      </Stack>
    </>
  );
};

export default Header;
