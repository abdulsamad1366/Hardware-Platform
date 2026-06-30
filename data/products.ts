export interface Product {
  id: string;
  name: string;
  category: string;
  material: string;
  finish: string;
  code: string;
  image: string;
  href: string;
  price: number;
  rating: number;
  popularity: number;
  dateAdded: string; // YYYY-MM-DD
  application: "Commercial" | "Residential" | "Both";
  featured?: boolean;
  description: string;
  datasheet?: string;
  specifications: Record<string, string>;
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
    price: 4500,
    rating: 4.8,
    popularity: 95,
    dateAdded: "2026-01-10",
    application: "Both",
    featured: true,
    description: "Engineered for high-security commercial and luxury residential layouts. Made of solid brass with a hardened steel deadbolt for superior security and cycle wear resistance.",
    datasheet: "/catalogues/locks-catalogue.pdf",
    specifications: {
      "Backset": "60mm",
      "Distance": "85mm",
      "Cycle Test": "200,000 Cycles Certified",
      "Warranty": "5 Years Manufacturer Warranty",
      "Package Includes": "Lock Body, Strike Plate, Securing Screws"
    }
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
    price: 8500,
    rating: 4.9,
    popularity: 98,
    dateAdded: "2026-02-15",
    application: "Both",
    featured: true,
    description: "Premium European design lever door handle set. Crafted from high-grade marine-grade SS316, finished in custom matte gold anodized to resist corrosion and tarnishing.",
    datasheet: "/catalogues/door-hardware-catalogue.pdf",
    specifications: {
      "Spindle Size": "8 x 8 mm",
      "Door Thickness": "35mm - 55mm compatible",
      "Testing Standards": "EN 1906 Class 4 Certified",
      "Finish Durability": "AASS 96 hours Salt Spray tested",
      "Warranty": "10 Years Grade Warranty"
    }
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
    price: 3200,
    rating: 4.6,
    popularity: 82,
    dateAdded: "2026-03-20",
    application: "Commercial",
    featured: true,
    description: "Bottom glass patch fitting designed for heavy toughened glass pivot doors. Constructed using high-strength aluminum body with SS304 cover plate in matte black.",
    datasheet: "/catalogues/glass-hardware-catalogue.pdf",
    specifications: {
      "Glass Thickness": "10mm - 12mm Toughened Glass",
      "Max Door Weight": "100 kg",
      "Pivot Connection": "Standard Euro Pivot Profile",
      "Material": "SS304 Covers with Aluminum Die-Cast Core",
      "Warranty": "2 Years Manufacturer Warranty"
    }
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
    price: 24500,
    rating: 4.9,
    popularity: 99,
    dateAdded: "2026-04-05",
    application: "Both",
    featured: true,
    description: "Elite security solution for main entrance pivot doors. Integrates 3D semiconductor fingerprint scanner, RFID access, passcode digits, and Bluetooth app connectivity.",
    datasheet: "/catalogues/smart-locks-catalogue.pdf",
    specifications: {
      "Access Modes": "Fingerprint, Passcode, RFID Card, App, Mechanical Key",
      "Fingerprint Capacity": "100 Unique Templates",
      "Power Source": "4x AA Batteries (Type-C Emergency Port)",
      "Battery Life": "Approx. 10-12 Months (10 openings/day)",
      "Encryption": "AES 128-bit Industrial Grade Security"
    }
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
    price: 2800,
    rating: 4.7,
    popularity: 88,
    dateAdded: "2026-01-22",
    application: "Residential",
    featured: true,
    description: "Invisible hinge solution for modern flush interior doors. Allows three-dimensional adjustment (vertical, horizontal, and depth) after door installation.",
    datasheet: "/catalogues/builder-hardware-catalogue.pdf",
    specifications: {
      "Load Capacity": "80 kg (For 2 Hinges)",
      "Opening Angle": "180 Degrees",
      "Adjustability": "X: ±3mm, Y: ±2mm, Z: ±1mm",
      "Min Door Thickness": "38mm",
      "Warranty": "5 Years Certified Warranty"
    }
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
    price: 1200,
    rating: 4.8,
    popularity: 91,
    dateAdded: "2026-05-18",
    application: "Residential",
    featured: true,
    description: "Luxury knurled cabinet handle with solid brass backplate. Features diamond-cut linear knurling that provides an ergonomic feel and high-end visual aesthetic.",
    datasheet: "/catalogues/furniture-hardware-catalogue.pdf",
    specifications: {
      "Hole Centre Distance": "160mm / 224mm customizable",
      "Overall Length": "210mm",
      "Width": "12mm",
      "Fixing Screws": "M4 screws included",
      "Warranty": "2 Years Finish Warranty"
    }
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
    price: 6500,
    rating: 4.5,
    popularity: 85,
    dateAdded: "2026-02-10",
    application: "Commercial",
    featured: true,
    description: "Heavy-duty rack and pinion hydraulic door closer with adjustable closing speed and latching speed. Designed for high-frequency fire doors and emergency exits.",
    datasheet: "/catalogues/builder-hardware-catalogue.pdf",
    specifications: {
      "Power Size": "Adjustable Size 2 to 6",
      "Max Door Width": "1400mm",
      "Testing Certs": "UL Listed, Fire Rated 3 Hours",
      "Mechanism": "Rack and Pinion, Hydraulic Oil filled",
      "Warranty": "10 Years Commercial Warranty"
    }
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
    price: 16500,
    rating: 4.7,
    popularity: 93,
    dateAdded: "2026-03-01",
    application: "Commercial",
    featured: true,
    description: "Keyless rim lock designed specifically for frameless double glass doors. No drilling required, fits securely using strong adhesive brackets and clamping system.",
    datasheet: "/catalogues/smart-locks-catalogue.pdf",
    specifications: {
      "Unlock Options": "Fingerprint, Password, RFID, Remote Control (Optional)",
      "Glass Type": "10mm to 12mm frameless glass",
      "User Capacity": "200 Users (Fingerprint + Card)",
      "Standby Power": "Micro-USB Emergency Power",
      "Warranty": "1.5 Years Replacement Warranty"
    }
  },
  {
    id: "modern-tbar-pull",
    name: "Stainless Steel T-Bar Pull",
    category: "Furniture Hardware",
    material: "Stainless Steel 304",
    finish: "Brushed Stainless Steel",
    code: "SL-CP-304",
    image: "/images/collection-furniture.png",
    href: "/products/modern-tbar-pull",
    price: 950,
    rating: 4.5,
    popularity: 76,
    dateAdded: "2026-05-24",
    application: "Residential",
    featured: false,
    description: "Minimalist industrial style T-bar drawer and cabinet handle. Crafted from hollow stainless steel tubing for cost-effectiveness without sacrificing modern look.",
    datasheet: "/catalogues/furniture-hardware-catalogue.pdf",
    specifications: {
      "Hole Centres": "128mm / 160mm",
      "Diameter": "12mm",
      "Projection": "32mm",
      "Finish": "Fine linear satin brushed",
      "Warranty": "1 Year Grade Guarantee"
    }
  },
  {
    id: "architectural-glass-hinge",
    name: "Glass-to-Glass Shower Hinge",
    category: "Glass Hardware",
    material: "Solid Brass",
    finish: "Polished Chrome",
    code: "SL-GH-400",
    image: "/images/collection-glass.png",
    href: "/products/glass-to-glass-hinge",
    price: 5800,
    rating: 4.7,
    popularity: 80,
    dateAdded: "2026-03-12",
    application: "Both",
    featured: false,
    description: "Premium heavy-duty 90-degree glass-to-glass shower door hinge. Features spring action return to center from 25 degrees in either direction.",
    datasheet: "/catalogues/glass-hardware-catalogue.pdf",
    specifications: {
      "Glass Thickness": "8mm to 12mm Tempered Glass",
      "Max Capacity": "45 kg (for 2 hinges)",
      "Material": "Solid Forged Brass body with SS316 springs",
      "Open Action": "Self-closing at 25 degrees",
      "Warranty": "3 Years Leakproof Warranty"
    }
  },
  {
    id: "heavy-duty-mortise-cylinder",
    name: "Brass Double Euro Cylinder",
    category: "Locks",
    material: "Solid Brass",
    finish: "Satin Chrome",
    code: "SL-MC-01",
    image: "/images/collection-locks.png",
    href: "/products/double-euro-cylinder",
    price: 1800,
    rating: 4.6,
    popularity: 74,
    dateAdded: "2026-01-30",
    application: "Commercial",
    featured: false,
    description: "High-security double cylinder profile key system. Features 10-pin dimple mechanism with anti-pick, anti-drill, and anti-snap construction.",
    datasheet: "/catalogues/locks-catalogue.pdf",
    specifications: {
      "Profile Type": "Euro Profile Double Keyed",
      "Cylinder Length": "70mm (35/35 configuration)",
      "Key Profile": "Reversible dimple key with code card",
      "Pin Count": "10 Pins in two horizontal rows",
      "Warranty": "5 Years Security Grade Warranty"
    }
  },
  {
    id: "hex-fastener-set",
    name: "Industrial Hex Head Bolt Pack",
    category: "Fasteners",
    material: "High-Tensile Steel",
    finish: "Zinc Plated",
    code: "SL-FS-88",
    image: "/images/cat-fasteners.png",
    href: "/products/hex-fastener-set",
    price: 350,
    rating: 4.4,
    popularity: 60,
    dateAdded: "2026-05-02",
    application: "Commercial",
    featured: false,
    description: "Grade 8.8 high-tensile carbon steel hex head bolts. Fully threaded configuration suitable for heavy industrial, structural, and builder connections.",
    datasheet: "/catalogues/fasteners-catalogue.pdf",
    specifications: {
      "Thread Size": "M12 standard ISO thread",
      "Length": "50mm",
      "Strength Class": "Grade 8.8 High-Tensile Steel",
      "Pack Qty": "50 Pieces per box",
      "Testing Standard": "DIN 933 Metric Specifications"
    }
  },
  {
    id: "luxury-towel-ring",
    name: "Luxury Gold Towel Ring",
    category: "Bathroom Accessories",
    material: "Solid Brass",
    finish: "Matte Gold",
    code: "SL-BA-12",
    image: "/images/cat-bathroom.png",
    href: "/products/luxury-towel-ring",
    price: 3900,
    rating: 4.8,
    popularity: 84,
    dateAdded: "2026-05-10",
    application: "Residential",
    featured: false,
    description: "Architectural wall-mounted towel loop for master bathrooms. Modern circular silhouette with concealed screw brackets for a seamless mount.",
    datasheet: "/catalogues/bathroom-accessories.pdf",
    specifications: {
      "Mounting type": "Concealed Wall Mounting (Screws + Anchors included)",
      "Ring Diameter": "160mm",
      "Material": "Corrosion-resistant forged solid brass",
      "Finish": "PVD Matte Gold surface treatment",
      "Warranty": "5 Years Plating Warranty"
    }
  },
  {
    id: "shower-door-handle",
    name: "Back-to-Back Shower Pull",
    category: "Glass Hardware",
    material: "Stainless Steel 304",
    finish: "Satin Nickel",
    code: "SL-SDH-88",
    image: "/images/collection-glass.png",
    href: "/products/shower-door-handle",
    price: 4200,
    rating: 4.6,
    popularity: 78,
    dateAdded: "2026-03-25",
    application: "Residential",
    featured: false,
    description: "Back-to-back tubular shower handle bar. Simple linear design with rounded grips, complete with internal seals to protect glass surfaces.",
    datasheet: "/catalogues/glass-hardware-catalogue.pdf",
    specifications: {
      "Centre-to-Centre": "200mm",
      "Tubing Diameter": "19mm",
      "Glass Hole Diameter": "12mm required",
      "Gaskets": "Dual clear vinyl protective washers",
      "Warranty": "3 Years Stainless Grade Warranty"
    }
  },
  {
    id: "biometric-lever-smartlock",
    name: "AeroTouch Biometric Lever Lock",
    category: "Smart Locks",
    material: "Zinc Alloy",
    finish: "Matte Black",
    code: "SL-SL-150",
    image: "/images/hero-smartlock.png",
    href: "/products/biometric-lever-smartlock",
    price: 19500,
    rating: 4.8,
    popularity: 92,
    dateAdded: "2026-04-20",
    application: "Residential",
    featured: false,
    description: "Fingerprint handle lock designed for bedroom, home office, or interior private spaces. Built-in USB rechargeable battery with emergency physical key overwrite.",
    datasheet: "/catalogues/smart-locks-catalogue.pdf",
    specifications: {
      "Unlock Modes": "Fingerprint, Bluetooth App, Passcode, Backup Key",
      "Scanner Location": "Embedded on handle hub for one-motion unlock",
      "Passage Mode": "Toggle option for free-entry meetings",
      "Power": "Internal Lithium rechargeable battery",
      "Warranty": "2 Years Full Device Warranty"
    }
  },
  {
    id: "ball-bearing-butt-hinge",
    name: "Ball Bearing Butt Hinge",
    category: "Builder Hardware",
    material: "Stainless Steel 316",
    finish: "Brushed Brass",
    code: "SL-BH-100",
    image: "/images/hero-hinge.png",
    href: "/products/ball-bearing-butt-hinge",
    price: 1500,
    rating: 4.7,
    popularity: 81,
    dateAdded: "2026-01-18",
    application: "Both",
    featured: false,
    description: "Premium heavy-weight architectural butt hinge with dual-welded ball bearings. Ideal for heavy hardwood entry doors and architectural framings.",
    datasheet: "/catalogues/builder-hardware-catalogue.pdf",
    specifications: {
      "Hinge Dimensions": "102mm x 76mm x 3mm",
      "Bearing Count": "2 Ball Bearing Journals",
      "Screw Pattern": "Template ANSI layout",
      "Material Grade": "Marine-Grade Stainless Steel 316",
      "Warranty": "Lifetime Mechanical Warranty"
    }
  }
];
