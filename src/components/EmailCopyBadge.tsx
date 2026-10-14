"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { GmailIcon } from "@/components/ui/SocialIcons";

type EmailCopyBadgeProps = {
  email: string;
};

export function EmailCopyBadge({ email }: EmailCopyBadgeProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copyEmail}
      className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      <GmailIcon className="h-4 w-4" />
      <span className="truncate text-foreground">{email}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
      ) : (
        <Copy className="h-3.5 w-3.5 shrink-0 opacity-60" />
      )}
    </button>
  );
}
