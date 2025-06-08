import { cn } from "../lib";
import Close from "@/assets/close.svg";

type TagWithOnRemove = {
  onClick?: never;
  onRemove?: NonNullable<React.ComponentProps<"button">["onClick"]>;
} & Omit<React.ComponentProps<"span">, "onClick">;

type TagWithOnClick = React.ComponentProps<"button"> & {
  onClick?: NonNullable<React.ComponentProps<"button">["onClick"]>;
  onRemove?: never;
};

type Props = TagWithOnClick | TagWithOnRemove;

export function Tag({ className, children, ...props }: Props) {
  const commonClassName = cn(
    "bg-gray-4 flex items-center w-fit px-8 py-2 rounded-full",
    className,
  );

  if (props.onClick) {
    const { onClick, ...restProps } = props;
    return (
      <button {...restProps} className={commonClassName} onClick={onClick}>
        {children}
      </button>
    );
  }

  const { onRemove, title, ...restProps } = props;
  const ariaLabel = title ? `${title}を削除` : "このタグを削除";
  return (
    <span {...restProps} className={commonClassName}>
      {children}
      {onRemove && (
        <button
          type="button"
          className="ml-4 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-150 rounded-full"
          onClick={onRemove}
          aria-label={ariaLabel}
        >
          <Close className="size-16 fill-gray-12" />
        </button>
      )}
    </span>
  );
}
