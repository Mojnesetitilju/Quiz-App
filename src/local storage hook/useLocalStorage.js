import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const local = localStorage.getItem(key);
    if (local == null) {
      return initialValue;
    } else {
      return JSON.parse(local);
    }
  });

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);
  return [value, setValue];
}
