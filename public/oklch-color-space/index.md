---
title: "OKLCHカラーモデルできれいな色設計"
date: 2025-11-29
tag: "Design"
published: false
---

Webデザインやフロントエンド開発をしていると、日々「色をどう扱うか」で悩む場面があります。

特に UI の可読性や明視性、アクセシビリティ、には、色の “明度” を正しく扱えるかどうかが大きく関わってきます。

## 色空間とは？

色空間とは、色を数値で表現するための仕組みです。

代表的なものに以下ものがあります。

- **RGB/HEX**
  - 赤・緑・青の光の三原色で色を表現
- **HSL**
  - 色相(Hue)・彩度(Saturation)・明度(Lightness)で色を表現
- **OKLCH**
  - 明度(Lightness)・彩度(Chroma)・色相(Hue)で色を表現
  - 知覚的に均一な色空間

この中でも**OKLCH**に焦点を当てて見ていきます

--card:start--

**「知覚的に均一」とは？**

「数値の変化量と、人間の目で感じる変化量が一致している」ということ

例えば：

- 明度を0.1から0.2に変えたときの「見た目の変化」
- 明度を0.8から0.9に変えたときの「見た目の変化」

この2つが同じくらいに感じられる =「知覚的に均一」

--card:end--

---

<!-- ## なぜ明度が重要なのか？

Webデザインでは、アクセシビリティの観点から背景と文字のコントラストが非常に重要です。WCAG（Web Content Accessibility Guidelines）では、適切なコントラスト比を確保することが推奨されています。
コントラストを考える上で最も重要なのが明度差です。明度が均一でない色空間を使うと、数値上は同じ明度でも視覚的に明るさが異なって見え、意図したコントラストが得られないことがあります。 -->

OKLCHの特徴を見るために、以下のような明度だけを段階的に変化させて、彩度と色相は一定に保ったカラーパレットを作ってみました。

- **L(明度)**: 0.9 → 0.1まで0.1刻みで変化
- **C(彩度)**: 0.1で固定
- **H(色相)**: 0, 72, 144, 216, 288の5色相

--html:start--

<div style="display:flex; flex-direction:column; gap:24px;">
  <div style="display:flex; gap:8px">
    <div style="width:48px; height:48px; background-color: oklch(0.9 0.1 0);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.8 0.1 0);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.7 0.1 0);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.6 0.1 0);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.5 0.1 0);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.4 0.1 0);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.3 0.1 0);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.2 0.1 0);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.1 0.1 0);border-radius:8px;"></div>
  </div>

  <div style="display:flex; gap:8px">
    <div style="width:48px; height:48px; background-color: oklch(0.9 0.1 72);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.8 0.1 72);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.7 0.1 72);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.6 0.1 72);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.5 0.1 72);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.4 0.1 72);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.3 0.1 72);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.2 0.1 72);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.1 0.1 72);border-radius:8px;"></div>
  </div>

  <div style="display:flex; gap:8px">
    <div style="width:48px; height:48px; background-color: oklch(0.9 0.1 144);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.8 0.1 144);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.7 0.1 144);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.6 0.1 144);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.5 0.1 144);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.4 0.1 144);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.3 0.1 144);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.2 0.1 144);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.1 0.1 144);border-radius:8px;"></div>
  </div>

  <div style="display:flex; gap:8px">
    <div style="width:48px; height:48px; background-color: oklch(0.9 0.1 216);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.8 0.1 216);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.7 0.1 216);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.6 0.1 216);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.5 0.1 216);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.4 0.1 216);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.3 0.1 216);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.2 0.1 216);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.1 0.1 216);border-radius:8px;"></div>
  </div>

  <div style="display:flex; gap:8px">
    <div style="width:48px; height:48px; background-color: oklch(0.9 0.1 288);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.8 0.1 288);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.7 0.1 288);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.6 0.1 288);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.5 0.1 288);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.4 0.1 288);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.3 0.1 288);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.2 0.1 288);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: oklch(0.1 0.1 288);border-radius:8px;"></div>
  </div>
</div>

--html:end--

どの色相を見ても、鮮やかさを保ったまま明度の変化が視覚的に均一に見えることが分かります

---

同じように、HSLでもカラーパレットを作ってみました

