import { TopBar } from 'components';
import React from 'react';
import BillForm from './components/BillForm';

const Billing = () => {
  return (
    <div>
      <TopBar title="Billing" />
      <div className="p-[14px] md:p-6">
        <BillForm isGenerating={false}/>
      </div>
    </div>
  );
};

export default Billing;