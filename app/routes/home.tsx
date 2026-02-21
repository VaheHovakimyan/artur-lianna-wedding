import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Artur & Lianna | Wedding Invitation" },
    { name: "description", content: "Join us for the wedding celebration." },
  ];
}

export default function Home() {
  return <Welcome />;
}
