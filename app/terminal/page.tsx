import type { Metadata } from "next";
import Effects from "@/components/Effects";
import SiteBar from "@/components/SiteBar";
import Terminal from "@/components/Terminal";

export const metadata: Metadata = { title: "Terminal", description: "Yashmit Vaish's portfolio, as a shell." };

export default function TerminalPage() {
  return (
    <main id="top">
      <Effects />
      <div className="site">
        <SiteBar back />
        <div className="term-page">
          <Terminal />
        </div>
      </div>
    </main>
  );
}
