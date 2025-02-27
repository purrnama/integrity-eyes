import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en-US", "ms-MY"],

  // Used when no locale matches
  defaultLocale: "en-US",

  pathnames: {
    "/": "/",
    "/procurement-transparency": {
      "en-US": "/procurement-transparency",
      "ms-MY": "/ketelusan-perolehan",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
