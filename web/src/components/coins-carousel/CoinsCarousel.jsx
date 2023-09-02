import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getTrendingCoins } from '../../api';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { CryptoState } from '../../CryptoContext';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CoinsCarousel = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [refreshInterval, setRefreshInterval] = useState(0);

  const { currency } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await getTrendingCoins(currency);

      setTrendingCoins(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
    setTimeout(() => {
      setRefreshInterval((count) => count + 1);
    }, 120000);
  }, [refreshInterval, currency]);

  const items = trendingCoins.map((coin) => {
    return (
      <Link to={`/coins/${coin.id}`}>
        <Stack gap={1} my={5} alignItems="center">
          <img src={coin.image} alt="Coin logo" style={{ height: '120px' }} />
          <Typography>{coin.name}</Typography>
          <Typography
            style={{
              color: coin.price_change_percentage_24h < 0 ? 'red' : 'green',
            }}
          >{`${coin.price_change_percentage_24h.toFixed(
            2
          )}% / 24h`}</Typography>
        </Stack>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    580: {
      items: 4,
    },
  };

  return (
    <>
      <Typography textAlign="center" variant="h5">
        Trending coins
      </Typography>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        responsive={responsive}
        disableDotsControls
        disableButtonsControls
        autoPlay
        items={items}
      />
    </>
  );
};

export default CoinsCarousel;
