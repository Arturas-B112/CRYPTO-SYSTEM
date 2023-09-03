import { useEffect, useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { getSingleCoinHistory } from '../../api';
import { Stack, LinearProgress, Button } from '@mui/material';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import './SingleCoinChart.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const SingleCoinChart = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    try {
      setIsLoading(true);
      const { data } = await getSingleCoinHistory(coin.id, days, currency);

      setHistoricalData(data.prices);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const coinChartData = historicalData?.map((coin) => ({
    x: coin[0],
    y: Number(coin[1]),
  }));

  const options = {
    responsive: true,
    // maintainAspectRatio: false,
  };

  const data = {
    labels: coinChartData?.map((label) => moment(label.x).format('MMM DD')),
    datasets: [
      {
        fill: true,
        label: `Price ( Past ${days} Days ) in ${currency}`,
        data: coinChartData?.map((value) => value.y),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const chartDays = [
    {
      label: '24 Hours',
      value: 1,
    },
    {
      label: '30 Days',
      value: 30,
    },
    {
      label: '3 Months',
      value: 90,
    },
    {
      label: '1 Year',
      value: 365,
    },
  ];

  return (
    <>
      {isLoading && <LinearProgress />}
      {historicalData && (
        <Stack className="chart-container" justifyContent="center">
          <Line options={options} data={data} />

          <Stack direction="row" spacing={2} justifyContent="center">
            {chartDays.map((day) => (
              <Button
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                }}
                size="large"
              >
                {day.label}
              </Button>
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default SingleCoinChart;
