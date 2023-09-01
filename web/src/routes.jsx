import { createBrowserRouter } from 'react-router-dom';
import PageTemplate from './components/layout/page-template/PageTemplate';
import CryptoMonitoringPage from './pages/crypto-monitoring-page/CryptoMonitoringPage';
import SingleCoinPage from './pages/single-coin-page/SingleCoinPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <PageTemplate />,
    children: [
      {
        path: '/',
        element: <CryptoMonitoringPage />,
      },
      {
        path: '/coins/:id',
        element: <SingleCoinPage />,
      },
    ],
  },
]);
