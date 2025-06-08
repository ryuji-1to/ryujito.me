import { cn } from "../lib";

type TagWithOnRemove = {
  onClick?: never;
  onRemove?: NonNullable<React.ComponentProps<"button">["onClick"]>;
} & Omit<React.ComponentProps<"span">, "onClick">;

type TagWithOnClick = React.ComponentProps<"button"> & {
  onClick?: NonNullable<React.ComponentProps<"button">["onClick"]>;
  onRemove?: never;
};

type Props = TagWithOnClick | TagWithOnRemove;

export function Tag({ className, ...props }: Props) {
  const commonClassName = cn(
    "bg-gray-4 flex items-center w-fit px-8 py-2 rounded-full",
    className,
  );
  if (props.onClick) {
    const { onClick, children, ...restProps } = props;
    return (
      <button {...restProps} className={commonClassName} onClick={onClick}>
        {children}
      </button>
    );
  }

  const { onRemove, children, ...restProps } = props;
  return (
    <span {...restProps} className={commonClassName}>
      {children}
      {onRemove && (
        <button type="button" className="ml-4" onClick={onRemove}>
          x
        </button>
      )}
    </span>
  );
}
