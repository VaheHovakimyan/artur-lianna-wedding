import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
 const SITE_URL = import.meta.env.VITE_SITE_URL || "https://artur-lianna-wedding.vercel.app";
  const imagePath = "/assets/pair/pair_1.jpg";
  const imageUrl = SITE_URL.replace(/\/$/, "") + imagePath;

  return [
    { title: "Artur & Lianna | Wedding Invitation" },
    { name: "description", content: "Join us for the wedding celebration." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: SITE_URL },
    { property: "og:title", content: "Artur & Lianna | Wedding Invitation" },
    { property: "og:description", content: "Join us for the wedding celebration." },
    { property: "og:image", content: imageUrl },
    { property: "og:image:secure_url", content: imageUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: imageUrl },
  ];
}

export default function Home() {
  return <Welcome />;
}
