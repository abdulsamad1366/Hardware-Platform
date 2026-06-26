export interface Collection {
  id: string;
  name: string;
  description: string;
  productCount: string;
  image: string;
  href: string;
}

export const collections: Collection[] = [
  {
    id: "locks",
    name: "Locks",
    description: "Premium mortise locks, cylinders and security systems.",
    productCount: "420 Products",
    image: "/images/collection-locks.png",
    href: "/products?category=Locks",
  },
  {
    id: "glass-hardware",
    name: "Glass Hardware",
    description: "Frameless glass connectors, patch fittings and pivot systems.",
    productCount: "340 Products",
    image: "/images/collection-glass.png",
    href: "/products?category=Glass%20Hardware",
  },
  {
    id: "smart-locks",
    name: "Smart Locks",
    description: "Next-generation biometric keyless entry and home security.",
    productCount: "190 Products",
    image: "/images/collection-smartlock.png",
    href: "/products?category=Smart%20Locks",
  },
  {
    id: "builder-hardware",
    name: "Builder Hardware",
    description: "Concealed hinges, heavy-duty pivots and commercial accessories.",
    productCount: "510 Products",
    image: "/images/collection-builder.png",
    href: "/products?category=Builder%20Hardware",
  },
  {
    id: "furniture-hardware",
    name: "Furniture Hardware",
    description: "Luxurious cabinet pulls and fittings for modern residential kitchen design.",
    productCount: "620 Products",
    image: "/images/collection-furniture.png",
    href: "/products?category=Furniture%20Hardware",
  },
  {
    id: "door-hardware",
    name: "Door Hardware",
    description: "Elegant handles, pulls and premium entrance accessories.",
    productCount: "850 Products",
    image: "/images/collection-door.png",
    href: "/products?category=Door%20Hardware",
  },
];
