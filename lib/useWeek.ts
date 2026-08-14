"use client";

import { useEffect, useState } from "react";

export type Week = 1 | 2;

const KEY = "gymform:week";
const EVENT = "gymform:week-change";

/**
 * Which week of the A/B rotation you're on. Persisted so the choice survives
 * navigating between the session list and an exercise, and broadcast so every
 * mounted component agrees without a provider.
 */
export function useWeek(): [Week, (w: Week) => void] {
  const [week, setWeek] = useState<Week>(1);

  useEffect(() => {
    const read = () => {
      const v = localStorage.getItem(KEY);
      setWeek(v === "2" ? 2 : 1);
    };
    read();
    window.addEventListener(EVENT, read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener(EVENT, read);
      window.removeEventListener("storage", read);
    };
  }, []);

  const set = (w: Week) => {
    localStorage.setItem(KEY, String(w));
    setWeek(w);
    window.dispatchEvent(new Event(EVENT));
  };

  return [week, set];
}
