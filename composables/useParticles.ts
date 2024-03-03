// composables/useParticles.ts
import { ref, onMounted, onUnmounted } from 'vue';

// useParticlesコンポーザブルを定義します。これはコンテナ要素と画像パスを受け取ります。
export function useParticles(containerElement: Ref<HTMLElement | null>, imagePath: string) {
  // Pixiアプリケーションのインスタンスを保持するためのrefを作成します。
  const app = ref(null);

  // コンポーネントがマウントされた時に実行される処理です。
  onMounted(async () => {
    // クライアントサイドで実行されているか、そしてcontainerElementが存在するかをチェックします。
    if (process.client && containerElement.value) {
      // PixiJSを動的にインポートします。
      const PIXI = await import('pixi.js');
      // Pixiアプリケーションのインスタンスを作成し、containerElementの大きさに合わせます。
      app.value = new PIXI.Application({
        width: containerElement.value.offsetWidth,
        height: containerElement.value.offsetHeight,
        transparent: true // 透明な背景
      });

      // Pixiのキャンバス(view)をcontainerElementに追加します。
      containerElement.value.appendChild(app.value.view);
    }
  });

  // コンポーネントがアンマウントされた時に実行される処理です。
  onUnmounted(() => {
    // Pixiアプリケーションが存在する場合、それを破棄します。
    if (app.value) {
      app.value.destroy(true, { children: true, texture: true, baseTexture: true });
    }
  });

  // 指定された数のパーティクルを発射する関数です。
  const emitParticles = async (count: number) => {
    // クライアントサイドで実行されていて、Pixiアプリケーションが存在するかをチェックします。
    if (process.client && app.value) {
      // PixiJSを再度動的にインポートします。
      const PIXI = await import('pixi.js');
      // 画像からテクスチャを作成します。
      const texture = PIXI.Texture.from(imagePath);
      // パーティクルを格納するコンテナを作成します。
      const particlesContainer = new PIXI.ParticleContainer();
      // このコンテナをステージに追加します。
      app.value.stage.addChild(particlesContainer);

      // 指定された数だけパーティクルを作成します。
      for (let i = 0; i < count; i++) {
        createParticle(PIXI, particlesContainer, texture);
      }

      // アニメーションループ内で、各パーティクルの位置を更新します。
      app.value.ticker.add((delta) => {
        particlesContainer.children.forEach((particle) => {
          const p = particle as PIXI.Sprite;
          p.x += p.velocity.x;
          p.y += p.velocity.y;
          p.velocity.y += 0.5; // 重力の効果

          // パーティクルが画面下端を超えたら、それをコンテナから削除します。
          if (p.y > window.innerHeight + p.height) {
            particlesContainer.removeChild(p);
          }
        });
      });
    }
  };

  // パーティクルを作成する関数です。
  function createParticle(PIXI, container, texture) {
    const particle = new PIXI.Sprite(texture);
    particle.x = Math.random() * window.innerWidth; // ランダムなX位置
    particle.y = window.innerHeight; // 画面の下端からスタート
    particle.anchor.set(0.5); // アンカーポイントを中央に設定
    particle.scale.set(0.1 + Math.random() * 0.3); // ランダムなスケール
    particle.velocity = { x: (Math.random() - 0.5) * 5, y: -5 - Math.random() * 5 }; // ランダムな初速度
    container.addChild(particle); // パーティクルをコンテナに追加
  }

  // emitParticles関数を公開します。
  return { emitParticles };
}