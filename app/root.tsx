import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import type { Route } from "./+types/root";
import "./app.css";

const backgroundVideoSrc = "/welcome-bg.mp4?v=20260220";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Noto+Serif+Armenian:wght@400;500;600;700&family=Parisienne&family=Playfair+Display:wght@500;600;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoReady(true);
    };

    video.addEventListener("canplay", handleCanPlay);
    // Check if already loaded
    if (video.readyState >= 3) {
      setVideoReady(true);
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  return (
    <div className="app-shell">
      <div className="app-fixed-bg" aria-hidden="true">
        {!videoReady && (
          <img
            src="/assets/fallback-video-image.jpg"
            alt=""
            className="video-poster"
          />
        )}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={videoReady ? "video-visible" : "video-hidden"}
        >
          <source src={backgroundVideoSrc} type="video/mp4" />
        </video>
      </div>
      <div className="app-bg-tint" aria-hidden="true" />
      <motion.div
        className="app-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="app-shell">
      <div className="app-fixed-bg" aria-hidden="true">
        <img
          src="/assets/fallback-video-image.jpg"
          alt=""
          className="video-poster"
        />
        <video autoPlay loop muted playsInline preload="auto">
          <source src={backgroundVideoSrc} type="video/mp4" />
        </video>
      </div>
      <div className="app-bg-tint" aria-hidden="true" />
      <motion.main
        className="app-content error-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h1>{message}</h1>
        <p>{details}</p>
        {stack && (
          <pre className="error-stack">
            <code>{stack}</code>
          </pre>
        )}
      </motion.main>
    </div>
  );
}
