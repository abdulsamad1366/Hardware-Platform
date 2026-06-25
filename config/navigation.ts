export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navigationConfig = {
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Solutions", href: "/solutions" },
    { title: "Industries", href: "/industries" },
    { title: "Catalogues", href: "/catalogues" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" }
  ] as NavItem[],
  
  footerGroups: [
    {
      title: "Solutions & Products",
      items: [
        { title: "Architectural Fittings", href: "/products?category=architectural" },
        { title: "Locks & Security Systems", href: "/products?category=security" },
        { title: "Glass System Fittings", href: "/products?category=glass" },
        { title: "Cabinet Handles", href: "/products?category=cabinet" }
      ]
    },
    {
      title: "Resources & Media",
      items: [
        { title: "Product Catalogues", href: "/catalogues" },
        { title: "Industries Served", href: "/industries" },
        { title: "Project Solutions", href: "/solutions" },
        { title: "B2B Case Studies", href: "/solutions#case-studies" }
      ]
    },
    {
      title: "Corporate",
      items: [
        { title: "About Us", href: "/about" },
        { title: "Manufacturing Facility", href: "/about#manufacturing" },
        { title: "Contact Sales", href: "/contact" },
        { title: "Request Quote (RFQ)", href: "/rfq" }
      ]
    }
  ] as NavGroup[],
  
  legalNav: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" }
  ] as NavItem[]
};

export type NavigationConfig = typeof navigationConfig;
