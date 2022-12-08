import { useContext, useEffect, useState } from "react";
import { CountdownContext } from "../store/Countdown";
import clock from "../assets/clock.png";
import Display from "../components/Display";

export default function Countdown() {
  const { countdown, eventName, updateInCountdown, endCountdown } =
    useContext(CountdownContext);

  const [day, setDay] = useState(0);
  const [hr, setHr] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const future = new Date(countdown).getTime();
      const now = new Date().getTime();
      const spread = future - now;

      setDay(Math.floor(spread / (1000 * 60 * 60 * 24)) ?? 0);
      setHr(
        Math.floor((spread % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) ?? 0
      );
      setMin(Math.floor((spread % (1000 * 60 * 60)) / (1000 * 60)) ?? 0);
      setSec(Math.floor((spread % (1000 * 60)) / 1000) ?? 0);

      // countdown finished running
      if (spread <= 0) {
        alert("Countdown complete");
        updateInCountdown(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="grid md:grid-cols-2 h-full place-items-center">
        {/* countdown */}
        <div className="w-full p-6 md:p-12">
          <p className="text-4xl md:text-5xl font-medium mb-5">
            <span className="text-blue-500 text-5xl font-medium">
              {eventName}
            </span>{" "}
            Happening in
          </p>
          <div className="flex justify-around items-center">
            {/* days */}
            <Display label="Days" value={day} />
            <span className="text-5xl font-bold text-gray-800">:</span>
            <Display label="Hours" value={hr} />
            <span className="text-5xl font-bold text-gray-800">:</span>
            <Display label="Minutes" value={min} />
            <span className="text-5xl font-bold text-gray-800">:</span>
            <Display label="Seconds" value={sec} />
          </div>
        </div>
        {/* image */}
        <div className="-order-1 md:order-last">
          <img src={clock} alt="" className="w-full h-full object-contain" />
        </div>
      </div>
      <button
        className="px-12 tracking-widest py-4 rounded-md bg-blue-700 cursor-pointer text-white hover:bg-blue-800"
        onClick={endCountdown}
      >
        Stop
      </button>
    </div>
  );
}
