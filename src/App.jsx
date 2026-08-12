import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {!loggedIn ? (
        <Login onLogin={() => setLoggedIn(true)} />
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App;