// src/components/NewCustomersAddedOverTime.js
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const NewCustomersAddedOverTime = () => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/new-customers-over-time/')
      .then(response => {
        const data = response.data;

        if (!Array.isArray(data)) {
          throw new Error('Unexpected data format');
        }

        // Prepare data for the chart
        const labels = data.map(item => `${item._id.month}-${item._id.year}`);
        const newCustomers = data.map(item => item.new_customers);

        // Set chart options
        setChartOptions({
          chart: {
            type: 'line'
          },
          title: {
            text: 'New Customers Added Over Time'
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
              text: 'Number of New Customers'
            }
          },
          series: [{
            name: 'New Customers',
            data: newCustomers
          }]
        });
      })
      .catch(error => console.error('API Error:', error));
  }, []);

  return (
    <div>
      <h2>New Customers Added Over Time</h2>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: '500px', width: '100%' } }}
      />
    </div>
  );
}

export default NewCustomersAddedOverTime;
