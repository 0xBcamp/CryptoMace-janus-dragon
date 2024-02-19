import React, { useState, useEffect } from "react";

// Define a type for the props
interface CountdownTimerProps {
  expireTimestamp: number; // UNIX timestamp in seconds
}

// Define a type for the time left object
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ expireTimestamp }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference =
      new Date(expireTimestamp * 1000).getTime() - new Date().getTime();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof TimeLeft]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval as keyof TimeLeft]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="text-accent">
      {timerComponents.length ? timerComponents : ""}
    </div>
  );
};

export default CountdownTimer;
