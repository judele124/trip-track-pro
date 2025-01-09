import { useState } from "react";

interface useCounterProps {
  length: number;
  initial: number;
}

interface useCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
}

export function useCounter({
  length,
  initial,
}: useCounterProps): useCounterReturn {
  const [count, setCount] = useState<number>(initial);

  const increment = () => setCount((prev) => Math.max(prev - 1, 0));
  const decrement = () => setCount((prev) => Math.min(prev + 1, length - 1));

  return {
    count,
    increment,
    decrement,
    reset: () => setCount(initial),
    setCount,
  };
}
