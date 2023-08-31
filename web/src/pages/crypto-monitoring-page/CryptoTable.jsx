import { Button } from '@mui/material';
import './CryptoTable.scss';

const CryptoTable = ({ currencies }) => {
  return (
    <>
      <table>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
        {currencies.map((currencie) => (
          <tr key={currencie.id}>
            <td>{currencie.market_cap_rank}</td>
            <td>{` ${currencie.name} / ${currencie.symbol}`}</td>
            <td>{currencie.current_price}</td>
            <td>
              <Button>Details</Button>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default CryptoTable;
