import { SignedIn, SignedOut, SignInButton, SignUpButton,} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";


function Auth() {
  return (
    <>
    <div className="sign-in-container">
      <SignedOut>
        <SignUpButton mode="modal"/>
        <SignInButton  mode="modal"/>
      </SignedOut>
      <SignedIn>
        <Navigate to={"/dashboard"}/>
      </SignedIn>
  
    </div>
    <h1>Finance Management App</h1>
    <div className="hero">
    <img src="https://readme-typing-svg.demolab.com?font=Poppins&size=42&weight=500&height=57&pause=700&width=800&lines=Here+you+can+Manage+Dashboard;Here+you+can+Manage+Expences;Here+you+can+Manage+Savings" alt="Typing SVG" />
    </div>
    </>
  )
}

export default Auth
