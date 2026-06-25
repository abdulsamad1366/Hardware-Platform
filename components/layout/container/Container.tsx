import * as React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  clean?: boolean; // If true, removes paddings and only maintains maxWidth centering
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = "", clean = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`max-w-7xl mx-auto w-full ${clean ? "" : "px-6 md:px-8"} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
export default Container;
