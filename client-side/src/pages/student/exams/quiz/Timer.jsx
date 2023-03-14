import React, { useEffect, useState } from "react";

function Timer({ h = 1, m = 0, s = 0, onTimeout }) {
  // const [timeRemaining, setTimeRemaining] = useState(duration);

  const [seconds, setSeconds] = useState(s);
  const [minutes, setMinutes] = useState(m);
  const [hours, setHours] = useState(h);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(interval);
          } else {
            setHours((hours) => hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setTimeRemaining((time) => time - 1);
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, []);

  // useEffect(() => {
  //   if (timeRemaining <= 0) {
  //     onTimeout();
  //   }
  // }, [timeRemaining, onTimeout]);

  useEffect(() => {
    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
      onTimeout();
    }
  }, [hours, minutes, seconds, onTimeout]);

  return (
    <div className="text-end p-3 fs-1 fw-bold text-warning">
      {/* {timeRemaining} seconds remaining */}
      <div className="">
        <span className="p-2 border border-3 rounded  mx-1">
          {hours.toString().padStart(2, "0")}
        </span>
        :
        <span className="p-2 border border-3 rounded mx-1">
          {minutes.toString().padStart(2, "0")}
        </span>
        :
        <span className="p-2 border border-3 rounded  mx-1">
          {seconds.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export default Timer;
