import {
  MonthNavigation,
  SummaryStatus,
  SummaryChart,
  SummaryTable,
  YearlySummaryTable,
} from "../features/summary";
import { useEffect, useContext } from "react";
import { ApiContext } from "../context/ApiContext";

const Summary = ({ summaryMonth, setSummaryMonth }) => {
  const apiCalls = useContext(ApiContext);

  const accurateSummary =
    apiCalls.summary.data.month === summaryMonth.getMonth() + 1;
  const accurateGraphData =
    apiCalls.graphData.data.month === summaryMonth.getMonth() + 1;
  const accurateCategorySummary =
    apiCalls.categorySummary.data.month === summaryMonth.getMonth() + 1;

  useEffect(() => {
    if (!accurateSummary) {
      apiCalls.summary.updateData();
    }
    if (!accurateGraphData) {
      apiCalls.graphData.updateData();
    }
    if (!accurateCategorySummary) {
      apiCalls.categorySummary.updateData();
    }
  }, [
    summaryMonth,
    apiCalls.summary.data,
    apiCalls.graphData.data,
    apiCalls.categorySummary.data,
  ]);

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

      <div className="mt-8 rounded-lg bg-gray-100 p-4 shadow-lg">
        <YearlySummaryTable />
      </div>
    </div>
  );
};

export default Summary;
