import { onUnmounted, ref } from 'vue';

// useInterval コンポーザブルを定義します。
export function useInterval(callback: () => void, interval: number) {
  // setInterval から返されるタイマーIDを保持するための ref を作成します。
  const intervalId = ref<number | null>(null);

  // コンポーザブルが使用された時にインターバルを設定します。
  intervalId.value = window.setInterval(callback, interval);

  // コンポーネントがアンマウントされた時にインターバルをクリアします。
  onUnmounted(() => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value);
    }
  });
}