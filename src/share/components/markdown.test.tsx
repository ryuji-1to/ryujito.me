import { render } from "@testing-library/react";
import { Markdown } from "./markdown";

describe("share/components/markdown", () => {
  test("snapshot", () => {
    const { getByText } = render(<Markdown>hoge</Markdown>);
    const target = getByText("hoge");
    expect(target).toMatchSnapshot();
  });
});
