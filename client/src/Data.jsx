import { Routes, Route } from "react-router-dom";
import { SessionContext } from "./context/SessionContext";
import {
  Expenses,
  Income,
  Paycheck,
  Summary,
  Assets,
  Categories,
} from "./pages";
import Navbar from "./layouts/Navbar";
import useAxiosGet from "./hooks/useAxiosGet";
import { useEffect, useState } from "react";
import fetchAxios from "./lib/fetchAxios";

const Data = ({ session }) => {
  const [incomeSummary, setIncomeSummary] = useState(null);
  const [months, setMonths] = useState(6);
  const [summaryMonth, setSummaryMonth] = useState(new Date());
  const [summary, setSummary] = useState(null);

  const getTransactions = useAxiosGet("/api/asset_transactions", session);
  const getAssetTypes = useAxiosGet("/api/asset_types", session);
  const getExpenses = useAxiosGet("/api/expenses", session);
  const getCategories = useAxiosGet("/api/categories", session);
  const getPaychecks = useAxiosGet("/api/paychecks", session);
  const getIncomeSources = useAxiosGet("/api/income_sources", session);

  useEffect(() => {
    fetchAxios(
      { method: "GET", url: "/api/income_summary", params: { months: months } },
      session,
    ).then((res) => {
      setIncomeSummary(res.data);
    });
  }, [months, getPaychecks.data]);

  useEffect(() => {
    const month = summaryMonth.getMonth() + 1;
    fetchAxios(
      {
        method: "GET",
        url: "/api/monthly_summary",
        params: { month: month, year: summaryMonth.getFullYear() },
      },
      session,
    ).then((res) => {
      setSummary(res.data);
    });
  }, [
    summaryMonth,
    getExpenses.data,
    getCategories.data,
    getPaychecks.data,
    getIncomeSources.data,
  ]);

  return (
    <SessionContext.Provider value={session}>
      <Navbar />
      <div className="mt-40 flex w-full flex-grow flex-col items-center">
        <Routes>
          <Route
            path="/"
            element={
              summary && (
                <Summary
                  summary={summary}
                  summaryMonth={summaryMonth}
                  setSummaryMonth={setSummaryMonth}
                />
              )
            }
          />
          <Route
            path="/expenses"
            element={
              <Expenses
                getExpenses={getExpenses}
                getCategories={getCategories}
              />
            }
          />
          <Route
            path="/expenses/categories"
            element={
              <Categories
                getExpenses={getExpenses}
                getCategories={getCategories}
              />
            }
          />
          <Route
            path="/income"
            element={
              incomeSummary &&
              <Income
                incomeSummary={incomeSummary}
                setMonths={setMonths}
                months={months}
              />
            }
          />
          <Route
            path="/income/paycheck"
            element={
              <Paycheck
                getPaychecks={getPaychecks}
                getIncomeSources={getIncomeSources}
              />
            }
          />
          <Route
            path="/assets"
            element={
              <Assets
                getAssetTypes={getAssetTypes}
                getTransactions={getTransactions}
              />
            }
          />
        </Routes>
      </div>
    </SessionContext.Provider>
  );
};
export default Data;
