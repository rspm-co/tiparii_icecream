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
  const move = direction => carousel.scrollBy({ left: direction * (carousel.querySelector('.cone-card').offsetWidth + 16), behavior: 'smooth' });
  document.getElementById('productPrev').addEventListener('click', () => move(-1));
  document.getElementById('productNext').addEventListener('click', () => move(1));
  let timer;
  const pause = () => clearInterval(timer);
  const play = () => { pause(); timer = setInterval(() => { const end = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 8; end ? carousel.scrollTo({ left: 0, behavior: 'smooth' }) : move(1); }, 3500); };
  carousel.addEventListener('mouseenter', pause); carousel.addEventListener('mouseleave', play);
  carousel.addEventListener('focusin', pause); carousel.addEventListener('focusout', play); play();
}
