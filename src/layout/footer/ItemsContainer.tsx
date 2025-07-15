import React from 'react';
import Items from './Items';
import { COMPANY, HELP, POLICY } from './Menus';

const ItemsContainer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
      <Items Links={COMPANY} title="Company" />
      <Items Links={HELP} title="Help" />
      <Items Links={POLICY} title="Policy" />

         <div>
          <h1 className='font-semibold'>Address</h1>
          <div className='mt-4'>
            <p>Graviq Private Limited,
              302022 Sitapura Industrial Area,
              Industrial Area ,Jaipur</p>

              <div className='flex mt-5 gap-2'>
              <h2 className='font-semibold'>Mail us : </h2>
              <p>xxxyyy@RentIt.in</p>
              </div>
          </div>
        </div>
    </div>
  );
};

export default ItemsContainer;