- **H(色相)**: 0°, 72°, 144°, 216°, 288°の5色
- **S(彩度)**: 50%で固定
- **L(明度)**: 90% → 10%まで10%刻みで変化

--html:start--

<div style="display:flex; flex-direction:column; gap:24px;">
  <div style="display:flex; gap:8px">
    <div style="width:48px; height:48px; background-color: hsl(0 50% 90%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(0 50% 80%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(0 50% 70%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(0 50% 60%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(0 50% 50%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(0 50% 40%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(0 50% 30%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(0 50% 20%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(0 50% 10%);border-radius:8px;"></div>
  </div>

  <div style="display:flex; gap:8px">
    <div style="width:48px; height:48px; background-color: hsl(72 50% 90%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(72 50% 80%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(72 50% 70%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(72 50% 60%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(72 50% 50%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(72 50% 40%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(72 50% 30%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(72 50% 20%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(72 50% 10%);border-radius:8px;"></div>
  </div>

  <div style="display:flex; gap:8px">
    <div style="width:48px; height:48px; background-color: hsl(144 50% 90%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(144 50% 80%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(144 50% 70%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(144 50% 60%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(144 50% 50%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(144 50% 40%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(144 50% 30%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(144 50% 20%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(144 50% 10%);border-radius:8px;"></div>
  </div>

  <div style="display:flex; gap:8px">
    <div style="width:48px; height:48px; background-color: hsl(216 50% 90%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(216 50% 80%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(216 50% 70%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(216 50% 60%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(216 50% 50%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(216 50% 40%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(216 50% 30%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(216 50% 20%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(216 50% 10%);border-radius:8px;"></div>
  </div>

  <div style="display:flex; gap:8px">
    <div style="width:48px; height:48px; background-color: hsl(288 50% 90%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(288 50% 80%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(288 50% 70%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(288 50% 60%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(288 50% 50%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(288 50% 40%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(288 50% 30%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(288 50% 20%);border-radius:8px;">
    </div>
    <div style="width:48px; height:48px; background-color: hsl(288 50% 10%);border-radius:8px;"></div>
  </div>
</div>

--html:end--

HSLでは、同じ明度値を指定しているにもかかわらず、黄色系は明るく見え、青系は暗く見えます。また、彩度も不均一で、色によって鮮やかさが異なって見えます。

## なぜHSLは不均一で、OKLCHは均一なのか?

### HSLが不均一な理由

HSLは、**コンピュータが色を扱いやすいように作られた仕組み**です。RGBという色の表現方法を数学的に変換しただけで、人間の目がどう見えるかは考慮されていません。

そのため、次のような問題が起きます:

- 明度を「50%」に設定しても、黄色は明るく見え、青は暗く見える
- 彩度を「100%」に設定しても、黄色は鮮やかに見え、青はくすんで見える
- 一つの値(例えば色相)を変えると、他の見た目(明るさや鮮やかさ)も意図せず変わってしまう

つまり、**数値と人間の目で感じる見た目が一致しない**のです。

### OKLCHが均一な理由

OKLCHは、**人間の視覚特性に合わせて計算式が作られている**からです。

人間の目は、色によって明るさや鮮やかさの感じ方が異なります。例えば:

- 黄色は少しの光でも明るく感じる
- 青色は同じ光量でも暗く感じる

OKLCHは、この「人間の目の特性」を計算式に組み込んでいます。そのため、数値を同じだけ変化させると、どの色でも見た目が同じだけ変化します。

つまり、**人間の目の癖を補正する計算をしている**ため、均一に見えるのです。

---

## グラデーション

```css
.hex {
  background: linear-gradient(to right, #0000ff, #00ff00);
}

.oklch {
  background: linear-gradient(
    to right,
    oklch(from #0000ff l c h),
    oklch(from #00ff00 l c h)
  );
}
```

--html:start--

<h3>HEX(sRGB)</h3>
<div style="height:60px; background: linear-gradient(to right, #0000ff, #00ff00); border-radius:8px;"></div>
<h3>OKLCH</h3>
<div style="height:60px; background: linear-gradient(to right, oklch(from #0000ff l c h), oklch(from #00ff00 l c h)); border-radius:8px; margin-bottom:40px;"></div>

--html:end--

