import "./App.css";
import { Routes, Route } from "react-router-dom";
import { SessionContext } from "./context/SessionContext";
import { useSession } from "@clerk/clerk-react";

import { Expenses, Home, Income, Paycheck, Summary } from "./pages";
import Navbar from "./layouts/Navbar";

function App() {
  const { isLoaded, isSignedIn, session } = useSession();

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex">
      {!isSignedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <SessionContext.Provider value={session}>
          <Navbar />
          <div className="mt-40 w-full h-screen flex flex-col items-center">
            <Routes>
              <Route path="/" element={<Summary />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/income" element={<Income />} />
              <Route path="/income/paycheck" element={<Paycheck/>} />
            </Routes>
          </div>
        </SessionContext.Provider>
      )}
    </div>
  );
}

export default App;
