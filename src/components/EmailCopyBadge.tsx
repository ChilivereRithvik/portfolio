"use client";

import { useState } from "react";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";
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
      className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-left text-xs text-white/90 transition-colors hover:bg-white/10 hover:text-white"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      <GmailIcon className="h-4 w-4" />
      <span className="truncate text-white">{email}</span>
      {copied ? (
        <IoCheckmark className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
      ) : (
        <IoCopyOutline className="h-3.5 w-3.5 shrink-0 opacity-60" />
      )}
    </button>
  );
}
