// src/components/CityCustomerChart.js
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const DistributionBycity = () => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/geographical-distribution/')
      .then(response => {
        const data = response.data;

        if (!Array.isArray(data)) {
          throw new Error('Unexpected data format');
        }

        // Prepare data for the chart directly from API response
        const cities = data.map(item => item._id); // Adjust based on your API response structure
        const counts = data.map(item => item.customer_count); // Adjust based on your API response structure

        // Set chart options
        setChartOptions({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Customer Distribution by City'
          },
          xAxis: {
            categories: cities,
            title: {
              text: 'City'
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Number of Customers'
            }
          },
          series: [{
            name: 'Customers',
            data: counts
          }]
        });
      })
      .catch(error => console.error('API Error:', error));
  }, []);

  return (
    <div>
      <h2>Customer Distribution by City</h2>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: '500px', width: '100%' } }}
      />
    </div>
  );
}

export default DistributionBycity;
