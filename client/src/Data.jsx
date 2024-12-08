import { Routes, Route } from "react-router-dom";
import { ApiContext } from "./context/ApiContext";
import {
  Expenses,
  Income,
  Paycheck,
  Summary,
  Assets,
  Categories,
  LoadingPage,
} from "./pages";
import Navbar from "./layouts/Navbar";
import useAxiosGet from "./hooks/useAxiosGet";
import { useState } from "react";

const Data = ({ session }) => {
  const [months, setMonths] = useState(6);
  const [summaryMonth, setSummaryMonth] = useState(new Date());

  const baseApiCalls = {
    transactions: useAxiosGet("/api/asset_transactions", session),
    assetTypes: useAxiosGet("/api/asset_types", session),
    expenses: useAxiosGet("/api/expenses", session),
    categories: useAxiosGet("/api/categories", session),
    paychecks: useAxiosGet("/api/paychecks", session),
    incomeSources: useAxiosGet("/api/income_sources", session),
  };

  const summaryApiCalls = {
    incomeSummary: useAxiosGet(
      `/api/income_summary?months=${months}`,
      session,
      [baseApiCalls.paychecks.data, months],
    ),
    summary: useAxiosGet(
      `/api/budget_status?month=${summaryMonth.getMonth() + 1}&year=${summaryMonth.getFullYear()}`,
      session,
      [summaryMonth, baseApiCalls.expenses.data, baseApiCalls.categories.data],
    ),
    graphData: useAxiosGet(
      `/api/graph_data?month=${summaryMonth.getMonth() + 1}&year=${summaryMonth.getFullYear()}`,
      session,
      [
        summaryMonth,
        baseApiCalls.expenses.data,
        baseApiCalls.categories.data,
        baseApiCalls.paychecks.data,
        baseApiCalls.incomeSources.data,
      ],
    ),
    categorySummary: useAxiosGet(
      `/api/category_summary?month=${summaryMonth.getMonth() + 1}&year=${summaryMonth.getFullYear()}`,
      session,
      [summaryMonth, baseApiCalls.expenses.data, baseApiCalls.categories.data],
    ),
  };

  const apiCalls = {
    ...baseApiCalls,
    ...summaryApiCalls,
    session,
  };

  const isLoading = Object.entries(apiCalls)
    .filter(([key]) => key !== "session")
    .some(([, call]) => !call.data || call.error);

  if (isLoading) {
    return <LoadingPage apiCalls={apiCalls} />;
  }

  return (
    <ApiContext.Provider value={apiCalls}>
      <Navbar />
      <div className="mt-40 flex w-full flex-grow flex-col items-center">
        <Routes>
          <Route
            path="/"
            element={
              <Summary
                summaryMonth={summaryMonth}
                setSummaryMonth={setSummaryMonth}
              />
            }
          />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/expenses/categories" element={<Categories />} />
          <Route
            path="/income"
            element={<Income setMonths={setMonths} months={months} />}
          />
          <Route path="/income/paycheck" element={<Paycheck />} />
          <Route path="/assets" element={<Assets />} />
        </Routes>
      </div>
    </ApiContext.Provider>
  );
};

export default Data;
