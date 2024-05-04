import { TopBar } from 'components';
import React from 'react';
import BillForm from './components/BillForm';
import { useLazyGetSparePartsListByNameQuery } from './api';

const Billing = () => {
  const [getSparePartsListByName, { data: spareData }] = useLazyGetSparePartsListByNameQuery();

  return (
    <div>
      <TopBar title="Billing" />
      <div className="p-[14px] md:p-6">
        <BillForm isGenerating={false} getSparePartsListByName={getSparePartsListByName} spareData={spareData} />
      </div>
    </div>
  );
};

export default Billing;