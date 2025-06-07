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
    <div class="text-xs">
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
    <div class="bg-gray-2 dark:bg-dark-gray-2 border border-gray-5 dark:border-dark-gray-5 py-8 px-24 my-16 rounded-8">
    <div>test</div>
    </div>
    `;
    const { container } = render(<Markdown>{actual}</Markdown>);
    expect(trimSpace(container.innerHTML.toString())).toMatch(
      formatExpected(expected),
    );
  });
  test("replaceBrowser", () => {
    const actual = `
    <p>--browser:start--</p>
    <div>test</div>
    <p>--browser:end--</p>
    `;
    const expected = `
    <div class="bg-gray-1 dark:bg-dark-gray-1 border border-gray-4 dark:border-dark-gray-4 rounded-4 drop-shadow-lg min-h-64">
      <div class="h-24 bg-gray-4 dark:bg-dark-gray-4 py-4 px-8 rounded-t-4">
        <div class="flex items-center h-full gap-4">
            <div class="rounded-full bg-red dark:bg-dark-red h-8 w-8"></div>
            <div class="rounded-full bg-orange dark:bg-dark-orange h-8 w-8"></div>
            <div class="rounded-full bg-green dark:bg-dark-green h-8 w-8"></div>
        </div>
      </div>
      <div class="px-8 py-4">
        <div>test</div>
      </div>
    </div>
    `;
    const { container } = render(<Markdown>{actual}</Markdown>);
    expect(trimSpace(container.innerHTML.toString())).toMatch(
      formatExpected(expected),
    );
  });
});
