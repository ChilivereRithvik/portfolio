import type { LucideIcon } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
  iconClassName?: string;
};

export const SectionTitle = forwardRef<HTMLHeadingElement, SectionTitleProps>(
  function SectionTitle(
    { icon: Icon, children, className, iconClassName },
    ref
  ) {
    return (
      <h2
        ref={ref}
        className={cn(
          "flex min-h-[1.75rem] items-center gap-2 text-xl font-semibold",
          className
        )}
      >
        <Icon
          className={cn("h-5 w-5 shrink-0", iconClassName)}
          aria-hidden
        />
        <span className="min-w-0">{children}</span>
      </h2>
    );
  }
);
