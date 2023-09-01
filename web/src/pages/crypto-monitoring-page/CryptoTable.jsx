import { Button } from '@mui/material';
import './CryptoTable.scss';

const CryptoTable = ({ currencies, onDetails }) => {
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
          {currencies.map((currency) => (
            <tr key={currency.id}>
              <td>{currency.market_cap_rank}</td>
              <td>{` ${currency.name} / ${currency.symbol}`}</td>
              <td>{`$ ${currency.current_price}`}</td>
              <td>
                <Button onClick={() => onDetails(currency)}>Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CryptoTable;
