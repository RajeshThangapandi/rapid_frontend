import React from 'react';

import DistributionBycity from './components/DistributionBycity';
import NewCustomersAddedOverTime from './components/NewcustomesAdded';
import SalesOvertime from './components/SalesOvertime';
import SalesGrowthRateOverTime from './components/SalesGrowthrate';
import RepeatCustomers from './components/NumberOfrepeat';
import CustomerLifetimeValue from './components/CustomerLifeTimevalue';

// import SalesGrowthRate from './components/SalesGrowthRate';
// import NewCustomersOverTime from './components/NewCustomersOverTime';
// import RepeatCustomers from './components/RepeatCustomers';
// import GeographicalDistribution from './components/GeographicalDistribution';
// import CustomerLifetimeValue from './components/CustomerLifetimeValue';

function App() {
  return (
    <div className="App">
      <h1>E-commerce Analytics Dashboard</h1>
      <SalesOvertime/>
      <SalesGrowthRateOverTime/>
      <RepeatCustomers/>
      <CustomerLifetimeValue/>
      <DistributionBycity/>
     <NewCustomersAddedOverTime/>
    </div>
  );
}

export default App;
