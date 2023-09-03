import { Button, Pagination, Stack } from '@mui/material';
import './CryptoTable.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CryptoState } from '../../CryptoContext';

const CryptoTable = ({ coins }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { symbol } = CryptoState();

  const totalPages = Math.ceil(coins.length / 10);

  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, coins.length);

  const handlePageChange = (e, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coins.slice(startIndex, endIndex).map((coin) => (
            <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>
              <td>
                <Link to={`/coins/${coin.id}`}>
                  <Stack direction="row" alignItems="center" gap={2}>
                    <img src={coin.image} alt="Coin image" />
                    {`${coin.name} / ${coin.symbol}`}
                  </Stack>
                </Link>
              </td>
              <td>{`${symbol} ${coin.current_price}`}</td>
              <td>
                <Button variant="outlined">
                  <Link to={`/coins/${coin.id}`}>Details</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Stack alignItems="center" my={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Stack>
    </>
  );
};

export default CryptoTable;
