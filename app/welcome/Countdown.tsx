import { useEffect, useState } from "react";

type Lang = "hy" | "en";

type CountdownProps = {
  language: Lang;
  target?: string; // ISO date string, defaulted by caller
};

const LABELS: Record<Lang, Record<string, string>> = {
  hy: {
    days: "Օր",
    hours: "Ժամ",
    minutes: "Րոպե",
    seconds: "Վայրկյան",
    finished: "Մենք արդեն միասին ենք",
  },
  en: {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    finished: "We're together",
  },
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Countdown({ language, target }: CountdownProps) {
  const targetDate = target ? new Date(target) : new Date("2026-04-11T00:00:00Z");

  const compute = () => {
    const now = new Date();
    const diff = Math.max(0, targetDate.getTime() - now.getTime());
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds, finished: totalSeconds <= 0 };
  };

  const [state, setState] = useState(() => compute());

  useEffect(() => {
    const iv = setInterval(() => setState(compute()), 1000);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const L = LABELS[language] || LABELS.en;

  if (state.finished) {
    return (
      <div className="countdown finished" aria-live="polite">
        {L.finished}
      </div>
    );
  }

  return (
    <div className="countdown" aria-live="polite">
      <div className="countdown-item">
        <div className="countdown-value">{state.days}</div>
        <div className={`countdown-label countdown-label-${language}`}>{L.days}</div>
      </div>
      <div className="countdown-sep">:</div>
      <div className="countdown-item">
        <div className="countdown-value">{pad(state.hours)}</div>
        <div className={`countdown-label countdown-label-${language}`}>{L.hours}</div>
      </div>
      <div className="countdown-sep">:</div>
      <div className="countdown-item">
        <div className="countdown-value">{pad(state.minutes)}</div>
        <div className={`countdown-label countdown-label-${language}`}>{L.minutes}</div>
      </div>
      <div className="countdown-sep">:</div>
      <div className="countdown-item">
        <div className="countdown-value">{pad(state.seconds)}</div>
        <div className={`countdown-label countdown-label-${language}`}>{L.seconds}</div>
      </div>
    </div>
  );
}
