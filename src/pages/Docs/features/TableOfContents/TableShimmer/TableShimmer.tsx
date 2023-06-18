import React from 'react';
import './TableShimmer.css';
import { Shimmer } from '../../../../../components/Shimmer';


export const TableShimmer: React.FC = () => {


  // -------------------------------------------------------------------------------------------------------------------


  return (
    <div className='toc__shimmer'>
      <Shimmer height={20} width={200}/>
      <Shimmer height={20} width={200}/>
      <Shimmer height={20} width={200}/>
      <Shimmer height={20} width={200}/>
      <Shimmer height={20} width={200}/>
      <Shimmer height={20} width={200}/>
      <Shimmer height={20} width={200}/>
    </div>
  );
};
