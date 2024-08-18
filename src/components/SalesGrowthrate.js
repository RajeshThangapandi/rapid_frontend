// src/components/SalesGrowthRateOverTime.js
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const SalesGrowthRateOverTime = () => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/sales-growth-rate/')
      .then(response => {
        const data = response.data;

        if (!Array.isArray(data)) {
          throw new Error('Unexpected data format');
        }

        // Prepare data for the chart
        const labels = data.map(item => `${item._id.month}-${item._id.year}`);
        const growthRates = data.map(item => item.growth_rate);

    
        // Set chart options
        setChartOptions({
          chart: {
            type: 'line'
          },
          title: {
            text: 'Sales Growth Rate Over Time'
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
              text: 'Growth Rate (%)'
            }
          },
          series: [{
            name: 'Growth Rate',
            data: growthRates
          }]
        });
      })
      .catch(error => console.error('API Error:', error));
  }, []);

  return (
    <div>
      <h2>Sales Growth Rate Over Time</h2>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: '500px', width: '100%' } }}
      />
    </div>
  );
}

export default SalesGrowthRateOverTime;
