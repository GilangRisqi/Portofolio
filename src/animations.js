import anime from 'animejs/lib/anime.es.js';

let scrollObserver = null;
const activeAnimations = new Set();

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function animateHero() {
  const container = document.querySelector('.hero__container');
  if (!container) return;

  if (prefersReducedMotion()) {
    container.style.opacity = '1';
    container.style.transform = 'none';
    return;
  }

  const targets = container.querySelectorAll(
    '.hero__avatar, .hero__name, .hero__headline, .hero__summary, .hero__cta-group'
  );
  if (!targets.length) return;

  const anim = anime({
    targets,
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(120, { start: 100 }),
    duration: 500,
    easing: 'easeOutCubic',
    complete: () => {
      activeAnimations.delete(anim);
    }
  });

  activeAnimations.add(anim);
}

export function initScrollReveal() {
  if (scrollObserver) {
    scrollObserver.disconnect();
  }

  const revealTargets = document.querySelectorAll(
    '.section-title, .skills__group, .exp-card, .proj-card, .achieve-card, .train-card, .edu-card, .contact__card'
  );

  if (prefersReducedMotion()) {
    revealTargets.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  scrollObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target;
        observer.unobserve(target);

        const anim = anime({
          targets: target,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 450,
          easing: 'easeOutCubic',
          complete: () => {
            activeAnimations.delete(anim);
          }
        });

        activeAnimations.add(anim);
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    scrollObserver.observe(el);
  });
}

export function crossfadeLanguage(applyChange) {
  if (prefersReducedMotion()) {
    applyChange();
    initScrollReveal();
    return;
  }

  const main = document.getElementById('main-content');
  if (!main) {
    applyChange();
    initScrollReveal();
    return;
  }

  anime({
    targets: main,
    opacity: [1, 0.25],
    duration: 100,
    easing: 'easeOutQuad',
    complete: () => {
      applyChange();
      initScrollReveal();

      anime({
        targets: main,
        opacity: [0.25, 1],
        duration: 140,
        easing: 'easeOutQuad'
      });
    }
  });
}

export function animateContentTransition(element) {
  if (!element || prefersReducedMotion()) return;

  anime({
    targets: element,
    opacity: [0.8, 1],
    duration: 220,
    easing: 'easeOutQuad'
  });
}

export function cleanupAnimations() {
  activeAnimations.forEach((anim) => anim.pause());
  activeAnimations.clear();

  if (scrollObserver) {
    scrollObserver.disconnect();
    scrollObserver = null;
  }
}
