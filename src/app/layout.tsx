import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CurrentYear } from "@/components/CurrentYear";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rithvik — Full-Stack Developer",
    template: "%s | Rithvik",
  },
  description:
    "Full-stack developer focused on scalable backend systems, performance optimization, cloud infrastructure, and practical AI automation.",
  openGraph: {
    type: "website",
    locale: "en-US",
  },
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Blogs", href: "/blogs" },
  { label: "Resume", href: "/resume" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <div className="max-w-2xl mx-auto px-4">
          <header className="h-16 flex items-center justify-between border-b border-border">
            <nav className="flex items-center space-x-6 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </header>
          {children}
          <footer className="border-t border-border py-8 mt-16">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Chiliveri Rithvik · Full-Stack Developer · Hyderabad, India
              </p>
          <p className="text-xs text-muted-foreground">
            © <CurrentYear /> Chiliveri Rithvik. All rights reserved.
          </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
