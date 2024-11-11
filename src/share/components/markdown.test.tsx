import { render } from "@testing-library/react";
import { Markdown } from "./markdown";

function wrapMarkdownRoot(htmlText: string) {
  return `
    <div class="prose prose-md dark:prose-invert prose-h1:text-balance">
    ${htmlText}
    </div>
    `;
}

function trimSpace(v: string) {
  return v.replace(/\s+/g, "");
}

function formatExpected(expected: string) {
  return trimSpace(wrapMarkdownRoot(expected));
}

describe("share/components/markdown", () => {
  test("snapshot", () => {
    const { getByText } = render(<Markdown>hoge</Markdown>);
    const target = getByText("hoge");
    expect(target).toMatchSnapshot();
  });
  test("replaceSmall", () => {
    const actual = `
    <p>--small:start--</p>
    <div>test</div>
    <p>--small:end--</p>
    `;
    const expected = `
    <div style="font-size:12px !important;">
    <div>test</div>
    </div>
    `;

    const { container } = render(<Markdown>{actual}</Markdown>);
    expect(trimSpace(container.innerHTML.toString())).toMatch(
      formatExpected(expected),
    );
  });
  test("replaceCard", () => {
    const actual = `
    <p>--card:start--</p>
    <div>test</div>
    <p>--card:end--</p>
    `;
    const expected = `
    <div class="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 py-2 px-5 my-2 rounded-lg">
    <div>test</div>
    </div>
    `;
    const { container } = render(<Markdown>{actual}</Markdown>);
    expect(trimSpace(container.innerHTML.toString())).toMatch(
      formatExpected(expected),
    );
  });
  test("replaceMark", () => {
    // TODO
  });
  test("replaceBrowser", () => {
    // TODO
  });
});
