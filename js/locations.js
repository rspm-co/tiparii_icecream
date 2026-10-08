const franchiseLocations = [
  { name: 'Tiparii Swargate', city: 'Swargate, Pune', map: 'https://maps.app.goo.gl/2C8PAeRdkn3VFZLz6' },
  { name: 'Tiparii DP Road', city: 'Kothurd, Pune', map: 'https://maps.app.goo.gl/UiCJyaVsF4taGNkP9' },
  { name: 'Tiparii Mayur Colony', city: 'Kothrud, Pune', map: 'https://maps.app.goo.gl/RW3bv5Q9Tj72usn27' },
  { name: 'Tiparii JM Road', city: 'JM Road,Pune', map: 'https://maps.app.goo.gl/5SU3Tvg4ysCxkacTA' },
  { name: 'Tiparii New Sangvi', city: 'Sangvi, Pune', map: 'https://maps.app.goo.gl/dkFagaUYtP2bwBC97' },
  { name: 'Tiparii Dombivali', city: 'Mumbai', map: 'https://maps.app.goo.gl/3q8NBBBLEm4hJaJ47' },
  { name: 'Tiparii Virar ', city: 'Mumbai', map: 'https://maps.app.goo.gl/GNoNm2vBCav2kSZB6' }
];

function renderLocations(query = '') {
  const grid = document.getElementById('locationGrid');
  const matches = franchiseLocations.filter(({ name, city }) => `${name} ${city}`.toLowerCase().includes(query.toLowerCase()));
  const milestoneCard = `<article class="network-milestone" aria-label="Tiparii growth milestone"><div class="milestone-icon"><i class="fa-solid fa-ice-cream"></i></div><div><span class="milestone-kicker">Tiparii growth milestone</span><strong><b>250</b> Carts Started</strong><p>in just <b>6 months</b></p></div><i class="fa-solid fa-arrow-trend-up milestone-trend" aria-hidden="true"></i></article>`;
  grid.innerHTML = matches.length ? matches.map(location => {
    const card = `<a class="location-card" href="${location.map}" target="_blank" rel="noopener" aria-label="View ${location.name} on Google Maps"><div class="pin"><i class="fa-solid fa-location-dot"></i></div><div><h3>${location.name}</h3><p>${location.city}</p><span class="location-action">View on Google Maps <i class="fa-solid fa-arrow-up-right-from-square"></i></span></div></a>`;
    return location.name.trim() === 'Tiparii Virar' ? card + milestoneCard : card;
  }).join('') : '<p class="no-results">No locations found. Try another city.</p>';
}
