import React, { useContext } from "react";
import formatMoney from "../../../utils/moneyFormatter";
import { ApiContext } from "../../../context/ApiContext";

const SummaryTable = () => {
  const { categorySummary } = useContext(ApiContext);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-xs text-gray-600 sm:text-sm">
            <th className="px-3 py-2 text-left sm:px-4">Category</th>
            <th className="bg-primary px-3 py-2 text-right font-semibold sm:px-4">
              Current Month
            </th>
            <th className="px-3 py-2 text-right sm:px-4">Previous Month</th>
            <th className="px-3 py-2 text-right sm:px-4">Budget</th>
            <th className="px-3 py-2 text-right sm:px-4">Remaining</th>
          </tr>
        </thead>
        <tbody className="text-xs text-gray-600 sm:text-sm">
          {categorySummary.data.categories.map((category) => {
            const remaining = category.budget - category.total_expenses;

            return (
              <tr
                key={category.name}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="whitespace-nowrap px-3 py-2 text-left sm:px-4">
                  {category.name}
                </td>
                <td className="bg-[#e6e5c8] px-3 py-2 text-right font-medium sm:px-4">
                  {formatMoney(category.total_expenses)}
                </td>
                <td className="px-3 py-2 text-right sm:px-4">
                  {formatMoney(category.prev_total_expenses)}
                </td>
                <td className="px-3 py-2 text-right sm:px-4">
                  {formatMoney(category.budget)}
                </td>
                <td
                  className={`px-3 py-2 text-right sm:px-4 ${remaining < 0 ? "text-tertiary-dark" : ""}`}
                >
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
