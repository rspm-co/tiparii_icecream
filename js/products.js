const coneProducts = [
  "Berry's Noir ", 'Butterscotch Bliss', 'Heartland Nuts', 'Kitkat Crush', "Mocha's Roasted Almond ",
  'Nightfall Chocolate', 'Orange Nagpur', 'Pink Guava Paradise', 'Pistachio Bliss', 'Ratnagiri Hapus',
  'Royal Gulkand Palace', 'Strawberry Punch', 'Tripple chocolate', 'vanilla'
];

function initialiseProductSlider() {
  const carousel = document.getElementById('productCarousel');
  if (!carousel) return;
  carousel.innerHTML = coneProducts.map((name, index) => {
    const source = `assets/products/${encodeURIComponent(name)}.png`;
    const title = name.trim().replace(/\b\w/g, letter => letter.toUpperCase());
    return `<article class="cone-card"><div class="cone-image"><img src="${source}" alt="${title} ice cream cone" loading="${index < 4 ? 'eager' : 'lazy'}"></div><h3>${title}</h3><span>Tiparii Pure Bliss</span></article>`;
  }).join('');
  const cards = [...carousel.querySelectorAll('.cone-card')];
  let activeIndex = 0;
  const updateSideSpacing = () => {
    const card = cards[0];
    if (!card) return;
    carousel.style.setProperty('--carousel-side-space', `${Math.max(0, (carousel.clientWidth - card.offsetWidth) / 2)}px`);
  };
  const updateActiveFlavor = () => {
    const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    let activeCard = null;
    let closestDistance = Infinity;
    carousel.querySelectorAll('.cone-card').forEach(card => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - carouselCenter);
      if (distance < closestDistance) { closestDistance = distance; activeCard = card; }
    });
    activeIndex = cards.indexOf(activeCard);
    cards.forEach(card => card.classList.toggle('is-active', card === activeCard));
  };
  const showActiveFlavor = (index, behavior = 'smooth') => {
    activeIndex = (index + cards.length) % cards.length;
    const card = cards[activeIndex];
    cards.forEach(item => item.classList.toggle('is-active', item === card));
    carousel.scrollTo({ left: Math.max(0, card.offsetLeft - (carousel.clientWidth - card.offsetWidth) / 2), behavior });
  };
  const move = direction => showActiveFlavor(activeIndex + direction);
  document.getElementById('productPrev').addEventListener('click', () => move(-1));
  document.getElementById('productNext').addEventListener('click', () => move(1));
  let timer;
  const pause = () => clearInterval(timer);
  const play = () => { pause(); timer = setInterval(() => showActiveFlavor(activeIndex + 1), 3500); };
  carousel.addEventListener('mouseenter', pause); carousel.addEventListener('mouseleave', play);
  carousel.addEventListener('focusin', pause); carousel.addEventListener('focusout', play); play();
  let scrollFrame;
  carousel.addEventListener('scroll', () => { cancelAnimationFrame(scrollFrame); scrollFrame = requestAnimationFrame(updateActiveFlavor); }, { passive: true });
  window.addEventListener('resize', () => { updateSideSpacing(); showActiveFlavor(activeIndex, 'auto'); });
  updateSideSpacing();
  showActiveFlavor(0, 'auto');
}
