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
    <div class="title">さんばか5周年まで</div>
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
  @keyframes shake {
    0% {
      transform: translate(0px, 0px) rotateZ(0deg);
    }
    45% {
      transform: translate(4px, 4px) rotateZ(1deg);
    }
    50% {
      transform: translate(0px, 4px) rotateZ(0deg);
    }
    75% {
      transform: translate(4px, 0px) rotateZ(-1deg);
    }
    100% {
      transform: translate(0px, 0px) rotateZ(0deg);
    }
  }

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
    font-family: "M PLUS 1 Code", sans-serif;
  }

  .title {
    margin-bottom: 2rem; /* タイトルとカウントダウンの間隔 */
    font-size: 4rem; /* タイトルのフォントサイズ */
    color: #e0e0e0; /* タイトルのフォントカラー */
    text-shadow: 0 0 10px #ccc; /* タイトルのテキストシャドウで立体感を出す */
  }

  .countdown-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .countdown {
    color: #e0e0e0;
    text-align: center;
  }

  .number {
    font-size: 8rem; /* 数字部分のフォントサイズを大きく */
    font-weight: 700; /* Bold */
  }

  .unit {
    font-size: 3rem; /* 単位部分のフォントサイズを小さく */
    font-weight: 400; /* Regular */
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
