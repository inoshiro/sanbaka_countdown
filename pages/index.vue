<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";

  useHead({
    bodyAttrs: {
      style: "margin: 0;",
    },
  });

  const targetDate: Ref<Date> = ref(new Date("2024/03/23")); // 記念日の日付を設定
  const remainingTime = ref("");
  let interval: NodeJS.Timeout;

  let colorIndex = 0; // カラーのインデックスを管理する変数

  const replaceWithSan = (number: string): string => {
    return number.replace(/3/g, () => {
      const delay = Math.random() * 0.5; // 0秒から0.5秒の間でランダムな遅延
      const colorClass = `san${(colorIndex % 3) + 1}`; // クラス名を決定 (san1, san2, san3)
      colorIndex++; // 次の色に移るためにインクリメント
      return `<span class="san ${colorClass}">3</span>`;
    });
  };

  const updateCountdown = () => {
    const now: Date = new Date();
    const distance: number = targetDate.value.getTime() - now.getTime();
    if (distance < 0) {
      clearInterval(interval);
      remainingTime.value = "記念日です！";
      // 特別なメッセージやビデオを表示するロジックを追加
    } else {
      let _days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let _hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let _minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let _seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const days = replaceWithSan(_days.toString().padStart(2, "0"));
      const hours = replaceWithSan(_hours.toString().padStart(2, "0"));
      const minutes = replaceWithSan(_minutes.toString().padStart(2, "0"));
      const seconds = replaceWithSan(_seconds.toString().padStart(2, "0"));

      remainingTime.value = `<span class="number">${days}</span><span class="unit">日</span> <span class="number">${hours}</span><span class="unit">時間</span> <span class="number">${minutes}</span><span class="unit">分</span> <span class="number">${seconds}</span><span class="unit">秒</span>`;
    }
  };

  onMounted(() => {
    interval = setInterval(updateCountdown, 1000);
  });

  onUnmounted(() => {
    clearInterval(interval);
  });
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
