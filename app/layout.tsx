import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

// Clean grotesk sans for body copy, UI and navigation.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Placeholder editorial display serif for headings, standing in until a
// licensed/confirmed brand typeface is chosen — see
// .claude/skills/kmd-interior-design/SKILL.md §3.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const SITE_DESCRIPTION =
  "KMD Interior is a Mumbai design and artistry contracting firm with over 11 years of experience — interior design, turnkey contracting and custom carpentry, delivered by one team.";

/**
 * metadataBase is the domain the new site will replace the current one
 * on. [CONFIRM: change this if the redesign launches on a different
 * domain] — relative OG image URLs are resolved against it.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://kmdinterior.com"),
  title: {
    default: "KMD Interior — Interior Design & Turnkey Contracting, Mumbai",
    template: "%s | KMD Interior",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "KMD Interior",
    locale: "en_IN",
    title: "KMD Interior — Interior Design & Turnkey Contracting, Mumbai",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/projects/entrance-brass-screen.webp",
        width: 2048,
        height: 1536,
        alt: "Entrance threshold framed by sliding brass screens etched with a gold floral motif, set into book-matched white marble",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Reveal animations are Framer Motion, which serialises its
            `initial` variant into the server HTML as an inline style —
            eighteen elements on the homepage alone ship as
            `opacity:0`, the <h1> among them. With JavaScript enabled
            that is invisible for a few hundred milliseconds and then
            animates in. With JavaScript disabled, or if hydration
            fails, it is permanent: the headline, the section titles
            and the intro copy never appear at all, even though the
            text is present in the markup. This restores them for that
            case only, and costs nothing when scripting is on. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="transform:"],[style*="clip-path"]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
