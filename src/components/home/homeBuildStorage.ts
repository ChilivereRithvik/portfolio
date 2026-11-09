const HOME_BUILD_SEEN_KEY = "portfolio-home-build-seen";

export function hasSeenHomeBuild(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(HOME_BUILD_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function markHomeBuildSeen(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(HOME_BUILD_SEEN_KEY, "1");
  } catch {
    /* ignore */
  }
}
