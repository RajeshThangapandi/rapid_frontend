// src/components/TotalSalesOverTime.js
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const SalesOvertime = () => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/sales-over-time/')
      .then(response => {
        const data = response.data;

      
        if (!Array.isArray(data)) {
          throw new Error('Unexpected data format');
        }

        // Prepare data for the chart
        const labels = data.map(item => `${item._id.month}-${item._id.year}`);
        const sales = data.map(item => item.total_sales);

        // Set chart options
        setChartOptions({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Total Sales Over Time'
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
              text: 'Total Sales'
            }
          },
          series: [{
            name: 'Sales',
            data: sales
          }]
        });
      })
      .catch(error => console.error('API Error:', error));
  }, []);

  return (
    <div>
      <h2>Total Sales Over Time</h2>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: '500px', width: '100%' } }}
      />
    </div>
  );
}

export default SalesOvertime;
