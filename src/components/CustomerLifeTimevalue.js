import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const CustomerLifetimeValue = () => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    axios.get('https://rapid-backend-bxtu.onrender.com/api/customer-lifetime-value/')
      .then(response => {
        const data = response.data;

        // Prepare data for the chart
        const labels = data.map(item => `${item._id.month}-${item._id.year}`);
        const lifetimeValues = data.map(item => item.avg_lifetime_value);

   
        // Set chart options
        setChartOptions({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Customer Lifetime Value by Cohorts'
          },
          xAxis: {
            categories: labels,
            title: {
              text: 'Cohort (Month-Year)'
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Average Lifetime Value'
            }
          },
          series: [{
            name: 'Lifetime Value',
            data: lifetimeValues
          }]
        });
      })
      .catch(error => console.error('API Error:', error));
  }, []);

  return (
    <div>
      <h2>Customer Lifetime Value by Cohorts</h2>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: '500px', width: '100%' } }}
      />
    </div>
  );
}

export default CustomerLifetimeValue;
