import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import Foot from "../../Foot";

function Auth() {
  return (
    <>
      <div className="navbar">
        <h2>FinT</h2>
        {/* <Link to="/">Dashboard</Link> */}
        <div className="sign-in-container">
          <SignedOut>
            <SignUpButton mode="modal" />
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <Navigate to={"/dashboard"} />
          </SignedIn>
        </div>
      </div>
      {/* <div className="sign-in-container">
      <SignedOut>
        <SignUpButton mode="modal"/>
        <SignInButton  mode="modal"/>
      </SignedOut>
      <SignedIn>
        <Navigate to={"/dashboard"}/>
      </SignedIn>
  
    </div> */}
      <h1 className="hi">Finance Management App</h1>
      <div className="hero">
        <img
        className="txt"
          src="https://readme-typing-svg.demolab.com?font=Poppins&size=42&weight=500&height=57&pause=700&width=800&lines=Here+you+can+Manage+Dashboard;Here+you+can+Manage+Expences;Here+you+can+Manage+Savings"
          alt="Typing SVG"
        />
        {/* <Foot/> */}
      </div>
      <img className="iauth" src="https://i.ibb.co/dPJgwrk/Group-39997.png" />
      <br></br>
      <br></br>
      <br></br>
      <Foot/>
      
    </>
  );
}

export default Auth;
