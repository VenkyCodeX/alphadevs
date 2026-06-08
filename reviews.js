// ========== API URL ==========
const REVIEWS_API = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api/reviews'
  : 'https://alphadevs.onrender.com/api/reviews';

// ========== DUMMY REVIEWS (shown when API has no data) ==========
const DUMMY_REVIEWS = [
  { name: 'Rahul Sharma', role: 'Founder, TechStart', message: 'AlphaDevs delivered our website in just 10 days. The design is stunning and our conversions have tripled since launch. Highly recommend!', rating: 5 },
  { name: 'Priya Nair', role: 'Owner, Bloom Boutique', message: 'Venkat understood exactly what I needed for my business website. Professional, responsive, and delivered on time. Will definitely work again!', rating: 5 },
  { name: 'Karan Mehta', role: 'CEO, RideEasy', message: 'The bike rental platform they built for us is rock solid. Bookings have gone up 40% since launch. Great team!', rating: 5 },
  { name: 'Sneha Reddy', role: 'Interior Designer', message: 'My portfolio website looks absolutely gorgeous. Clients always compliment how professional it looks. AlphaDevs nailed the brief perfectly.', rating: 5 },
  { name: 'Arjun Patel', role: 'Gaming Cafe Owner', message: 'Outstanding work on our gaming rental platform. The admin dashboard is easy to use and the site loads super fast. 10/10!', rating: 5 },
];

// ========== STAR RATING ==========
let selectedRating = 5;
const stars = document.querySelectorAll('#starRating .fa-star');

stars.forEach(star => {
  star.addEventListener('mouseenter', () => highlightStars(+star.dataset.value));
  star.addEventListener('mouseleave', () => highlightStars(selectedRating));
  star.addEventListener('click', () => {
    selectedRating = +star.dataset.value;
    highlightStars(selectedRating);
  });
});

function highlightStars(count) {
  stars.forEach(s => s.classList.toggle('active', +s.dataset.value <= count));
}
highlightStars(selectedRating);

// ========== MODAL ==========
const modal    = document.getElementById('reviewModal');
const openBtn  = document.getElementById('openReviewModal');
const closeBtn = document.getElementById('closeReviewModal');

openBtn.addEventListener('click',  () => modal.classList.add('open'));
closeBtn.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

// ========== SUBMIT REVIEW ==========
const reviewForm      = document.getElementById('reviewForm');
const reviewSubmitBtn = document.getElementById('reviewSubmitBtn');

reviewForm.addEventListener('submit', async e => {
  e.preventDefault();

  const name    = document.getElementById('reviewName').value.trim();
  const role    = document.getElementById('reviewRole').value.trim();
  const message = document.getElementById('reviewMessage').value.trim();

  if (!name || !message) return;

  reviewSubmitBtn.disabled = true;
  reviewSubmitBtn.querySelector('span').textContent = 'Submitting...';

  try {
    const res  = await fetch(REVIEWS_API, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, role, message, rating: selectedRating }),
    });
    const data = await res.json();

    if (data.success) {
      reviewForm.reset();
      selectedRating = 5;
      highlightStars(5);
      modal.classList.remove('open');
      showNotification('Thank you for your review! 🎉', 'success');
      loadReviews();
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    showNotification(err.message || 'Failed to submit. Please try again.', 'error');
  } finally {
    reviewSubmitBtn.disabled = false;
    reviewSubmitBtn.querySelector('span').textContent = 'Submit Review';
  }
});

// ========== RENDER REVIEW CARDS ==========
function renderReviews(reviews) {
  const grid  = document.getElementById('reviewsGrid');
  const empty = document.getElementById('reviewsEmpty');

  empty.style.display = 'none';
  grid.innerHTML = '';

  reviews.forEach(r => {
    const initials = r.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const starsHtml = Array.from({ length: 5 }, (_, i) =>
      `<i class="fa-${i < r.rating ? 'solid' : 'regular'} fa-star"></i>`
    ).join('');

    const card = document.createElement('div');
    card.className = 'testimonial-card reveal';
    card.innerHTML = `<div class="testimonial-stars">${starsHtml}</div>`;

    const p = document.createElement('p');
    p.textContent = `"${r.message}"`;
    card.appendChild(p);

    const authorDiv = document.createElement('div');
    authorDiv.className = 'testimonial-author';

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'author-avatar';
    avatarDiv.textContent = initials;

    const infoDiv = document.createElement('div');
    const h4 = document.createElement('h4');
    h4.textContent = r.name;
    const span = document.createElement('span');
    span.textContent = r.role;
    infoDiv.appendChild(h4);
    infoDiv.appendChild(span);

    authorDiv.appendChild(avatarDiv);
    authorDiv.appendChild(infoDiv);
    card.appendChild(authorDiv);
    grid.appendChild(card);
  });
}

// ========== LOAD REVIEWS ==========
async function loadReviews() {
  const grid  = document.getElementById('reviewsGrid');
  const empty = document.getElementById('reviewsEmpty');

  try {
    const res  = await fetch(REVIEWS_API);
    const data = await res.json();

    if (!data.success || !data.data.length) {
      renderReviews(DUMMY_REVIEWS);
      return;
    }

    renderReviews(data.data);

  } catch (err) {
    console.warn('Reviews API unavailable, showing dummy reviews.');
    renderReviews(DUMMY_REVIEWS);
  }
}

loadReviews();
