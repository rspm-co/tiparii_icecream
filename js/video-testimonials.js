document.addEventListener('DOMContentLoaded', () => {
  const activateVideoPoster = poster => {
    poster.addEventListener('click', () => {
      const videoId = poster.dataset.youtubeId;
      const iframe = document.createElement('iframe');
      iframe.className = 'video-player';
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.title = poster.getAttribute('aria-label');
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      poster.replaceWith(iframe);
    }, { once: true });
  };
  document.querySelectorAll('.video-poster[data-youtube-id]').forEach(activateVideoPoster);

  const carousel = document.querySelector('.testimonial-grid');
  if (!carousel) return;
  carousel.classList.add('testimonial-carousel');
  const controls = document.createElement('div');
  controls.className = 'testimonial-slider-controls';
  controls.innerHTML = '<button type="button" aria-label="Previous partner feedback"><i class="fa-solid fa-arrow-left"></i></button><button type="button" aria-label="Next partner feedback"><i class="fa-solid fa-arrow-right"></i></button>';
  carousel.insertAdjacentElement('afterend', controls);
  const scrollCards = direction => {
    const card = carousel.querySelector('.video-testimonial');
    if (card) carousel.scrollBy({ left: direction * (card.offsetWidth + 18), behavior: 'smooth' });
  };
  controls.querySelector('[aria-label="Previous partner feedback"]').addEventListener('click', () => scrollCards(-1));
  controls.querySelector('[aria-label="Next partner feedback"]').addEventListener('click', () => scrollCards(1));
});
