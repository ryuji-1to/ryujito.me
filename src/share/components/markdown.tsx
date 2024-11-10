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
    "<div class='bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 py-2 px-5 my-2 rounded-lg'>";
  const cardEndDiv = "</div>";
  if (!htmlText.includes(cardStartTag) || !htmlText.includes(cardEndTag)) {
    return htmlText;
  }
  return htmlText
    .replaceAll(cardStartTag, cardStartDiv)
    .replaceAll(cardEndTag, cardEndDiv);
}

function replaceMark(htmlText: string) {
  // const mark = "<p>--mark:print--</p>";
  // if (!htmlText.includes(mark)) {
  //   return htmlText;
  // }
  // const printStyle = `<div class='print-only' style='font-size: 10px; text-align: right;'>※ This resume is generated from https://ryujito.me/resume.</div>`;
  // return htmlText.replaceAll(mark, printStyle);
  return htmlText;
}

function replaceBrowser(htmlText: string) {
  const browserStart = "<p>--browser:start--</p>";
  const browserEnd = "<p>--browser:end--</p>";
  const start = `
  <div class="bg-gray-50 dark:bg-gray-800 rounded drop-shadow-lg min-h-20">
     <div class="h-6 bg-gray-200 dark:bg-gray-700 py-1 px-2 rounded-t">
        <div class="flex items-center h-full gap-1.5">
            <div class="rounded-full bg-red-500 h-2 w-2"></div>
            <div class="rounded-full bg-amber-500 h-2 w-2"></div>
            <div class="rounded-full bg-green-500 h-2 w-2"></div>
        </div>
      </div>
      <div class="px-4 py-1">
  `;
  const end = "</div></div>";
  return htmlText.replaceAll(browserStart, start).replaceAll(browserEnd, end);
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
  const html = replaceHtml(value, [
    replaceCard,
    replaceSmall,
    replaceMark,
    replaceBrowser,
  ]);
  return (
    <div
      className="prose prose-md dark:prose-invert prose-h1:text-balance"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
