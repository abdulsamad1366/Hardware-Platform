import { 
  Lock, 
  Key, 
  Layers, 
  Grid, 
  Bath, 
  Hammer, 
  Cpu, 
  Settings,
  Factory, 
  Package, 
  ClipboardList, 
  Globe, 
  Award, 
  Truck, 
  ShieldCheck, 
  Star 
} from "lucide-react";

export interface MarqueeItem {
  text: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

export const row1Items: MarqueeItem[] = [
  { text: "Locks", icon: Lock },
  { text: "Door Hardware", icon: Key },
  { text: "Glass Hardware", icon: Layers },
  { text: "Furniture Hardware", icon: Grid },
  { text: "Bathroom Accessories", icon: Bath },
  { text: "Builder Hardware", icon: Hammer },
  { text: "Smart Locks", icon: Cpu },
  { text: "Fasteners", icon: Settings },
];

export const row2Items: MarqueeItem[] = [
  { text: "OEM Manufacturing", icon: Factory },
  { text: "Wholesale Supply", icon: Package },
  { text: "Bulk Orders", icon: ClipboardList },
  { text: "Export Quality", icon: Globe },
  { text: "Custom Branding", icon: Award },
  { text: "Fast Delivery", icon: Truck },
  { text: "ISO Certified", icon: ShieldCheck },
  { text: "Trusted Quality", icon: Star },
];
