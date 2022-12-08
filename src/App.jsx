import React, { useContext } from "react";
import "./index.css";
import Countdown from "./modules/Countdown";
import Home from "./modules/Home";
import { CountdownContext } from "./store/Countdown";

export default function App() {
  const { inCountdown } = useContext(CountdownContext);
  return (
    <div className="min-h-[100vh] bg-gray-300">
      {!inCountdown ? <Home /> : <Countdown />}
    </div>
  );
}
