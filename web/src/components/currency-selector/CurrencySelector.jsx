import { MenuItem, Select } from '@mui/material';
import { CryptoState } from '../../CryptoContext';

const CurrencySelector = () => {
  const { currency, setCurrency } = CryptoState();

  return (
    <>
      <Select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        style={{ width: '100px' }}
      >
        <MenuItem value={'USD'}>USD</MenuItem>
        <MenuItem value={'EUR'}>EUR</MenuItem>
      </Select>
    </>
  );
};

export default CurrencySelector;
