import { personalInfo } from "@/config/portfolio";
import { Download } from "lucide-react";

export default function ResumePage() {
  return (
    <main className="pb-16">
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        <div className="border-t border-border pt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {personalInfo.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {personalInfo.title} · {personalInfo.location}
              </p>
            </div>
            {personalInfo.resumePath && (
              <a
                href={personalInfo.resumePath}
                download
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-muted transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
            )}
          </div>

          {personalInfo.resumePath ? (
            <div className="border border-border rounded-lg overflow-hidden">
              <iframe
                src={personalInfo.resumePath}
                title={`Resume of ${personalInfo.name}`}
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
        </div>
      </div>
    </main>
  );
}
