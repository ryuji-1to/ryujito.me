---
title: "スタイリングソリューション備忘録"
date: 2024-11-22
tag: "Design"
---

### コンポーネントライブラリ

- [Mantine](https://mantine.dev)（素のCSSベース）
- [NextUI](https://nextui.org) （Tailwind CSS + React Aria Component）
- [Chakra UI](https://www.chakra-ui.com)
- [shadcn/ui](https://ui.shadcn.com) （Tailwind CSS + Radix）
- [dotUI](https://dotui.org/docs/getting-started/introduction)（Tailwind CSS + React Aria Component。自動レスポンシブ対応）
- [tremor](https://tremor.so) （Tailwind CSS + Radix UI。管理画面など）
- [React Spectrum](https://react-spectrum.adobe.com/react-spectrum/index.html)（Adobe製。管理画面など）
- [Yamada UI](https://yamada-ui.com/ja)（Emotionで作られている）
- [Joy UI](https://mui.com/joy-ui/getting-started/)（MUIを作っているところのデザインがMaterialじゃない版。Emotionで作られている）

### ヘッドレスUIライブラリ

- [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html) （Adobeが開発。国際化対応なども簡単にできそう）
- [Ark UI](https://ark-ui.com/) （Chakra UIが開発）
- [Radix UI](https://www.radix-ui.com/)（王道）
- [Base UI](https://mui.com/base-ui/getting-started/)（MUIが開発。まだコンポーネントが少ない）
- [Headless UI](https://headlessui.com/)（Tailwind CSSチームが開発している。対応コンポーネントが少ない）

### ベースソリューション

- CSS Modules
- [Tailwind CSS](https://tailwindcss.com/) (v4からはzero configで使用できそう)
- CSS in JS
    - [stylex](https://stylexjs.com/) （Meta公式。バンドラーの問題でNext.js App Routerと一緒に使いづらい）
    - [Panda CSS](https://panda-css.com/) （Chakra UIが開発しているゼロランタイムCSS in JS）
    - [Pigment CSS](https://github.com/mui/pigment-css?tab=readme-ov-file)（MUIが開発。まだ正式リリースされていないがNext.jsでも使いやすそう）
    - [restyle](https://www.restyle.dev/)（React v19の Hoisting を採用している）