import { Button, Pagination, Stack } from '@mui/material';
import './CryptoTable.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CryptoTable = ({ currencies, onDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(currencies.length / 10);

  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, currencies.length);

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
          {currencies.slice(startIndex, endIndex).map((currency) => (
            <tr key={currency.id}>
              <td>{currency.market_cap_rank}</td>
              <td>{` ${currency.name} / ${currency.symbol}`}</td>
              <td>{`$ ${currency.current_price}`}</td>
              <td>
                <Button variant="outlined">
                  <Link to={`/coins/${currency.id}`}>Details</Link>
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
