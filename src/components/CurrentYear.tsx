"use client";

export function CurrentYear() {
  return (
    <span suppressHydrationWarning>
      {typeof window !== "undefined" ? new Date().getFullYear() : "—"}
    </span>
  );
}
