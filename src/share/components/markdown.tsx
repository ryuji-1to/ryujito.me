type Props = {
  children: NonNullable<
    React.ComponentProps<"div">["dangerouslySetInnerHTML"]
  >["__html"];
};

function replaceSmall(htmlText: string) {
  const cardStartTag = "<p>--small:start--</p>";
  const cardEndTag = "<p>--small:end--</p>";
  const cardStartDiv = `<div style='font-size:12px !important;'>
    `;
  const cardEndDiv = "</div>";
  if (!htmlText.includes(cardStartTag) || !htmlText.includes(cardEndTag)) {
    console.error("Error: Card start or end tag not found.");
    return htmlText;
  }
  return htmlText
    .replaceAll(cardStartTag, cardStartDiv)
    .replaceAll(cardEndTag, cardEndDiv);
}

function replaceCard(htmlText: string) {
  const cardStartTag = "<p>--card:start--</p>";
  const cardEndTag = "<p>--card:end--</p>";
  const cardStartDiv =
    "<div style='background-color: #f0f0f0; border:1px solid #eee; padding: 8px 20px; margin: 8px 0; border-radius: 8px;'>";
  const cardEndDiv = "</div>";
  // `cardStartTag`と`cardEndTag`がhtmlTextに存在するかチェック
  if (!htmlText.includes(cardStartTag) || !htmlText.includes(cardEndTag)) {
    console.error("Error: Card start or end tag not found.");
    return htmlText;
  }
  // 全体を一度にreplace
  return htmlText
    .replaceAll(cardStartTag, cardStartDiv)
    .replaceAll(cardEndTag, cardEndDiv);
}

function replaceMark(htmlText: string): string {
  const mark = "--mark:print--";
  const printStyle = `<small class='print-only' style='font-size:10px;'>※ This resume is generated from https://ryujito.me/resume.</small>`;
  return htmlText.replaceAll(mark, printStyle);
}

function replaceHtml(
  htmlText: string,
  methods: ((htmlText: string) => string)[],
) {
  return methods.reduce(
    (modifiedText, transform) => transform(modifiedText),
    htmlText,
  );
}

export function Markdown(props: Props) {
  const value = props.children.toString();
  const html = replaceHtml(value, [replaceCard, replaceSmall, replaceMark]);
  return (
    <div
      className="prose prose-md dark:prose-invert prose-h1:text-balance"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
