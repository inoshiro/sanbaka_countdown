// useCountdown.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useCountdown(targetDate: Date) {

  const { replaceWithSan } = useSanReplace();

  const remainingTime = ref('');
  let interval: NodeJS.Timeout;

  const updateCountdown = () => {
    const now = new Date();
    const distance = targetDate.getTime() - now.getTime();

    if (distance < 0) {
      clearInterval(interval);
      remainingTime.value = '記念日です！';
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

  return { remainingTime };
}