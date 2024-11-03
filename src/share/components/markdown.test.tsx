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
    <div style="background-color: #f0f0f0; border:1px solid #eee; padding: 8px 20px; margin: 8px 0; border-radius: 8px;">
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
});
