export type PageId = "home" | "work" | "profile" | "contact";

export interface NavigationItem {
  id: PageId;
  href: string;
  label: string;
  index: string;
}
