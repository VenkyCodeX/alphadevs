// ========== API URL ==========
const REVIEWS_API = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api/reviews'
  : 'https://alphadevs.onrender.com/api/reviews';

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

// ========== LOAD REVIEWS ==========
async function loadReviews() {
  const grid  = document.getElementById('reviewsGrid');
  const empty = document.getElementById('reviewsEmpty');

  try {
    const res  = await fetch(REVIEWS_API);
    const data = await res.json();

    if (!data.success || !data.data.length) {
      grid.innerHTML = '';
      empty.style.display = 'flex';
      return;
    }

    empty.style.display = 'none';
    grid.innerHTML = data.data.map(r => {
      const initials = r.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
      const starsHtml = Array.from({ length: 5 }, (_, i) =>
        `<i class="fa-${i < r.rating ? 'solid' : 'regular'} fa-star"></i>`
      ).join('');

      return `
        <div class="testimonial-card reveal">
          <div class="testimonial-stars">${starsHtml}</div>
          <p>"${r.message}"</p>
          <div class="testimonial-author">
            <div class="author-avatar">${initials}</div>
            <div>
              <h4>${r.name}</h4>
              <span>${r.role}</span>
            </div>
          </div>
        </div>`;
    }).join('');

  } catch (err) {
    console.error('Reviews load error:', err);
    grid.innerHTML = `<p class="reviews-error">Could not load reviews. Make sure the backend is running.</p>`;
  }
}

loadReviews();
