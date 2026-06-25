export interface NavigationItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const headerNavigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Solutions", href: "/solutions" },
  { name: "Industries", href: "/industries" },
  { name: "Catalogues", href: "/catalogues" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export const footerNavigation: NavigationSection[] = [
  {
    title: "Browse Products",
    items: [
      { name: "Architectural Hardware", href: "/products?category=architectural-hardware" },
      { name: "Locks & Security Systems", href: "/products?category=locks-security-systems" },
      { name: "Glass Fittings", href: "/products?category=glass-fittings" },
      { name: "Cabinet Fittings", href: "/products?category=cabinet-furniture-hardware" }
    ]
  },
  {
    title: "B2B Solutions",
    items: [
      { name: "OEM Custom Manufacturing", href: "/solutions#oem" },
      { name: "Project Specifications", href: "/solutions#specs" },
      { name: "Wholesale Distribution", href: "/solutions#distribution" }
    ]
  },
  {
    title: "Platform Info",
    items: [
      { name: "About Us", href: "/about" },
      { name: "Product Catalogues", href: "/catalogues" },
      { name: "Contact Sales", href: "/contact" },
      { name: "Submit RFQ", href: "/rfq" }
    ]
  }
];

export const legalNavigation: NavigationItem[] = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" }
];
