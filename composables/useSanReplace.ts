// useSanReplace.ts
export function useSanReplace() {
  let colorIndex = 0; // カラーのインデックスを管理する変数

  const replaceWithSan = (number: number): string => {
    return number.toString().replace(/3/g, () => {
      const colorClass = `san${(colorIndex % 3) + 1}`;
      colorIndex++;
      return `<span class="san ${colorClass}">3</span>`;
    });
  };

  return { replaceWithSan };
}