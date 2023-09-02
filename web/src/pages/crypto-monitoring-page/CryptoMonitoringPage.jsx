import { useEffect, useState } from 'react';
import { getAllCoins } from '../../api';
import CryptoTable from './CryptoTable';
import {
  Autocomplete,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../../CryptoContext';
import CoinsCarousel from '../../components/coins-carousel/CoinsCarousel';

const CryptoMonitoringPage = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorText, setErrorText] = useState('');
  const [refreshInterval, setRefreshInterval] = useState(0);

  const { currency, setCurrency } = CryptoState();

  const navigate = useNavigate();

  const fetchAllCoins = async () => {
    try {
      setIsLoading(true);

      const { data } = await getAllCoins(currency);

      setCoins(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCoins();
    setTimeout(() => {
      setRefreshInterval((count) => count + 1);
    }, 120000);
  }, [refreshInterval, currency]);

  const handleInputChange = (e, newValue) => {
    if (newValue.length <= 30) {
      setInputValue(newValue);
    }

    if (
      !coins.some((currency) =>
        currency.name.toLowerCase().includes(newValue.toLowerCase())
      )
    ) {
      setErrorText('No matching options found.');
    } else {
      setErrorText('');
    }
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={1}
        mx={2}
        my={2}
      >
        <Autocomplete
          freeSolo
          options={coins}
          getOptionLabel={(currency) => currency.name}
          onChange={(e, currency) => {
            if (currency) {
              navigate(`/coins/${currency.id}`);
            }
          }}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search..."
              variant="standard"
              error={!!errorText}
              helperText={errorText}
              inputProps={{ ...params.inputProps, maxLength: 30 }}
            />
          )}
        />
        <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <MenuItem value={'USD'}>USD</MenuItem>
          <MenuItem value={'EUR'}>EUR</MenuItem>
        </Select>
      </Stack>
      {isLoading && <LinearProgress />}
      <CoinsCarousel />
      <CryptoTable coins={coins} />
    </>
  );
};

export default CryptoMonitoringPage;
