<script setup lang="ts">
  useHead({
    bodyAttrs: {
      style: "margin: 0;",
    },
  });

  const targetDate = ref(new Date("2024/03/23"));
  const { remainingTime } = useCountdown(targetDate.value);
</script>

<template>
  <div class="countdown-container">
    <div class="countdown" v-html="remainingTime"></div>
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

  .countdown-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #333;
    font-family: "M PLUS 1 Code", sans-serif;
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
