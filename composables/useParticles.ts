// composables/useParticles.ts
/**
 * このコードでは、以下の変数を変更することでパーティクルの挙動をカスタマイズできます：
 * initialXVelocity：パーティクルのX方向の初速度を変更することで、パーティクルが左右にどれだけ広がるかを調整できます。値を大きくすると、より広範囲に広がります。
 * initialYVelocity：パーティクルのY方向の初速度（上向き）を変更することで、パーティクルがどれだけ高く飛ぶかを調整できます。値を大きく（負の数値で絶対値が大きい）すると、より高く飛びます。
 * particle.scale.set(0.1 + Math.random() * 0.3)：この行でパーティクルのサイズをランダムに設定しています。乗算する数値を調整することで、パーティクルのサイズ範囲を変更できます。
 */
import { ref, onMounted, onUnmounted } from "vue";
import * as PIXI from "pixi.js";

export function useParticles(
  containerElement: Ref<HTMLElement | null>,
  imagePath: string[]
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
      const imageIndex =
        Math.floor(Math.random() * 10 * imagePath.length) % imagePath.length;
      const PIXI = await import("pixi.js");
      const texture = PIXI.Texture.from(imagePath[imageIndex]);
      const particlesContainer = new PIXI.ParticleContainer();
      app.value.stage.addChild(particlesContainer);

      for (let i = 0; i < count; i++) {
        createParticle(PIXI, particlesContainer, texture);
      }

      app.value.ticker.add((delta) => {
        particlesContainer.children.forEach((particle) => {
          const p = particle as PIXI.Sprite;

          p.x += p.velocity.x * delta;
          p.velocity.y += 0.5 * delta;
          p.y += p.velocity.y * delta;

          if (p.y > window.innerHeight + p.height) {
            particlesContainer.removeChild(p);
            p.destroy(); // パーティクルのリソースを解放
          }
        });

        if (particlesContainer.children.length === 0) {
          app.value.stage.removeChild(particlesContainer);
          particlesContainer.destroy(); // コンテナが空になったらリソースを解放
        }
      });
    }
  };

  function createParticle(PIXI, container, texture) {
    const particle = new PIXI.Sprite(texture);
    particle.x = Math.random() * window.innerWidth;
    particle.y = window.innerHeight;
    particle.anchor.set(0.5);
    particle.scale.set(0.1 + Math.random() * 0.1);
    particle.velocity = {
      x: (Math.random() - 0.5) * 5,
      y: -5 - Math.random() * 15,
    };
    particle.rotation = Math.random() * Math.PI * 2;
    container.addChild(particle);
  }

  return { emitParticles };
}
