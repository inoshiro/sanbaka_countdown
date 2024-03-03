// composables/useParticles.ts
/**
 * このコードでは、以下の変数を変更することでパーティクルの挙動をカスタマイズできます：
 * initialXVelocity：パーティクルのX方向の初速度を変更することで、パーティクルが左右にどれだけ広がるかを調整できます。値を大きくすると、より広範囲に広がります。
 * initialYVelocity：パーティクルのY方向の初速度（上向き）を変更することで、パーティクルがどれだけ高く飛ぶかを調整できます。値を大きく（負の数値で絶対値が大きい）すると、より高く飛びます。
 * particle.scale.set(0.1 + Math.random() * 0.3)：この行でパーティクルのサイズをランダムに設定しています。乗算する数値を調整することで、パーティクルのサイズ範囲を変更できます。
 */
import { ref, onMounted, onUnmounted } from "vue";
import * as PIXI from "pixi.js";

// useParticlesコンポーザブルを定義します。これはコンテナ要素と画像パスを受け取ります。
export function useParticles(
  containerElement: Ref<HTMLElement | null>,
  imagePath: string
) {
  const app: Ref<PIXI.Application | null> = ref(null);

  onMounted(async () => {
    if (process.client && containerElement.value) {
      const PIXI = await import("pixi.js");
      app.value = new PIXI.Application({
        width: containerElement.value.offsetWidth,
        height: containerElement.value.offsetHeight,
        backgroundAlpha: 0,
        resizeTo: window,
      });

      // Pixiのキャンバス(view)をcontainerElementに追加します。
      containerElement.value.appendChild(app.value.view);
    }
  });

  onUnmounted(() => {
    if (app.value) {
      app.value.destroy(true, {
        children: true,
        texture: true,
        baseTexture: true,
      });
    }
  });

  const emitParticles = async (count: number) => {
    if (process.client && app.value) {
      const PIXI = await import("pixi.js");
      const texture = PIXI.Texture.from(imagePath);
      const particlesContainer = new PIXI.ParticleContainer();
      app.value.stage.addChild(particlesContainer);

      for (let i = 0; i < count; i++) {
        createParticle(PIXI, particlesContainer, texture);
      }

      app.value.ticker.add((delta) => {
        particlesContainer.children.forEach((particle) => {
          const p = particle as PIXI.Sprite;

          p.x += p.velocity.x * delta;
          p.velocity.y += 0.5 * delta; // 重力の加速度を適用
          p.y += p.velocity.y * delta;

          // パーティクルが画面下端を超えたら、それをコンテナから削除します。
          if (p.y > window.innerHeight + p.height) {
            particlesContainer.removeChild(p);
          }
        });
      });
    }
  };

  function createParticle(PIXI, container, texture) {
    const particle = new PIXI.Sprite(texture);
    particle.x = Math.random() * window.innerWidth; // パーティクルの初期X位置をランダムに設定
    particle.y = window.innerHeight; // パーティクルの初期Y位置を画面の下端に設定
    particle.anchor.set(0.5); // パーティクルのアンカー（中心点）を中央に設定
    particle.scale.set(0.1 + Math.random() * 0.3); // パーティクルのスケール（サイズ）をランダムに設定

    // パーティクルの初速度を設定。X方向はランダム、Y方向は上向きに設定しています。
    const initialXVelocity = (Math.random() - 0.5) * 5; // X方向の初速度（左右どちらかランダム）
    const initialYVelocity = -5 - Math.random() * 15; // Y方向の初速度（上向き）
    particle.velocity = { x: initialXVelocity, y: initialYVelocity };

    // パーティクルにランダムな回転を設定
    particle.rotation = Math.random() * Math.PI * 2; // 初期回転角度

    container.addChild(particle); // パーティクルをコンテナに追加
  }

  return { emitParticles };
}
