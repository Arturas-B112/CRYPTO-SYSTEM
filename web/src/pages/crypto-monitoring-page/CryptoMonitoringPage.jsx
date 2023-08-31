import { useEffect, useState } from 'react';
import { getCrypto } from '../../api';
import CryptoTable from './CryptoTable';
import { LinearProgress } from '@mui/material';

const CryptoMonitoringPage = () => {
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      {isLoading && <LinearProgress />}
      <CryptoTable currencies={currencies} />
    </>
  );
};

export default CryptoMonitoringPage;
