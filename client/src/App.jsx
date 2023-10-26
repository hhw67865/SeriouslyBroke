import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { SessionContext } from './context/SessionContext';
import { useSession } from "@clerk/clerk-react";

import { Expenses, Home, Income, Summary } from './pages'

function App() {

  const { isLoaded, isSignedIn, session } = useSession();
 
  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {!isSignedIn ? 
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      :
      <SessionContext.Provider value={session}>
        <Routes>
          <Route path="/" element={<Summary/>} />
          <Route path="/expenses" element={<Expenses/>} />
          <Route path="/income" element={<Income/>} />
        </Routes>
      </SessionContext.Provider>
      }
    </>
  )
}

export default App
