import { render } from "@testing-library/react";
import { Text } from "./text";

describe("share/components/text", () => {
  test("snapshot", () => {
    const { getByText } = render(<Text>test</Text>);
    expect(getByText("test")).toMatchSnapshot();
  });
  test("as='a'", () => {
    const { getByText, container } = render(<Text as="a">test</Text>);
    const target = getByText("test");
    expect(target).toBeDefined();
    expect(container.querySelector("a")).not.toBeNull();
  });
});
