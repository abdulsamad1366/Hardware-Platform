export interface Product {
  id: string;
  name: string;
  category: string;
  material: string;
  finish: string;
  code: string;
  image: string;
  href: string;
}

export const products: Product[] = [
  {
    id: "premium-mortise-lock",
    name: "Classic Mortise Lock Body",
    category: "Locks",
    material: "Solid Brass",
    finish: "Satin Brass",
    code: "SL-ML-85S",
    image: "/images/product-locks.png",
    href: "/products/classic-mortise-lock",
  },
  {
    id: "brushed-gold-lever",
    name: "Brushed Gold Lever Handle",
    category: "Door Hardware",
    material: "Stainless Steel 316",
    finish: "Matte Gold Anodized",
    code: "SL-DL-202",
    image: "/images/hero-handle.png",
    href: "/products/brushed-gold-lever",
  },
  {
    id: "glass-patch-fitting",
    name: "Matte Black Patch Connector",
    category: "Glass Hardware",
    material: "High-Grade Aluminium & SS",
    finish: "Matte Black Powder Coated",
    code: "SL-GF-10B",
    image: "/images/cat-glass.png",
    href: "/products/glass-patch-fitting",
  },
  {
    id: "biometric-pivot-smartlock",
    name: "AeroTouch Biometric Smart Lock",
    category: "Smart Locks",
    material: "Zinc Alloy & Tempered Glass",
    finish: "Space Grey & Obsidian Black",
    code: "SL-SL-900X",
    image: "/images/hero-smartlock.png",
    href: "/products/biometric-pivot-smartlock",
  },
  {
    id: "concealed-3d-hinge",
    name: "Concealed 3D Adjustable Hinge",
    category: "Builder Hardware",
    material: "Premium Zinc Alloy",
    finish: "Satin Nickel Lacquered",
    code: "SL-CH-3D",
    image: "/images/hero-hinge.png",
    href: "/products/concealed-3d-hinge",
  },
  {
    id: "architectural-cabinet-pull",
    name: "Linear Knurled Cabinet Pull",
    category: "Furniture Hardware",
    material: "Solid Brass",
    finish: "Brushed Bronze",
    code: "SL-FP-500",
    image: "/images/cat-furniture.png",
    href: "/products/architectural-cabinet-pull",
  },
  {
    id: "heavy-duty-closer",
    name: "Commercial Hydraulic Door Closer",
    category: "Builder Hardware",
    material: "Cast Aluminium & Steel",
    finish: "Silver Lacquered",
    code: "SL-DC-400",
    image: "/images/collection-builder.png",
    href: "/products/heavy-duty-closer",
  },
  {
    id: "digital-rim-smartlock",
    name: "Glass Door Digital Rim Lock",
    category: "Smart Locks",
    material: "Aluminium Alloy",
    finish: "Obsidian Black",
    code: "SL-SL-30R",
    image: "/images/collection-smartlock.png",
    href: "/products/digital-rim-smartlock",
  },
];
