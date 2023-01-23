import React from 'react';
import { Line } from 'react-chartjs-2';
import { parse2GB } from '../../lib/utils/parse2GB';

const LineChart = ({ trafficMonths }) => {
  const barChartData = trafficMonths || [];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Dung lượng sử dụng hàng ngày',
        font: {
          size: 14,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += context.raw + ' GB';
            }
            return label;
          },
        },
      },
    },
  };

  const labels = barChartData?.map((_) => _.date);
  const chartData = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: 'Tải lên',
        data: barChartData?.map((_) => parse2GB(_.download)),
        backgroundColor: 'rgba(53, 162, 235)',
        borderWidth: 1,
      },
      {
        fill: true,
        label: 'Tải xuống',
        data: barChartData?.map((_) => parse2GB(_.upload)),
        backgroundColor: 'rgba(255, 99, 132)',
        borderWidth: 1,
      },
      {
        fill: true,
        label: 'Tổng',
        data: barChartData?.map((_) => parse2GB(_.totalUse)),
        backgroundColor: 'rgba(255, 205, 86)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Line data={chartData} options={options} />
    </>
  );
};

export default LineChart;