import { createBrowserRouter } from 'react-router-dom';
import PageTemplate from './components/layout/page-template/PageTemplate';
import CryptoMonitoringPage from './pages/crypto-monitoring-page/CryptoMonitoringPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <PageTemplate />,
    children: [
      {
        path: '/',
        element: <CryptoMonitoringPage />,
      },
    ],
  },
]);
