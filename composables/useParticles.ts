// composables/useParticles.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useParticles(containerElement: Ref<HTMLElement | null>, imagePath: string) {

  const app  = ref(null);

  onMounted(async () => {
    if (process.client && containerElement.value) {
      const PIXI = await import('pixi.js');
      app.value = new PIXI.Application({
        width: containerElement.value.offsetWidth,
        height: containerElement.value.offsetHeight,
        transparent: true
      });

      // containerElement.value がキャンバスを追加する対象の要素
      containerElement.value.appendChild(app.value.view);
    }
  });

  onUnmounted(() => {
    if (app.value) {
      app.value.destroy(true, { children: true, texture: true, baseTexture: true });
    }
  });

  const emitParticles = async (count: number) => {
    if (process.client && app.value) {
      const PIXI = await import('pixi.js');
      const texture = PIXI.Texture.from(imagePath);
      const particlesContainer = new PIXI.ParticleContainer();
      app.value.stage.addChild(particlesContainer);

      for (let i = 0; i < count; i++) {
        createParticle(PIXI, particlesContainer, texture);
      }

      app.value.ticker.add((delta) => {
        particlesContainer.children.forEach((particle) => {
          const p = particle as PIXI.Sprite;
          p.x += p.velocity.x;
          p.y += p.velocity.y;
          p.velocity.y += 0.5; // gravity effect

          if (p.y > window.innerHeight + p.height) {
            particlesContainer.removeChild(p);
          }
        });
      });
    }
  };

  function createParticle(PIXI, container, texture) {
    const particle = new PIXI.Sprite(texture);
    particle.x = Math.random() * window.innerWidth;
    particle.y = window.innerHeight;
    particle.anchor.set(0.5);
    particle.scale.set(0.1 + Math.random() * 0.3);
    particle.velocity = { x: (Math.random() - 0.5) * 5, y: -5 - Math.random() * 5 };
    container.addChild(particle);
  }

  return { emitParticles };
}
