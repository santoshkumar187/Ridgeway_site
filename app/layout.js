import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "6:10 Assistant | Ridgeway Site Intelligence",
  description: "AI-first overnight intelligence platform for Ridgeway Site. Morning briefing, event triage, and drone patrol analysis.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛰️</text></svg>" />
      </head>
      <body className={`${spaceGrotesk.variable} ${plexMono.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
