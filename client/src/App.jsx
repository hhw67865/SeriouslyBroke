import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import { useSession } from "@clerk/clerk-react";
import Footer from "./layouts/Footer";
import LoginCheck from "./LoginCheck";

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
            <Route path="*" element={<Home />} />
          </Routes>
        ) : (
          <LoginCheck session={session} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
