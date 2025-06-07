// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { Tag } from "./tag";

describe("Tag Component", () => {
  describe("onClickがある場合（buttonとして表示）", () => {
    it("buttonとしてレンダリングされる", () => {
      const handleClick = vi.fn();
      render(<Tag onClick={handleClick}>Test Tag</Tag>);

      const button = screen.getByRole("button");
      expect(button).toBeDefined();
    });

    it("クリック時にonClickが呼ばれる", async () => {
      const handleClick = vi.fn();
      render(<Tag onClick={handleClick}>Clickable Tag</Tag>);

      const button = screen.getByRole("button");
      button.click();

      expect(handleClick).toHaveBeenCalled();
    });

    it("デフォルトのクラス名が適用される", () => {
      const handleClick = vi.fn();
      render(<Tag onClick={handleClick}>Test Tag</Tag>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("bg-gray-2");
      expect(button.className).toContain("rounded-full");
    });

    it("カスタムクラス名が適用される", () => {
      const handleClick = vi.fn();
      render(
        <Tag onClick={handleClick} className="custom-class">
          Test Tag
        </Tag>,
      );

      const button = screen.getByRole("button");
      expect(button.className).toContain("bg-gray-2");
      expect(button.className).toContain("rounded-full");
      expect(button.className).toContain("custom-class");
    });
  });

  describe("onRemoveがある場合（spanとして表示）", () => {
    it("spanとしてレンダリングされ、削除ボタンが含まれる", () => {
      const handleRemove = vi.fn();
      render(<Tag onRemove={handleRemove}>Removable Tag</Tag>);

      // メインのコンテナがspanであることを確認
      const span = screen.getByText("Removable Tag").closest("span");
      expect(span).toBeDefined();

      // 削除ボタンが存在することを確認
      const removeButton = screen.getByRole("button");
      expect(removeButton.textContent).toBe("x");
    });

    it("削除ボタンクリック時にonRemoveが呼ばれる", async () => {
      const handleRemove = vi.fn();
      render(<Tag onRemove={handleRemove}>Removable Tag</Tag>);

      const removeButton = screen.getByRole("button");
      await userEvent.click(removeButton);

      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it("デフォルトのクラス名が適用される", () => {
      const handleRemove = vi.fn();
      render(<Tag onRemove={handleRemove}>Test Tag</Tag>);

      const span = screen.getByText("Test Tag").closest("span");
      expect(span?.className).toContain("bg-gray-2");
      expect(span?.className).toContain("rounded-full");
    });

    it("カスタムクラス名が適用される", () => {
      const handleRemove = vi.fn();
      render(
        <Tag onRemove={handleRemove} className="custom-class">
          Test Tag
        </Tag>,
      );

      const span = screen.getByText("Test Tag").closest("span");
      expect(span?.className).toContain("bg-gray-2");
      expect(span?.className).toContain("rounded-full");
      expect(span?.className).toContain("custom-class");
    });

    it("span要素のプロパティが正しく渡される", () => {
      const handleRemove = vi.fn();
      render(
        <Tag
          onRemove={handleRemove}
          data-testid="custom-span"
          title="Custom Title"
        >
          Test Tag
        </Tag>,
      );

      const span = screen.getByTestId("custom-span");
      expect(span.getAttribute("title")).toBe("Custom Title");
    });
  });

  describe("エッジケース", () => {
    it("childrenが正しく表示される", () => {
      const handleClick = vi.fn();
      render(
        <Tag onClick={handleClick}>
          <span>Complex</span> Content
        </Tag>,
      );

      expect(screen.getByText("Complex")).toBeDefined();
      expect(screen.getByText("Content")).toBeDefined();
    });

    it("空のchildrenでもエラーにならない", () => {
      const handleClick = vi.fn();
      render(<Tag onClick={handleClick} />);

      const button = screen.getByRole("button");
      expect(button).toBeDefined();
    });

    it("onClickとonRemoveが同時に渡されることはない（型レベルで制約）", () => {
      const handleClick = vi.fn();
      render(<Tag onClick={handleClick}>Only Click</Tag>);

      expect(screen.queryByText("x")).toBeNull();
    });
  });

  describe("アクセシビリティ", () => {
    it('button要素はrole="button"を持つ', () => {
      const handleClick = vi.fn();
      render(<Tag onClick={handleClick}>Accessible Button</Tag>);

      const button = screen.getByRole("button");
      expect(button).toBeDefined();
    });

    it('削除ボタンもrole="button"を持つ', () => {
      const handleRemove = vi.fn();
      render(<Tag onRemove={handleRemove}>Removable Tag</Tag>);

      const removeButton = screen.getByRole("button");
      expect(removeButton).toBeDefined();
    });

    it("キーボードナビゲーションが機能する", async () => {
      const handleClick = vi.fn();
      const result = render(
        <Tag onClick={handleClick}>Keyboard Accessible</Tag>,
      );

      const button = result.getByRole("button");
      button.focus();
      await userEvent.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
