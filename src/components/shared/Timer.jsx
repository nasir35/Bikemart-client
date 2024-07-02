import { useState, useEffect } from "react";

function Timer({ timeRemainingInSec }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isNaN(timeRemainingInSec)) {
      console.error("Invalid time remaining value provided!");
      return;
    }

    const updateTimer = () => {
      const remaining = timeRemainingInSec - 1;
      setDays(Math.floor(remaining / (60 * 60 * 24)));
      setHours(Math.floor((remaining % (60 * 60 * 24)) / (60 * 60)));
      setMinutes(Math.floor((remaining % (60 * 60)) / 60));
      setSeconds(Math.floor(remaining % 60));
    };

    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [timeRemainingInSec]);

  const timeRemainingText =
    days === 0 && hours === 0
      ? `${minutes}:${seconds.toString().padStart(2, "0")}`
      : `${days}:${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;

  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-4">
        <div className="flex flex-col text-center">
          <span className="text-lg font-bold text-red-500">{days}</span>
          <span className="text-xs">Days</span>
        </div>
        <div className="flex flex-col text-center">
          <span className="text-lg font-bold text-red-500">
            {hours.toString().padStart(2, "0")}
          </span>
          <span className="text-xs">Hours</span>
        </div>
        <div className="flex flex-col text-center">
          <span className="text-lg font-bold text-blue-500">
            {minutes.toString().padStart(2, "0")}
          </span>
          <span className="text-xs">Minutes</span>
        </div>
        <div className="flex flex-col text-center">
          <span className="text-lg font-bold text-blue-500">
            {seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-xs">Seconds</span>
        </div>
      </div>
    </div>
  );
}

export default Timer;
