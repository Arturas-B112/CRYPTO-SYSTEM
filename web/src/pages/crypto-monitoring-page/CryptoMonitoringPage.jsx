import { useEffect, useState } from 'react';
import { getAllCoins, postUserSearchedCoin } from '../../api';
import CryptoTable from './CryptoTable';
import { Autocomplete, LinearProgress, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../../CryptoContext';
import CoinsCarousel from '../../components/coins-carousel/CoinsCarousel';
import CurrencySelector from '../../components/currency-selector/CurrencySelector';

const CryptoMonitoringPage = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorText, setErrorText] = useState('');
  const [refreshInterval, setRefreshInterval] = useState(0);

  const { currency } = CryptoState();

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

  const handleUserAction = async (body) => {
    try {
      await postUserSearchedCoin({
        name: body.name,
      });
    } catch (error) {
      console.log(error);
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
          getOptionLabel={(coin) => coin.name}
          onChange={(e, coin) => {
            if (coin) {
              navigate(`/coins/${coin.id}`);
              handleUserAction(coin);
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
        <CurrencySelector />
      </Stack>
      {isLoading && <LinearProgress />}
      <CoinsCarousel />
      <CryptoTable coins={coins} />
    </>
  );
};

export default CryptoMonitoringPage;
