import { cn } from "../lib";

type TagWithOnRemove = {
  onClick?: never;
  onRemove: NonNullable<React.ComponentProps<"button">["onClick"]>;
} & Omit<React.ComponentProps<"span">, "onClick">;

type TagWithOnClick = React.ComponentProps<"button"> & {
  onClick: NonNullable<React.ComponentProps<"button">["onClick"]>;
  onRemove?: never;
};

type Props = TagWithOnClick | TagWithOnRemove;

export function Tag(props: Props) {
  if (props.onClick) {
    const { onClick, children, className, ...restProps } = props;
    return (
      <button
        {...restProps}
        className={cn("bg-gray-2 rounded-full", className)}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  const { onRemove, children, className, ...restProps } = props;
  return (
    <span {...restProps} className={cn("bg-gray-2 rounded-full", className)}>
      {children}
      <button type="button" onClick={onRemove}>
        x
      </button>
    </span>
  );
}
