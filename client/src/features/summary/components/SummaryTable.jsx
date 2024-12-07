import React, { useContext } from 'react';
import formatMoney from '../../../utils/moneyFormatter';
import { ApiContext } from "../../../context/ApiContext";

const SummaryTable = () => {
  const { categorySummary } = useContext(ApiContext);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-xs sm:text-sm">
            <th className="py-2 px-3 sm:px-4 text-left">Category</th>
            <th className="py-2 px-3 sm:px-4 text-right bg-primary font-semibold">
              Current Month
            </th>
            <th className="py-2 px-3 sm:px-4 text-right">Previous Month</th>
            <th className="py-2 px-3 sm:px-4 text-right">Budget</th>
            <th className="py-2 px-3 sm:px-4 text-right">Remaining</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-xs sm:text-sm">
          {categorySummary.data.categories.map((category) => {
            const remaining = category.budget - category.total_expenses;

            return (
              <tr key={category.name} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-2 px-3 sm:px-4 text-left whitespace-nowrap">{category.name}</td>
                <td className="py-2 px-3 sm:px-4 text-right bg-[#e6e5c8] font-medium">{formatMoney(category.total_expenses)}</td>
                <td className="py-2 px-3 sm:px-4 text-right">{formatMoney(category.prev_total_expenses)}</td>
                <td className="py-2 px-3 sm:px-4 text-right">{formatMoney(category.budget)}</td>
                <td className={`py-2 px-3 sm:px-4 text-right ${remaining < 0 ? 'text-tertiary-dark' : ''}`}>
                  {formatMoney(remaining)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;