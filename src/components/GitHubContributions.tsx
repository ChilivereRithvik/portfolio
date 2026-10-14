import { personalInfo } from "@/config/portfolio";
import { GitHubIcon } from "@/components/ui/SocialIcons";

export function GitHubContributions() {
  const githubLink =
    personalInfo.socialLinks.find((l) => l.name === "GitHub");
  const githubUrl = githubLink?.url || "";

  return (
    <section className="py-12">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            GitHub Contributions
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Shipping something, most days.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {githubUrl && (
            <>
              <GitHubIcon className="w-4 h-4 text-muted-foreground" />
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                @{githubUrl.split("/").pop()?.replace(/\/$/, "") || "rithvik"}
              </a>
            </>
          )}
        </div>

        <div className="border border-border rounded-lg p-6 bg-muted/10">
          <p className="text-xs text-muted-foreground">
            Contribution graph rendering requires GitHub API access. For now,
            visit my{" "}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              GitHub profile
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
