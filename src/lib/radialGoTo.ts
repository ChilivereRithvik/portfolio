import type { RadialNavItem } from "@/components/radialCursorNavItems";

type AppRouter = { push: (href: string) => void };

function scrollToHash(hash: string) {
  const run = () => {
    document.getElementById(hash)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  requestAnimationFrame(() => requestAnimationFrame(run));
}

export function radialGoTo(item: RadialNavItem, router: AppRouter) {
  if (item.href.startsWith("mailto:")) {
    window.location.href = item.href;
    return;
  }

  if (item.href.includes("#")) {
    const [path, hash] = item.href.split("#");
    const pathname = path || "/";
    if (!hash) {
      router.push(pathname);
      return;
    }
    if (window.location.pathname === pathname) {
      scrollToHash(hash);
      return;
    }
    router.push(pathname);
    setTimeout(() => scrollToHash(hash), 120);
    return;
  }

  router.push(item.href);
}
