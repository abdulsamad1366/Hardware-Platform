export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    id: "cat-architectural",
    name: "Architectural Hardware",
    slug: "architectural-hardware",
    description: "Premium commercial and luxury residential hinges, closers, and structural components.",
    image: "/images/categories/architectural.jpg",
    subcategories: [
      {
        id: "sub-hinges",
        name: "Butt & Pivot Hinges",
        slug: "butt-pivot-hinges",
        description: "Heavy-duty ball-bearing butt hinges and adjustable offset pivot systems."
      },
      {
        id: "sub-closers",
        name: "Door Closers & Floor Springs",
        slug: "door-closers-floor-springs",
        description: "Overhead rack-and-pinion closers and heavy-duty double-action floor springs."
      },
      {
        id: "sub-levers",
        name: "Premium Lever Handles",
        slug: "premium-lever-handles",
        description: "Solid forged brass and stainless steel handles mounted on rose or plate fittings."
      }
    ]
  },
  {
    id: "cat-security",
    name: "Locks & Security Systems",
    slug: "locks-security-systems",
    description: "High-security locking solutions, electronic locks, keying systems, and exit devices.",
    image: "/images/categories/security.jpg",
    subcategories: [
      {
        id: "sub-mortise",
        name: "Mortise Lock Bodies",
        slug: "mortise-lock-bodies",
        description: "Standard sashlocks, deadlocks, and roller bolt locks meeting BS/EN standards."
      },
      {
        id: "sub-cylinders",
        name: "Euro Profile Cylinders",
        slug: "euro-profile-cylinders",
        description: "Anti-snap, anti-pick profile cylinders with master-keying options."
      },
      {
        id: "sub-digital",
        name: "Electronic Smart Locks",
        slug: "electronic-smart-locks",
        description: "Keyless biometric, RFID card, and passcode locking mechanisms."
      }
    ]
  },
  {
    id: "cat-glass",
    name: "Glass Fittings",
    slug: "glass-fittings",
    description: "Frameless glass architecture connectors, patch fittings, and shower enclosures.",
    image: "/images/categories/glass.jpg",
    subcategories: [
      {
        id: "sub-patches",
        name: "Patch Fittings",
        slug: "patch-fittings",
        description: "Base and corner patch fittings for frameless tempered glass doors."
      },
      {
        id: "sub-shower",
        name: "Shower Hinges & Clamps",
        slug: "shower-hinges-clamps",
        description: "Wall-to-glass and glass-to-glass self-closing shower hinges."
      }
    ]
  },
  {
    id: "cat-cabinet",
    name: "Cabinet & Furniture Hardware",
    slug: "cabinet-furniture-hardware",
    description: "Luxury drawer slides, soft-close hinges, and designer cabinet knobs.",
    image: "/images/categories/cabinet.jpg",
    subcategories: [
      {
        id: "sub-pulls",
        name: "Cabinet Pulls & Knobs",
        slug: "cabinet-pulls-knobs",
        description: "Contemporary, modern, and traditional drawer handles."
      },
      {
        id: "sub-slides",
        name: "Soft-Close Drawer Slides",
        slug: "soft-close-drawer-slides",
        description: "Telescopic runner slides and under-mount drawer runner systems."
      }
    ]
  }
];
