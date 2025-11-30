function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

type Props = {
  children: NonNullable<
    React.ComponentProps<"div">["dangerouslySetInnerHTML"]
  >["__html"];
};

function replaceSmall(htmlText: string) {
  const smallStartTag = "<p>--small:start--</p>";
  const smallEndTag = "<p>--small:end--</p>";
  const cardStartDiv = `<div class="text-xs">`;
  const cardEndDiv = "</div>";
  if (!htmlText.includes(smallStartTag) || !htmlText.includes(smallEndTag)) {
    return htmlText;
  }
  return htmlText
    .replaceAll(smallStartTag, cardStartDiv)
    .replaceAll(smallEndTag, cardEndDiv);
}

function replaceCard(htmlText: string) {
  const cardStartTag = "<p>--card:start--</p>";
  const cardEndTag = "<p>--card:end--</p>";
  const cardStartDiv =
    "<div class='bg-gray-2 dark:bg-dark-gray-2 border border-gray-5 dark:border-dark-gray-5 py-8 px-24 my-16 rounded-8'>";
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
  <div class="bg-gray-1 dark:bg-dark-gray-1 border border-gray-4 dark:border-dark-gray-4 rounded-4 drop-shadow-lg min-h-64">
     <div class="h-24 bg-gray-4 dark:bg-dark-gray-4 py-4 px-8 rounded-t-4">
        <div class="flex items-center h-full gap-4">
            <div class="rounded-full bg-red dark:bg-dark-red h-8 w-8"></div>
            <div class="rounded-full bg-orange dark:bg-dark-orange h-8 w-8"></div>
            <div class="rounded-full bg-green dark:bg-dark-green h-8 w-8"></div>
        </div>
      </div>
      <div class="px-8 py-4">
  `;
  const end = "</div></div>";
  return htmlText.replaceAll(browserStart, start).replaceAll(browserEnd, end);
}

function replaceHtmlContent(htmlText: string) {
  const browserStart = "<p>--html:start--</p>";
  const browserEnd = "<p>--html:end--</p>";

  const startIndex = htmlText.indexOf(browserStart);
  const endIndex = htmlText.indexOf(browserEnd);

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    return htmlText;
  }

  const regex = new RegExp(
    `${escapeRegExp(browserStart)}(.*?)${escapeRegExp(browserEnd)}`,
    "gs",
  );

  return htmlText.replace(regex, (_, content) => decodeHtmlEntities(content));
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
    replaceHtmlContent,
  ]);

  return (
    <div
      className="prose prose-md dark:prose-invert prose-headings:text-balance prose-h2:pb-16 prose-p:empty:hidden"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: true
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
