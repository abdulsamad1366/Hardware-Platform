export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  origin: string;
}

export const brands: Brand[] = [
  {
    id: "brand-apex",
    name: "Apex Architectural",
    slug: "apex-architectural",
    logo: "/logos/apex.png",
    description: "Premium builder hardware and structural fittings designed for load-bearing applications.",
    origin: "Germany"
  },
  {
    id: "brand-fortress",
    name: "Fortress Locks",
    slug: "fortress-locks",
    logo: "/logos/fortress.png",
    description: "High-grade commercial access controls, cylinders, and panic hardware systems.",
    origin: "Italy"
  },
  {
    id: "brand-vitra",
    name: "Vitra Glass",
    slug: "vitra-glass",
    logo: "/logos/vitra.png",
    description: "Minimalist heavy glass connectors, patch fittings, and sliding glass configurations.",
    origin: "Belgium"
  },
  {
    id: "brand-aurum",
    name: "Aurum Handles",
    slug: "aurum-handles",
    logo: "/logos/aurum.png",
    description: "Luxury cabinet knobs, solid brass handles, and custom hand-forged fittings.",
    origin: "India"
  }
];
