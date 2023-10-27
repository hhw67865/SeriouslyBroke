import "./App.css";
import { Routes, Route } from "react-router-dom";
import { SessionContext } from "./context/SessionContext";
import { useSession } from "@clerk/clerk-react";

import { Expenses, Home, Income, Summary } from "./pages";
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
          <Routes>
            <Route path="/" element={<Summary />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/income" element={<Income />} />
          </Routes>
        </SessionContext.Provider>
      )}
    </div>
  );
}

export default App;
