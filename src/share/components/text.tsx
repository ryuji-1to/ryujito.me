import { cn } from "@/share/lib";
import { ElementType } from "react";

type Props<T extends ElementType<any>> = {
  as?: T;
} & React.ComponentProps<T>;

export function Text<T extends ElementType<any> = "p">({
  as,
  className,
  children,
  ...rest
}: Props<T>) {
  const Component = as || "p";
  return (
    <Component
      className={cn("text-gray-800 dark:text-gray-200", className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
