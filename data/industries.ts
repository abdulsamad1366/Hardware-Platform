export interface Industry {
  id: string;
  name: string;
  slug: string;
  iconName: "Building2" | "Store" | "Home" | "Factory"; // maps to lucide icons
  description: string;
  image: string;
  highlights: string[];
}

export const industries: Industry[] = [
  {
    id: "ind-commercial",
    name: "Commercial & Office Spaces",
    slug: "commercial-office-spaces",
    iconName: "Building2",
    description: "Heavy-duty doors, structural glass partitions, lock cylinders, and panic egress hardware designed for high-frequency daily usage and fire-safety compliance.",
    image: "/images/industries/commercial.jpg",
    highlights: ["Grade 1 Heavy Duty Hardware", "Fire-Rated Egress Devices", "Master Key System Solutions"]
  },
  {
    id: "ind-hospitality",
    name: "Premium Hospitality & Hotels",
    slug: "premium-hospitality-hotels",
    iconName: "Store",
    description: "Bespoke design architectural handles, quiet magnetic locksets, matching hinges, and shower fittings that unify modern interior aesthetics with reliability.",
    image: "/images/industries/hospitality.jpg",
    highlights: ["Aesthetic Finish Matching", "RFID Magnetic Card Locks", "Quiet-Closing Mechanisms"]
  },
  {
    id: "ind-residential",
    name: "Luxury Residential Projects",
    slug: "luxury-residential-projects",
    iconName: "Home",
    description: "Boutique cabinet pulls, knurled T-bars, sliding partition tracks, and smart locks engineered to elevate custom home spaces.",
    image: "/images/industries/residential.jpg",
    highlights: ["Hand-forged Solid Brass Pulls", "Biometric Smart Locks", "Smooth-glide Sliding Tracks"]
  },
  {
    id: "ind-industrial",
    name: "Industrial & Manufacturing Sites",
    slug: "industrial-manufacturing-sites",
    iconName: "Factory",
    description: "Robust utility hinges, heavy deadlocks, corrosion-resistant padlocks, and mechanical closures designed for factories, laboratories, and loading zones.",
    image: "/images/industries/industrial.jpg",
    highlights: ["Corrosion-Resistant Coatings", "High-Weight Load Hinges", "Rugged Keying Systems"]
  }
];
