import React from 'react';
import formatMoney from "../utils/moneyFormatter";

import {
  MonthNavigation,
  SummaryStatus,
  SummaryChart,
  SummaryTable,
} from "../features/summary";
import { ApiContext } from "../context/ApiContext";
import { useContext } from "react";

const Summary = ({ summaryMonth, setSummaryMonth }) => {
  const apiCalls = useContext(ApiContext);
  return (
    <div className="container mx-auto px-4">
      <div className="sticky top-24 z-50 mx-auto mb-8 max-w-md overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">
        <MonthNavigation
          summaryMonth={summaryMonth}
          setSummaryMonth={setSummaryMonth}
        />
      </div>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-gray-100 p-4 shadow-lg">
            <SummaryStatus summaryMonth={summaryMonth} />
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="mb-8 rounded-lg bg-gray-100 p-4 shadow-lg">
            <SummaryChart />
          </div>
          
          <div className="rounded-lg bg-gray-100 p-4 shadow-lg">
            <SummaryTable summaryMonth={summaryMonth} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
