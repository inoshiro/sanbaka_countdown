<script setup lang="ts">
  import { useInterval } from "~/composables/useInterval";

  useHead({
    title: "さんばか5周年記念日 カウントダウンタイマー",
    bodyAttrs: {
      style: "margin: 0;",
    },
  });

  // カウントダウンの設定
  const targetDate = ref(new Date("2024/03/22"));
  const { days, hours, minutes, seconds, isCountdownOver } = useCountdown(
    targetDate.value
  );

  // 数値を桁数に合わせて0埋めする
  const { replaceWithSan } = useSanReplace();
  const padFormat = (num: number) =>
    replaceWithSan(String(num).padStart(2, "0"));

  // パーティクルの設定
  const containerRef = ref(null);
  const particleImages = [
    "/images/particles/banken.png",
    "/images/particles/piyo.png",
    "/images/particles/man.png",
  ];
  const { emitParticles } = useParticles(containerRef, particleImages);

  // パーティクルを1秒ごとに発生させる
  useInterval(() => {
    emitParticles(10);
  }, 1000);
</script>

<template>
  <div class="container" ref="containerRef">
    <div class="title">
      さんばか<span class="title-number">5</span>周年記念日まで
    </div>
    <div class="countdown-container">
      <div class="countdown">
        <span class="unit">あと</span>
        <span class="number" v-html="padFormat(days)"></span>
        <span class="unit">日</span>
        <span class="number" v-html="padFormat(hours)"></span>
        <span class="unit">時間</span>
        <span class="number" v-html="padFormat(minutes)"></span>
        <span class="unit">分</span>
        <span class="number" v-html="padFormat(seconds)"></span>
        <span class="unit">秒</span>
      </div>
    </div>
  </div>
</template>

<style>
  @keyframes flash {
    0%,
    100% {
      opacity: 1;
      text-shadow: none;
    }
    50% {
      opacity: 0.8;
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.5),
        0 0 10px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.5);
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative; /* canvasをこのコンテナに対して絶対位置指定するために追加 */
    background-color: #333;
    background: linear-gradient(145deg, #121212, #3d3d3d);
    font-family: "M PLUS 1 Code", sans-serif;
    overflow: hidden; /* containerの外側にコンテンツがはみ出さないようにする */
  }

  .title {
    font-size: 3rem; /* タイトルのフォントサイズ */
    color: #e0e0e0;
    text-align: center;
    margin-bottom: 2rem; /* カウントダウンとの間隔 */
    z-index: 1; /* canvasより前面に表示 */
    position: relative; /* canvasとの重なり順を制御するために追加 */
  }

  .title-number {
    font-size: 6rem; /* 数字部分のフォントサイズを調整 */
    font-weight: 700; /* Bold */
    display: inline-block;
    margin: 0 0.3rem; /* 数字間のマージン */
    background: -webkit-linear-gradient(45deg, #f06, #aef);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0; /* 他のコンテンツの背後に配置 */
  }

  .countdown-container {
    z-index: 1; /* canvasより前面に表示 */
    position: relative; /* canvasとの重なり順を制御するために追加 */
  }

  .countdown {
    color: #e0e0e0;
    text-align: center;
    background-color: rgba(
      255,
      255,
      255,
      0.1
    ); /* カウントダウン背景の薄いオーバーレイ */
    border-radius: 20px; /* 角を丸く */
    padding: 2rem; /* カウントダウンの内側のパディング */
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5); /* カウントダウンの影 */
  }

  .number {
    font-size: 6rem; /* 数字部分のフォントサイズを調整 */
    font-weight: 700; /* Bold */
    display: inline-block;
    margin: 0 0.3rem; /* 数字間のマージン */
  }

  .unit {
    font-size: 2rem; /* 単位部分のフォントサイズを調整 */
    font-weight: 400; /* Regular */
    vertical-align: super; /* 単位を少し上に配置 */
  }

  .san {
    display: inline-block;
    font-weight: bold;
    animation: flash 1s infinite;
  }

  .san1 {
    color: rgb(172, 255, 189);
  }

  .san2 {
    color: rgb(228, 85, 74);
  }

  .san3 {
    color: rgb(104, 255, 255);
  }
</style>
