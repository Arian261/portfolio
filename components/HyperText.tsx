"use client";

import { useEffect, useRef, useState } from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface HyperTextProps {
  text: string;
  className?: string;
}

export default function HyperText({ text, className }: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            // اگر حرف پیدا شده، خودش را نشان بده
            if (index < iteration) {
              return text[index];
            }
            // در غیر این صورت حروف تصادفی نشان بده
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join("")
      );

      iteration += 1 / 9; 

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 80); 

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span className={className}>
      {displayText}
    </span>
  );
}