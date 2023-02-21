import React, { useEffect, useState } from "react";

function Timer({ duration, onTimeout }) {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((time) => time - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeout();
    }
  }, [timeRemaining, onTimeout]);

  return <div>{timeRemaining} seconds remaining</div>;
}

export default Timer;
