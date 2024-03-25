import formatMoney from "../utils/moneyFormatter";

import { MonthNavigation, SummaryStatus, SummaryChart } from "../features/summary"

const Summary = ({ summary, summaryMonth, setSummaryMonth }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="sticky top-24 z-50 mx-auto grid max-w-md grid-cols-1 gap-4 overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">
        <MonthNavigation
          summaryMonth={summaryMonth}
          setSummaryMonth={setSummaryMonth}
        />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg md:grid-cols-2">
        <SummaryStatus summary={summary} summaryMonth={summaryMonth} />
        <SummaryChart summary={summary} />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg md:grid-cols-3">
        <div className="flex flex-col items-center justify-center p-4">
          <div className="font-bold text-gray-700">Expenses</div>
          <div className="text-gray-600">
            {formatMoney(summary.total_expenses)}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="font-bold text-gray-700">Net Income</div>
          <div className="text-gray-600">
            {formatMoney(summary.total_income - summary.total_expenses)}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="font-bold text-gray-700">Income</div>
          <div className="text-gray-600">
            {formatMoney(summary.total_income)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
