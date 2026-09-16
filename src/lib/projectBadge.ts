import type { ProjectCategory } from "@/content/projects";

export const BADGE_KEY: Record<
  ProjectCategory,
  "clientBadge" | "productBadge" | "personalBadge" | "conceptBadge"
> = {
  client: "clientBadge",
  product: "productBadge",
  personal: "personalBadge",
  concept: "conceptBadge",
};

export const BADGE_ACCENT: Record<ProjectCategory, boolean> = {
  client: true,
  product: true,
  personal: false,
  concept: false,
};
