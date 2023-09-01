import { useEffect, useState } from 'react';
import { getCrypto } from '../../api';
import CryptoTable from './CryptoTable';
import { Autocomplete, LinearProgress, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CryptoMonitoringPage = () => {
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorText, setErrorText] = useState('');

  const navigate = useNavigate();

  const fetchCurrencies = async () => {
    try {
      setIsLoading(true);

      const { data } = await getCrypto();

      setCurrencies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleInputChange = (e, newValue) => {
    if (newValue.length <= 30) {
      setInputValue(newValue);
    }

    if (
      !currencies.some((currency) =>
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
      <Stack direction="row" gap={1} mx={2}>
        <Autocomplete
          freeSolo
          options={currencies}
          getOptionLabel={(currency) => currency.name}
          onChange={(e, currency) => {
            if (currency) {
              navigate(`/coins/${currency.id}`, { state: { currency } });
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
      </Stack>
      {isLoading && <LinearProgress />}
      <CryptoTable
        currencies={currencies}
        onDetails={(currency) => {
          navigate(`/coins/${currency.id}`, { state: { currency } });
        }}
      />
    </>
  );
};

export default CryptoMonitoringPage;
