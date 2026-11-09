import { personalInfo } from "@/config/portfolio";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function resumeEmbedSrc(path: string) {
  return `${path}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&view=FitH`;
}

export default function ResumePage() {
  const github =
    personalInfo.socialLinks.find((l) => l.icon === "github")?.url ?? "/";

  return (
    <main className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-dashed border-border px-4 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border md:h-14 md:w-14">
            {personalInfo.profileImage ? (
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                width={56}
                height={56}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-sm font-semibold">
                {personalInfo.displayName?.[0] ?? personalInfo.name[0]}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-foreground md:text-xl">
              {personalInfo.name}
            </h1>
            <p className="truncate text-xs text-muted-foreground md:text-sm">
              Resume
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {personalInfo.resumePath ? (
            <a
              href={personalInfo.resumePath}
              download
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>
          ) : null}
          <Link
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            GitHub
          </Link>
        </div>
      </div>

      {personalInfo.resumePath ? (
        <div className="relative min-h-0 flex-1 bg-[#525659]">
          <embed
            src={resumeEmbedSrc(personalInfo.resumePath)}
            type="application/pdf"
            title={`${personalInfo.name} resume`}
            className="absolute inset-0 block h-full w-full border-0"
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center border border-border p-8">
          <p className="text-sm text-muted-foreground">
            Resume PDF not available.
          </p>
        </div>
      )}
    </main>
  );
}
