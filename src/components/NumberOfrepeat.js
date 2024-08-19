import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const RepeatCustomers = () => {
  const [chartOptions, setChartOptions] = useState({});
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('monthly'); // Default timeframe

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/repeat-customers/`)
      .then(response => {
        const data = response.data;

        if (!data || typeof data !== 'object') {
          throw new Error('Unexpected data format: Data is not an object');
        }

        const selectedData = data[timeframe];

        if (!Array.isArray(selectedData)) {
          throw new Error(`Unexpected data format: ${timeframe} data is not an array`);
        }

        const labels = selectedData.map(item => {
          if (item && item._id) {
            const { year, month, day, quarter } = item._id;
            if (timeframe === 'daily') return `${year}-${month}-${day}`;
            if (timeframe === 'monthly') return `${year}-${month}`;
            if (timeframe === 'quarterly') return `${year}-Q${quarter}`;
            if (timeframe === 'yearly') return `${year}`;
          }
          return 'Unknown';
        });

        const repeatCustomers = selectedData.map(item => item.repeat_customers || 0);

        setChartOptions({
          title: { text: `Repeat Customers (${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)})` },
          xAxis: { categories: labels },
          yAxis: { title: { text: 'Number of Repeat Customers' } },
          series: [{ name: 'Repeat Customers', data: repeatCustomers }],
        });
      })
      .catch(error => setError(error.message));
  }, [timeframe]);

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <div>
        <label>Select Timeframe: </label>
        <select onChange={handleTimeframeChange} value={timeframe}>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default RepeatCustomers;
