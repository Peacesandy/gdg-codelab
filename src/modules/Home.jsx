import { useContext } from "react";
import Footer from "../components/Footer";
import { CountdownContext } from "../store/Countdown";

export default function Home() {
  const {
    countdown,
    eventName,
    updateCountdown,
    updateEventName,
    updateInCountdown,
  } = useContext(CountdownContext);

  function onSubmit(e) {
    e.preventDefault();

    const future = new Date(countdown).getTime();
    const now = new Date().getTime();

    // if the future is the past
    if (future <= now) {
      alert("You cannot select a date before now");
      return;
    }

    updateInCountdown(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="font-bold text-4xl mb-3 text-gray-800">Hello There</h1>

      <p className="text-lg max-w-sm text-center mb-10 px-6">
        Enter the name of the event and select a time to begin the countdown
      </p>
      <form className="w-full px-6 md:w-1/2 mx-auto" onSubmit={onSubmit}>
        <div className="w-full">
          <label htmlFor="event" className="text-gray-800">
            Event name
          </label>
          <br />
          <input
            type="text"
            value={eventName}
            onChange={(e) => updateEventName(e.target.value)}
            name="event"
            id="event"
            className="bg-transparent border-2 border-gray-800 outline-none px-2 h-12 rounded-md focus:border-blue-800 transition-all duration-500 w-full"
          />
        </div>

        <div className="w-full mt-10">
          <label htmlFor="event" className="text-gray-800">
            Countdown
          </label>
          <br />
          <input
            type="datetime-local"
            value={countdown}
            onChange={(e) => updateCountdown(e.target.value)}
            name="event"
            id="event"
            className="bg-transparent border-2 border-gray-800 outline-none px-2 h-12 rounded-md focus:border-blue-800 transition-all duration-500 w-full"
          />
        </div>

        <input
          disabled={!eventName || !countdown}
          type="submit"
          value="Start countdown"
          className={`mx-auto block mt-10 px-7 py-4 tracking-widest font-medium rounded-md text-white ${
            !eventName || !countdown
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-700 cursor-pointer hover:bg-blue-800"
          }`}
        />
      </form>

      <Footer />
    </div>
  );
}
