import * as React from "react";

export interface SectionTitleProps {
  title: string;
  subtitle?: string; // Subtitle / Pre-header badge
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean; // If true, rendering light text for dark backgrounds
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  description,
  align = "left",
  className = "",
  light = false,
}) => {
  const isCenter = align === "center";

  return (
    <div className={`flex flex-col ${isCenter ? "items-center text-center mx-auto" : "items-start text-left"} max-w-3xl ${className}`}>
      {subtitle && (
        <span className="text-accent uppercase tracking-widest text-xs font-bold mb-3 bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${light ? "text-white" : "text-primary"} mb-4`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base leading-relaxed ${light ? "text-slate-300" : "text-slate-600"} font-light`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
