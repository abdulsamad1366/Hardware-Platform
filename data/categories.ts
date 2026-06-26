export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: "locks",
    name: "Locks",
    slug: "locks",
    description: "High-security mechanical locks, cylinders, deadbolts, and sashlocks.",
    image: "/images/cat-locks.png",
    productCount: "420+ Products",
    subcategories: ["Mortise Locks", "Padlocks", "Cylinders"],
  },
  {
    id: "door-hardware",
    name: "Door Hardware",
    slug: "door-hardware",
    description: "Premium door handles, levers, pull handles, plates, and accessories.",
    image: "/images/hero-handle.png",
    productCount: "850+ Products",
    subcategories: ["Lever Handles", "Pull Handles", "Door Closers"],
  },
  {
    id: "glass-hardware",
    name: "Glass Hardware",
    slug: "glass-hardware",
    description: "Frameless glass connectors, patch fittings, glass pivots, and sliders.",
    image: "/images/cat-glass.png",
    productCount: "340+ Products",
    subcategories: ["Patch Fittings", "Glass Hinges", "Sliding Systems"],
  },
  {
    id: "furniture-hardware",
    name: "Furniture Hardware",
    slug: "furniture-hardware",
    description: "Luxurious cabinet pulls, drawer slides, furniture hinges, and knobs.",
    image: "/images/cat-furniture.png",
    productCount: "620+ Products",
    subcategories: ["Cabinet Handles", "Drawer Slides", "Knobs"],
  },
  {
    id: "bathroom-accessories",
    name: "Bathroom Accessories",
    slug: "bathroom-accessories",
    description: "Modern shower glass hinges, clamps, towel rails, and soap holders.",
    image: "/images/cat-bathroom.png",
    productCount: "280+ Products",
    subcategories: ["Shower Hinges", "Glass Clamps", "Towel Rails"],
  },
  {
    id: "builder-hardware",
    name: "Builder Hardware",
    slug: "builder-hardware",
    description: "Heavy-duty concealed hinges, door closers, floor springs, and fasteners.",
    image: "/images/hero-hinge.png",
    productCount: "510+ Products",
    subcategories: ["Hinges", "Tower Bolts", "Door Stops"],
  },
  {
    id: "smart-locks",
    name: "Smart Locks",
    slug: "smart-locks",
    description: "Keyless biometric fingerprint locks, numeric keypads, and card systems.",
    image: "/images/hero-smartlock.png",
    productCount: "190+ Products",
    subcategories: ["Digital Locks", "Fingerprint Locks", "RFID Locks"],
  },
  {
    id: "fasteners",
    name: "Fasteners",
    slug: "fasteners",
    description: "High-precision stainless steel bolts, industrial machine screws, and washers.",
    image: "/images/cat-fasteners.png",
    productCount: "1,200+ Products",
    subcategories: ["Bolts", "Nuts", "Screws"],
  },
];
