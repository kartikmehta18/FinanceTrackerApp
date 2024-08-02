
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import './App.css'
import Dashboard from "./Pages/dashboard"
import Auth from "./Pages/auth"
import { FinincialRecordsProvider } from "./context/financial-record-context"
import { SignedIn, UserButton,} from "@clerk/clerk-react"

function App() {
  return <Router>
    <div className="app-container">
      <div className="navbar">
        
        {/* <Link to="/">Dashboard</Link> */}
      <SignedIn>
        <UserButton showName/>
      </SignedIn>
      </div>
      <Routes>
        <Route path="/dashboard" element={<FinincialRecordsProvider>
          <Dashboard/>
          </FinincialRecordsProvider>
        } 
        />
        <Route path="/" element={<Auth />} />
      </Routes>
    </div>
  </Router>

  return (
    <>
      hi
        
    </>
  )
}

export default App
