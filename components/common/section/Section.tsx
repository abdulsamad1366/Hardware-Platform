import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({
  children,
  className,
}: SectionProps) {
  return (
    <section className={cn("py-16 lg:py-24", className)}>
      {children}
    </section>
  );
}