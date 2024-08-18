import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const RepeatCustomers = () => {
  const [chartOptions, setChartOptions] = useState({});
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('monthly'); // Default timeframe

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/repeat-customers/')
      .then(response => {
        const data = response.data;

        if (!data || typeof data !== 'object') {
          throw new Error('Unexpected data format: Data is not an object');
        }

        // Select the timeframe based on state
        const selectedData = data[timeframe]; // e.g., 'daily', 'monthly', 'quarterly', 'yearly'

        if (!Array.isArray(selectedData)) {
          throw new Error(`Unexpected data format: ${timeframe} data is not an array`);
        }

        // Prepare data for the chart
        const labels = selectedData.map(item => {
          if (item && item._id) {
            const year = item._id.year;
            const month = item._id.month;
            if (year !== undefined && month !== undefined) {
              return `${year}-${month}`;
            } else {
              console.warn('Unexpected _id format:', item._id);
              return 'Unknown';
            }
          } else {
            console.warn('Unexpected item format:', item);
            return 'Unknown';
          }
        });

        const repeatCustomers = selectedData.map(item => {
          if (item && item.repeat_customers !== undefined) {
            return item.repeat_customers;
          } else {
            console.warn('Missing repeat_customers property:', item);
            return 0;
          }
        });

        // Set chart options
        setChartOptions({
          chart: {
            type: 'line'
          },
          title: {
            text: 'Number of Repeat Customers Over Time'
          },
          xAxis: {
            categories: labels,
            title: {
              text: 'Time Period'
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Number of Repeat Customers'
            }
          },
          series: [{
            name: 'Repeat Customers',
            data: repeatCustomers
          }]
        });
      })
      .catch(error => {
        console.error('API Error:', error);
        setError(error.message);
      });
  }, [timeframe]); // Depend on timeframe to update chart when timeframe changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Number of Repeat Customers Over Time</h2>
      <select onChange={e => setTimeframe(e.target.value)} value={timeframe}>
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="yearly">Yearly</option>
      </select>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: '500px', width: '100%' } }}
      />
    </div>
  );
}

export default RepeatCustomers;
