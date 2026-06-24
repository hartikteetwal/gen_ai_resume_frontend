import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

import React from 'react'

const Protected = ({children}) => {
    const { loading, user } = useAuth()
    
  if (loading) {
    return (
      <main className="reports-container">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <h1>Loading Fatching User...</h1>
          <p>Please wait while we validate user login or not</p>
        </div>
      </main>
    )
  }


    if (!user) {
        return <Navigate to={"/login"}/>
    }

  return (
    <div>
      {children}
    </div>
  )
}

const AuthProtected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <main className="reports-container">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <h1>Loading Fatching User...</h1>
          <p>Please wait while we validate user login or not</p>
        </div>
      </main>
    )
  }

  // Logged in user ko home bhejo
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Logged out user ko login page dikhao
  return children;
};

export {Protected,AuthProtected}
