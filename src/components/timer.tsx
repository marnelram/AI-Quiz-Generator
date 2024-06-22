"use client";

import { useEffect, useState } from "react";

/**
 * Timer Element Props
 *
 * The props for the client timer
 *
 * @todo
 */
export interface TimerProps {
  disabled?: boolean;
  isEnded: boolean;
  stopTimer: (time: number) => void;
}

/**
 * chatTimer Component
 *
 * A page element to display remaining suggested interaction time
 *
 * Behavior:
 * - Displays the remaining time using HTML
 *
 * @todo
 * - implement minutes and seconds display
 * - Implement callback to server when time is 0
 * - Change timer to start when first text is entered...?
 *
 * @bugs
 */
export default function Timer({ disabled, isEnded, stopTimer }: TimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!disabled) {
      if (isEnded) stopTimer(time);

      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isEnded, disabled, stopTimer, time]);

  return (
    <span>
      {Math.floor(time / 60)}min : {(time % 60).toString().padStart(2, "0")}
      sec
    </span>
  );
}
