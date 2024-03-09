// composables/useParticles.ts
/**
 * このコードでは、以下の変数を変更することでパーティクルの挙動をカスタマイズできます：
 * initialXVelocity：パーティクルのX方向の初速度を変更することで、パーティクルが左右にどれだけ広がるかを調整できます。値を大きくすると、より広範囲に広がります。
 * initialYVelocity：パーティクルのY方向の初速度（上向き）を変更することで、パーティクルがどれだけ高く飛ぶかを調整できます。値を大きく（負の数値で絶対値が大きい）すると、より高く飛びます。
 * particle.scale.set(0.1 + Math.random() * 0.3)：この行でパーティクルのサイズをランダムに設定しています。乗算する数値を調整することで、パーティクルのサイズ範囲を変更できます。
 */
import { ref, onMounted, onUnmounted } from "vue";
import * as PIXI from "pixi.js";

// useParticles関数: PIXIを使用してパーティクルエフェクトを作成し、Vueコンポーネントのライフサイクルに組み込む
export function useParticles(
  containerElement: Ref<HTMLElement | null>,
  imagePath: string[]
) {
  const app: Ref<PIXI.Application | null> = ref(null);

  onMounted(async () => {
    // コンポーネントがマウントされた時、PIXIアプリケーションを初期化
    if (process.client && containerElement.value) {
      const PIXI = await import("pixi.js");
      app.value = new PIXI.Application({
        width: containerElement.value.offsetWidth, // コンテナの幅
        height: containerElement.value.offsetHeight, // コンテナの高さ
        backgroundAlpha: 0, // 背景透明
        resizeTo: window, // ウィンドウのリサイズに合わせて自動調整
      });
      containerElement.value.appendChild(app.value.view); // PIXIのキャンバスをDOMに追加
    }
  });

  onUnmounted(() => {
    // コンポーネントがアンマウントされた時、PIXIアプリケーションとそのリソースを破棄
    if (app.value) {
      app.value.destroy(true, {
        children: true, // 子要素も破棄
        texture: true, // テクスチャも破棄
        baseTexture: true, // ベーステクスチャも破棄
      });
    }
  });

  // emitParticles関数: 指定された数のパーティクルを生成して画面上に動かす
  const emitParticles = async (count: number) => {
    if (process.client && app.value) {
      const imageIndex =
        Math.floor(Math.random() * 10 * imagePath.length) % imagePath.length;
      const PIXI = await import("pixi.js");
      const texture = PIXI.Texture.from(imagePath[imageIndex]); // パーティクルのテクスチャをランダムに選択
      const particlesContainer = new PIXI.ParticleContainer(); // パーティクルを格納するコンテナ
      app.value.stage.addChild(particlesContainer); // コンテナをステージに追加

      for (let i = 0; i < count; i++) {
        createParticle(PIXI, particlesContainer, texture); // パーティクルを生成してコンテナに追加
      }

      // パーティクルの動きを更新するためのアニメーションループ
      app.value.ticker.add((delta) => {
        particlesContainer.children.forEach((particle) => {
          const p = particle as PIXI.Sprite;

          // パーティクルの位置を更新
          p.x += p.velocity.x * delta;
          p.velocity.y += 0.5 * delta; // 重力効果をシミュレーション
          p.y += p.velocity.y * delta;

          // パーティクルが画面下端を超えたら削除
          if (p.y > window.innerHeight + p.height) {
            particlesContainer.removeChild(p);
            p.destroy(); // パーティクルのリソースを解放
          }
        });

        // コンテナが空になったら削除
        if (particlesContainer.children.length === 0) {
          app.value.stage.removeChild(particlesContainer);
          particlesContainer.destroy(); // コンテナのリソースを解放
        }
      });
    }
  };

  // createParticle関数: 個々のパーティクルを生成する
  function createParticle(PIXI, container, texture) {
    const particle = new PIXI.Sprite(texture);
    particle.x = Math.random() * window.innerWidth; // パーティクルの初期位置（X軸）をランダムに設定
    particle.y = window.innerHeight; // パーティクルの初期位置（Y軸）を画面の下端に設定
    particle.anchor.set(0.5); // パーティクルのアンカーポイントを中心に設定
    particle.scale.set(0.1 + Math.random() * 0.1); // パーティクルのサイズをランダムに設定
    particle.velocity = {
      x: (Math.random() - 0.5) * 5,
      y: -5 - Math.random() * 15,
    }; // パーティクルの初速を設定
    particle.rotation = Math.random() * Math.PI * 2; // パーティクルの初期回転角をランダムに設定
    container.addChild(particle); // パーティクルをコンテナに追加
  }

  return { emitParticles };
}
