type Props = {
  children: NonNullable<
    React.ComponentProps<"div">["dangerouslySetInnerHTML"]
  >["__html"];
};

export function Markdown(props: Props) {
  return (
    <div
      className="prose prose-md dark:prose-invert prose-h1:text-balance"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: props.children }}
    />
  );
}
