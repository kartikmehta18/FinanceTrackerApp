import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/dashboard";
import Auth from "./Pages/auth";
import { FinincialRecordsProvider } from "./context/financial-record-context";
import { SignedIn, UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <Router>
      <div className="app-container">
        <SignedIn>
          <div className="navbar">
            <h2>FinT</h2>
            {/* <Link to="/">Dashboard</Link> */}

            <UserButton showName />
          </div>
        </SignedIn>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <FinincialRecordsProvider>
                <Dashboard />
              </FinincialRecordsProvider>
            }
          />
          <Route path="/" element={<Auth />} />
        </Routes>
      </div>
      {/* <Foot/> */}
    </Router>
  );
}

export default App;
