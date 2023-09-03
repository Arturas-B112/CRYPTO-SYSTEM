import { useParams } from 'react-router-dom';
import { CryptoState } from '../../CryptoContext';
import { getSingleCoin } from '../../api';
import { LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import CurrencySelector from '../../components/currency-selector/CurrencySelector';
import SingleCoinChart from './SingleCoinChart';

const SingleCoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { currency, symbol } = CryptoState();

  const fetchSingleCoin = async (id) => {
    try {
      setIsLoading(true);

      const { data } = await getSingleCoin(id);

      setCoin(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleCoin(id);
  }, []);

  return (
    <>
      <Stack mx={2} alignItems="flex-end">
        <CurrencySelector />
      </Stack>

      {isLoading && <LinearProgress />}
      {coin && (
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          my={2}
          mx={{ xs: 2, md: 8 }}
          spacing={4}
        >
          <Stack spacing={2} alignItems="center">
            <img
              src={coin.image.large}
              alt="Coin logo"
              style={{ maxwidth: '50%' }}
            />
            <Typography variant="h4">{coin.name}</Typography>
            <Stack>
              <Typography variant="h5">
                Current Price:{' '}
                {coin.market_data.current_price[currency.toLowerCase()]}{' '}
                {symbol}
              </Typography>
              <Typography variant="h5">
                Market Cap:{' '}
                {coin.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)}
                M {symbol}
              </Typography>
              <Typography variant="h5">
                Total Supply: {coin.market_data.total_supply.toFixed(2)}{' '}
                {coin.symbol}
              </Typography>
            </Stack>
          </Stack>

          <SingleCoinChart coin={coin} />
        </Stack>
      )}
    </>
  );
};

export default SingleCoinPage;
