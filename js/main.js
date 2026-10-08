document.addEventListener('DOMContentLoaded', () => {
  const loaderAnimation = document.getElementById('loaderAnimation');
  if (loaderAnimation && window.lottie) {
    window.lottie.loadAnimation({ container: loaderAnimation, renderer: 'svg', loop: true, autoplay: true, path: 'assets/lottie/tiparii-loader.json' });
  }
  renderLocations(); initialiseForm(); initialiseProductSlider();
  document.getElementById('locationSearch').addEventListener('input', event => renderLocations(event.target.value));
  document.getElementById('year').textContent = new Date().getFullYear();
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => gsap.to(loader, { opacity: 0, duration: .45, delay: 1.6, onComplete: () => loader.remove() }));
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero-copy', { y: 32, opacity: 0, duration: .85, ease: 'power3.out', delay: .55 });
  gsap.from('.hero-visual', { y: 24, opacity: 0, duration: .9, ease: 'power3.out', delay: .72 });
  gsap.utils.toArray('.reveal').forEach(el => { if (!el.closest('.hero')) gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%' }, y: 22, opacity: 0, duration: .65, ease: 'power2.out' }); });
});
