---
title: "スタイリングソリューション備忘録"
date: 2024-11-22
tag: "Design"
published: true
---

### コンポーネントライブラリ

- [Mantine](https://mantine.dev)（素の CSS ベース）
- [NextUI](https://nextui.org) （Tailwind CSS + React Aria Component）
- [Chakra UI](https://www.chakra-ui.com)
- [shadcn/ui](https://ui.shadcn.com) （Tailwind CSS + Radix）
- [Justd](https://getjustd.com/) （tailwind css + React Aria Component）
- [dotui](https://dotui.org/docs/getting-started/introduction)（Tailwind CSS + React Aria Component。自動レスポンシブ対応）
- [tremor](https://tremor.so) （Tailwind CSS + Radix UI。管理画面など）
- [React Spectrum](https://react-spectrum.adobe.com/react-spectrum/index.html)（Adobe 製。管理画面など）
- [Yamada UI](https://yamada-ui.com/ja)（Emotion で作られている）
- [Joy UI](https://mui.com/joy-ui/getting-started/)（MUI を作っているところのデザインが Material じゃない版。Emotion で作られている）

### ヘッドレス UI ライブラリ

- [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html) （Adobe が開発。国際化対応なども簡単にできそう）
- [Ark UI](https://ark-ui.com/) （Chakra UI が開発）
- [Radix UI](https://www.radix-ui.com/)（王道）
- [Base UI](https://mui.com/base-ui/getting-started/)（MUI が開発。まだコンポーネントが少ない）
- [Headless UI](https://headlessui.com/)（Tailwind CSS チームが開発している。対応コンポーネントが少ない）

### ベースソリューション

- CSS Modules
- [Tailwind CSS](https://tailwindcss.com/)
- CSS in JS
  - [stylex](https://stylexjs.com/) （Meta 公式。バンドラーの問題で Next.js App Router と一緒に使いづらい）
  - [Panda CSS](https://panda-css.com/) （Chakra UI が開発しているゼロランタイム CSS in JS）
  - [Pigment CSS](https://github.com/mui/pigment-css?tab=readme-ov-file)（MUI が開発。まだ正式リリースされていないが Next.js でも使いやすそう）
  - [restyle](https://www.restyle.dev/)（React v19 の Hoisting を採用している）
