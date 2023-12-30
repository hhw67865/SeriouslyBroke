import { Routes, Route } from "react-router-dom";
import { SessionContext } from "./context/SessionContext";
import {
  Expenses,
  Home,
  Income,
  Paycheck,
  Summary,
  EditExpenses,
  Assets,
  Liabilities,
} from "./pages";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import useAxiosGet from "./hooks/useAxiosGet";
import { useEffect, useState } from "react";
import fetchAxios from "./lib/fetchAxios";

const Data = ({ session, isSignedIn }) => {
  const [graphData, setGraphData] = useState(null);
  const [months, setMonths] = useState(6);

  const getTransactions = useAxiosGet("/api/asset_transactions", session);
  const getAssetTypes = useAxiosGet("/api/asset_types", session);
  const getExpenses = useAxiosGet("/api/expenses", session);
  const getCategories = useAxiosGet("/api/categories", session);
  const getPaychecks = useAxiosGet("/api/paychecks", session);

  useEffect(() => {
    fetchAxios(
      { method: "GET", url: "/api/graph_data", params: { months: months } },
      session,
    ).then((res) => {
      setGraphData(res.data);
    });
  }, [months]);

  return (
    <div className="flex flex-col">
      <main className="mb-10 mt-auto min-h-screen flex-grow">
        {!isSignedIn ? (
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        ) : (
          <SessionContext.Provider value={session}>
            <Navbar />
            <div className="mt-40 flex w-full flex-grow flex-col items-center">
              <Routes>
                <Route path="/" element={<Summary />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/expenses/edit" element={<EditExpenses getExpenses={getExpenses} getCategories={getCategories} />} />
                <Route path="/income" element={<Income graphData={graphData} setMonths={setMonths} months={months} />} />
                <Route path="/income/paycheck" element={<Paycheck getPaychecks={getPaychecks} />} />
                <Route
                  path="/assets"
                  element={
                    <Assets
                      getAssetTypes={getAssetTypes}
                      getTransactions={getTransactions}
                    />
                  }
                />
                <Route path="/liabilities" element={<Liabilities />} />
              </Routes>
            </div>
          </SessionContext.Provider>
        )}
      </main>
      <Footer />
    </div>
  );
};
export default Data;
