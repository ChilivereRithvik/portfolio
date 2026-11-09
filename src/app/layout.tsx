import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";
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
  icons: {
    icon: [{ url: "/images/profile.png", type: "image/png" }],
    apple: [{ url: "/images/profile.png", type: "image/png" }],
  },
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
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} min-h-screen bg-[#0a0a0a] text-white antialiased`}
      >
        <div className="mx-auto max-w-4xl border-x border-dashed border-border">
          <header
            data-home-nav
            className="relative z-50 flex h-16 items-center justify-center border-b border-dashed border-border bg-[#0a0a0a]"
          >
            <SiteNav items={navItems} />
          </header>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
