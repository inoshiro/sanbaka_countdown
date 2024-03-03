<script setup lang="ts">
  useHead({
    bodyAttrs: {
      style: "margin: 0;",
    },
  });

  const targetDate = ref(new Date("2024/03/23"));
  const { days, hours, minutes, seconds, isCountdownOver } = useCountdown(
    targetDate.value
  );
  const { replaceWithSan } = useSanReplace();
  const padFormat = (num: number) =>
    replaceWithSan(String(num).padStart(2, "0"));
</script>

<template>
  <div class="container">
    <div class="title">さんばか<span class="number">5</span>周年まで</div>
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
  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #333;
    background: linear-gradient(
      145deg,
      #121212,
      #3d3d3d
    ); /* グラデーション背景 */

    font-family: "M PLUS 1 Code", sans-serif;
  }

  .title {
    font-size: 3rem; /* タイトルのフォントサイズ */
    color: #e0e0e0;
    text-align: center;
    margin-bottom: 2rem; /* カウントダウンとの間隔 */
  }

  .countdown-container {
    display: flex;
    justify-content: center;
    align-items: center;
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
    animation: bounce 0.5s infinite; /* 振動エフェクトの適用 */
  }

  .san1 {
    color: #76ff03; /* 色1 */
  }

  .san2 {
    color: #ff5722; /* 色2 */
  }

  .san3 {
    color: #2196f3; /* 色3 */
  }
</style>
