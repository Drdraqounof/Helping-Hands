import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = { title: "Courses | Helping Hands Solutions" };

export default function Page() {
  return <ComingSoon title="Courses" />;
}
