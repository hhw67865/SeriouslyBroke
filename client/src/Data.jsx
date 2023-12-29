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

const Data = ({ session, isSignedIn }) => {
  const getTransactions = useAxiosGet("/api/asset_transactions", session);

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
                <Route path="/expenses/edit" element={<EditExpenses />} />
                <Route path="/income" element={<Income />} />
                <Route path="/income/paycheck" element={<Paycheck />} />
                <Route
                  path="/assets"
                  element={<Assets getTransactions={getTransactions} />}
                />
                <Route path="/assets/transactions" element={null} />
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
