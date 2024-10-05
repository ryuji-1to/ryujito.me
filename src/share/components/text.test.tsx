import { render } from "@testing-library/react";
import { Text } from "./text";

describe("share/components/text", () => {
  test("snapshot", () => {
    const { getByText } = render(<Text>test</Text>);
    expect(getByText("test")).toMatchSnapshot();
  });
});
