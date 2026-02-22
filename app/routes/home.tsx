import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Artur & Lianna | Wedding Invitation" },
    { name: "description", content: "Join us for the wedding celebration." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/assets/pair/pair_1.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: "/assets/pair/pair_1.jpg" },
  ];
}

export default function Home() {
  return <Welcome />;
}
