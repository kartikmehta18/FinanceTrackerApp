import {useUser} from '@clerk/clerk-react'
import { FinancialRecordForm } from './f-r-form';
import { FinancialRecordList } from './f-r-list';
import { useMemo } from 'react';
import { useFincialRecords } from '../../context/financial-record-context';
function Dashboard() {
    const{ user}= useUser();
    const{records}= useFincialRecords();
const totalMonthly = useMemo(() =>{
  let totalAmaount = 0;
  records.forEach((record) => {
    totalAmaount += record.amount;
  });
  return totalAmaount;
}, [records])

    return (
      <div className="dashboard-container">
       <h1>Welcome{user?.firstName}! Here are Your Finances: </h1>
        <FinancialRecordForm/>
        <div>Total Monthly:${totalMonthly}</div>
        <FinancialRecordList/>

      </div>
    )
  }
  
  export default Dashboard
  