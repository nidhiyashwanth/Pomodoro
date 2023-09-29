import React, { useState, useEffect } from 'react';

const BreakTimer = ({ onBreakComplete }) => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  const totalSeconds = minutes * 60 + seconds;
  const maxSeconds = 5 * 60;
  const strokeDashoffset = ((totalSeconds / maxSeconds) * Math.PI * (200 - 12 * 2)).toFixed(2);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            onBreakComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, onBreakComplete]);

  const toggleTimer = () => {
    if (isInitial) {
      setIsInitial(false);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsInitial(true);
    setMinutes(5);
    setSeconds(0);
  };

  return (
    <div className="flex flex-col items-center justify-center align-middle">
      <svg className="timer-svg" width="200" height="200">
        <circle
          className="timer-circle-bg"
          stroke="#2565ae"
          strokeWidth="12"
          fill="transparent"
          r={200 / 2 - 12 / 2}
          cx={200 / 2}
          cy={200 / 2}
        />
        {!isInitial && (
          <circle
            className="timer-circle"
            stroke="white"
            strokeWidth="12"
            fill="transparent"
            r={200 / 2 - 12 / 2}
            cx={200 / 2}
            cy={200 / 2}
            style={{
              strokeDasharray: Math.PI * (200 - 12 * 2),
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 1s linear',
            }}
          />
        )}
      </svg>
      <div className="absolute">
        <h1 className='text-3xl m-1 font-bold font-orbitron'>
          {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
        <button onClick={toggleTimer} className='rounded bg-[#2565ae] p-1 m-1 text-white hover:bg-[#0f5298] duration-150 ease-in-out'>
          {isInitial ? 'Start' : isActive ? 'Pause' : 'Resume'}
        </button>
        <button onClick={resetTimer} className='rounded bg-[#2565ae]  p-1 m-1 text-white hover:bg-[#0f5298] duration-150 ease-in-out'>Reset</button>
      </div>
    </div>
  );
};

export default BreakTimer;
