export interface ProductSpecification {
  key: string;
  value: string;
}

export interface ProductDownload {
  title: string;
  url: string;
  type: "pdf" | "dwg";
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  brandId: string;
  images: string[];
  specs: ProductSpecification[];
  sizes: string[];
  finishes: string[];
  downloads: ProductDownload[];
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "prod-dc8000",
    name: "Apex DC-8000 Overhead Door Closer",
    slug: "apex-dc-8000-overhead-door-closer",
    sku: "APX-DC-8000-SS",
    description: "Heavy-duty commercial overhead door closer with adjustable latching, backcheck speed control, and fire-safety ratings.",
    categoryId: "cat-architectural",
    subcategoryId: "sub-closers",
    brandId: "brand-apex",
    images: ["/images/products/dc8000-1.jpg", "/images/products/dc8000-2.jpg"],
    specs: [
      { key: "Closing Force", value: "EN Size 2-6 Adjustable" },
      { key: "Max Door Width", value: "1400 mm" },
      { key: "Fire Rating", value: "UL listed, up to 3 hours" },
      { key: "Tested Cycles", value: "500,000 opening cycles" },
      { key: "Body Material", value: "High-grade Cast Aluminum" }
    ],
    sizes: ["Regular Arm", "Hold-Open Arm", "Slide Track"],
    finishes: ["Satin Stainless Steel", "Matte Black", "Polished Brass"],
    downloads: [
      { title: "Technical Datasheet (PDF)", url: "/catalogues/apex-dc8000-datasheet.pdf", type: "pdf" },
      { title: "CAD Mounting Template (DWG)", url: "/catalogues/apex-dc8000-template.dwg", type: "dwg" }
    ],
    featured: true
  },
  {
    id: "prod-aurum-le10",
    name: "Aurum LE-10 Solid Brass Handle",
    slug: "aurum-le-10-solid-brass-handle",
    sku: "AUR-LE-10-PB",
    description: "Bespoke solid brass lever handle mounted on a circular rose plate, featuring premium ergonomic curvature and mirror finish.",
    categoryId: "cat-architectural",
    subcategoryId: "sub-levers",
    brandId: "brand-aurum",
    images: ["/images/products/aurum-le10-1.jpg"],
    specs: [
      { key: "Material", value: "Solid Forged Brass" },
      { key: "Rose Diameter", value: "52 mm" },
      { key: "Spindle size", value: "8 x 8 mm" },
      { key: "Spring", value: "High-tension return spring" }
    ],
    sizes: ["Standard Rose", "Plate Fix 200mm", "Plate Fix 300mm"],
    finishes: ["Polished Brass", "Antique Bronze", "Satin Nickel"],
    downloads: [
      { title: "Dimension Specifications", url: "/catalogues/aurum-le10-specs.pdf", type: "pdf" }
    ],
    featured: true
  },
  {
    id: "prod-fortress-ml90",
    name: "Fortress ML-90 Euro Mortise Lockcase",
    slug: "fortress-ml-90-euro-mortise-lockcase",
    sku: "FOR-ML-90-GP",
    description: "High-frequency commercial sashlock body featuring a latch-bolt and anti-friction deadbolt. Conforms to DIN 18251 standards.",
    categoryId: "cat-security",
    subcategoryId: "sub-mortise",
    brandId: "brand-fortress",
    images: ["/images/products/fortress-ml90.jpg"],
    specs: [
      { key: "Standard", value: "DIN 18251 Class 3" },
      { key: "Backset", value: "55 mm" },
      { key: "Centers", value: "72 mm" },
      { key: "Bolt throw", value: "20 mm Double Throw" },
      { key: "Forend Width", value: "24 mm" }
    ],
    sizes: ["55mm Backset", "60mm Backset", "65mm Backset"],
    finishes: ["Satin Stainless Steel", "PVD Brass Plated"],
    downloads: [
      { title: "Installation Manual", url: "/catalogues/fortress-ml90-install.pdf", type: "pdf" }
    ],
    featured: false
  },
  {
    id: "prod-fortress-smart",
    name: "Fortress Smart Touch Biometric Lock",
    slug: "fortress-smart-touch-biometric-lock",
    sku: "FOR-SMT-01-BK",
    description: "Enterprise-grade keyless digital smart lock with 3D capacitive fingerprint sensor, secure RFID keycards, and remote gateway integration.",
    categoryId: "cat-security",
    subcategoryId: "sub-digital",
    brandId: "brand-fortress",
    images: ["/images/products/fortress-smart-1.jpg"],
    specs: [
      { key: "Verification Modes", value: "Fingerprint, Passcode, RFID, Mechanical Key" },
      { key: "Fingerprint Capacity", value: "100 unique templates" },
      { key: "Power Supply", value: "4x AA Alkaline Batteries (Backup micro-USB)" },
      { key: "Door Thickness", value: "35 - 65 mm" }
    ],
    sizes: ["Standard Deadlatch", "Split Spindle Mortise"],
    finishes: ["Matte Black", "Graphite Grey"],
    downloads: [
      { title: "User Configuration Guide", url: "/catalogues/fortress-smart-userguide.pdf", type: "pdf" }
    ],
    featured: true
  },
  {
    id: "prod-vitra-pf10",
    name: "Vitra PF-10 Bottom Glass Patch Fitting",
    slug: "vitra-pf-10-bottom-glass-patch-fitting",
    sku: "VIT-PF-10-SS",
    description: "Frameless heavy-duty bottom patch connector designed to pivot tempered glass assemblies. Fully integrated stainless steel cover plate.",
    categoryId: "cat-glass",
    subcategoryId: "sub-patches",
    brandId: "brand-vitra",
    images: ["/images/products/vitra-pf10.jpg"],
    specs: [
      { key: "Glass Thickness", value: "10 - 12 mm tempered" },
      { key: "Max Door Weight", value: "100 kg" },
      { key: "Max Door Width", value: "1100 mm" },
      { key: "Cover Material", value: "SUS 304 Stainless Steel" }
    ],
    sizes: ["Standard Pivot", "Reinforced Plate for 15mm Glass"],
    finishes: ["Satin Stainless Steel", "Polished Chrome", "Matte Black"],
    downloads: [
      { title: "Glazing & Cutout Spec Guide", url: "/catalogues/vitra-pf10-glazing.pdf", type: "pdf" }
    ],
    featured: false
  },
  {
    id: "prod-aurum-tbar",
    name: "Aurum Solid Brass T-Bar Cabinet Pull",
    slug: "aurum-solid-brass-t-bar-cabinet-pull",
    sku: "AUR-TB-05-PB",
    description: "Bespoke solid brass T-bar handle for modular cabinets and luxury kitchen drawers, finished with fine tactile knurled grip detailing.",
    categoryId: "cat-cabinet",
    subcategoryId: "sub-pulls",
    brandId: "brand-aurum",
    images: ["/images/products/tbar-1.jpg"],
    specs: [
      { key: "Material", value: "C3604 Forged Lead-Free Brass" },
      { key: "Grip Pattern", value: "Diamond Knurled" },
      { key: "Thread Size", value: "M4 screw threads" }
    ],
    sizes: ["96 mm CTC", "128 mm CTC", "160 mm CTC", "224 mm CTC"],
    finishes: ["Satin Knurled Gold", "Matte Black Knurled", "Oil Rubbed Bronze"],
    downloads: [
      { title: "Sizing Chart & Screws Spec", url: "/catalogues/aurum-tbar-dimensions.pdf", type: "pdf" }
    ],
    featured: true
  }
];
