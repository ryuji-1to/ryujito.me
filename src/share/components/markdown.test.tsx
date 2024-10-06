import { render } from "@testing-library/react";
import { MarkDown } from "./markdown";

describe("share/components/markdown", () => {
  test("snapshot", () => {
    const { getByText } = render(<MarkDown>hoge</MarkDown>);
    const target = getByText("hoge");
    expect(target).toMatchSnapshot();
  });
});
