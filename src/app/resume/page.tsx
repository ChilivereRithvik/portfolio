import { personalInfo } from "@/config/portfolio";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ResumePage() {
  return (
    <main className="pb-24">
      <div className="max-w-2xl mx-auto px-4">
        <div className="border-t border-border pt-12 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">
              {personalInfo.name} Resume
            </h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {personalInfo.heroHeadline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {personalInfo.resumePath && (
              <a
                href={personalInfo.resumePath}
                download
                className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium text-foreground border border-border rounded-md hover:bg-muted transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download CV
              </a>
            )}
            <Link
              href={personalInfo.socialLinks.find((l) => l.icon === "github")?.url || "/"}
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium text-muted-foreground border border-border rounded-md hover:text-foreground hover:bg-muted transition-colors"
            >
              GitHub
            </Link>
          </div>

          {personalInfo.resumePath ? (
            <div className="border border-border rounded-lg overflow-hidden bg-white dark:bg-muted/20">
              <embed
                src={personalInfo.resumePath}
                type="application/pdf"
                className="w-full h-[70vh]"
              />
            </div>
          ) : (
            <div className="border border-border rounded-lg p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Resume PDF not available.
              </p>
            </div>
          )}

          <div className="flex justify-center pt-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-border">
              {personalInfo.profileImage ? (
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted text-sm font-semibold">
                  {personalInfo.displayName?.[0] ?? personalInfo.name[0]}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
