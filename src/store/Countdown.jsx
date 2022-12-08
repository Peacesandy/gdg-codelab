import { createContext, useEffect, useState } from "react";

export const CountdownContext = createContext({
  countdown: "",
  eventName: "",
  inCountdown: false,
  updateCountdown: (value) => {},
  updateEventName: (value) => {},
  updateInCountdown: (value) => {},
  endCountdown: () => {},
});

export default function Countdown(props) {
  const [countdown, setCountdown] = useState("");
  const [eventName, setEventName] = useState("");
  const [inCountdown, setInCountdown] = useState(false);

  function updateEventName(value) {
    setEventName(value);
  }

  function updateCountdown(value) {
    setCountdown(value);
  }

  function updateInCountdown(value) {
    setInCountdown(value);
  }

  function endCountdown() {
    setEventName("");
    setCountdown("");
    setInCountdown(false);
  }

  // setup persistent storage
  useEffect(() => {
    localStorage.setItem("countdown", countdown);
  }, [countdown]);
  useEffect(() => {
    localStorage.setItem("eventName", eventName);
  }, [eventName]);
  useEffect(() => {
    localStorage.setItem("inCountdown", inCountdown);
  }, [inCountdown]);

  // load items from localstorage
  useEffect(() => {
    const c = localStorage.getItem("countdown");
    const en = localStorage.getItem("eventName");
    const icn = localStorage.getItem("inCountdown");

    c && setCountdown(c);
    en && setEventName(en);
    icn && setInCountdown(icn);
  }, []);

  const value = {
    countdown,
    eventName,
    inCountdown,
    updateCountdown,
    updateEventName,
    updateInCountdown,
    endCountdown,
  };
  return (
    <CountdownContext.Provider value={value}>
      {props.children}
    </CountdownContext.Provider>
  );
}
