import * as React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98]";

    // Variant classes mapping
    const variantStyles = {
      primary: "bg-primary text-white hover:bg-slate-800",
      secondary: "bg-slate-100 text-primary hover:bg-slate-200 border border-slate-200",
      accent: "bg-accent hover:bg-amber-600 text-primary font-bold shadow-soft hover:shadow-md",
      outline: "border border-slate-200 bg-transparent text-primary hover:bg-slate-50 hover:border-slate-300",
      ghost: "bg-transparent text-primary hover:bg-slate-100"
    };

    // Size classes mapping
    const sizeStyles = {
      sm: "text-xs px-4 py-2 gap-1.5 h-9",
      md: "text-sm px-5 py-2.5 gap-2 h-11",
      lg: "text-base px-7 py-3.5 gap-2.5 h-13"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
