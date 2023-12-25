import "./App.css";
import { Routes, Route } from "react-router-dom";
import { SessionContext } from "./context/SessionContext";
import { useSession } from "@clerk/clerk-react";

import {
  Expenses,
  Home,
  Income,
  Paycheck,
  Summary,
  EditExpenses,
} from "./pages";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

function App() {
  const { isLoaded, isSignedIn, session } = useSession();

  if (!isLoaded) {
    return null;
  }

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
                <Route path="/income" element={<Income />} />
                <Route path="/income/paycheck" element={<Paycheck />} />
                <Route path="/expenses/edit" element={<EditExpenses />} />
              </Routes>
            </div>
          </SessionContext.Provider>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
