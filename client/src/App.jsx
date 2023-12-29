import "./App.css";

import { useSession } from "@clerk/clerk-react";

import Data from "./Data";

function App() {
  const { isLoaded, isSignedIn, session } = useSession();

  if (!isLoaded) {
    return null;
  }

  return <Data isSignedIn={isSignedIn} session={session} />;
}

export default App;
