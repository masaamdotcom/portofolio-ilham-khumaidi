// Event Listener untuk tombol
const btnHire = document.getElementById("btnHire");
btnHire.addEventListener("click", function() {
  alert(`Halo! Kamu bisa menghubungi ${nama} untuk kerja sama 😎 dengan mengisi form Hubungi Saya dibawah!`);
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});
// Animated Counters
const counters = document.querySelectorAll('.stat span');
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const speed = 200; // kecepatan
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target;
    }
  };
// Intersection Observer untuk memulai animasi saat elemen terlihat
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      updateCount();
      obs.unobserve(counter);
    }
  });
  obs.observe(counter);
});
document.querySelectorAll('.about-img, .about-text').forEach(el => observer.observe(el));
document.querySelectorAll('.skill').forEach(el => observer.observe(el));

// Toggle navbar (mobile)
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navLinks'); // ubah jadi navMenu biar unik

burger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Tutup menu otomatis saat link diklik (khusus mobile)
const navItems = document.querySelectorAll('nav a');

navItems.forEach(link => {
  link.addEventListener('click', () => {
    // hanya tutup jika menu sedang aktif (terbuka)
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }
  });
});

// Event scroll untuk memberi efek aktif di navbar
window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 100;

  navItems.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) {
      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
});
// Google Sheets Form Submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbzLoS9JGDch29nt00HSJcQRzLd4cscShK2KnvnGOgU3XcfGEeRQcoEZNbbql4dBCNnVdg/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById('msg') // elemen buat feedback

form.addEventListener('submit', e => {
  e.preventDefault()

  msg.innerHTML = '⏳ Mengirim data...'
  msg.style.color = '#007bff'

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      if (response.ok) {
        msg.innerHTML = '✅ Pesan berhasil dikirim! Terima kasih 🙏'
        msg.style.color = '#28a745'
        form.reset()
      } else {
        throw new Error('Gagal mengirim data.')
      }
    })
    .catch(error => {
      msg.innerHTML = '❌ Terjadi kesalahan, coba lagi.'
      msg.style.color = '#dc3545'
      console.error('Error!', error.message)
    })
})

// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// ECG Background Animation
const canvas = document.getElementById("ecg-bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let points = [];
let x = 0;
const baseY = canvas.height / 2;
const speed = 4;

// Siapkan buffer awal
function resetPoints() {
  points = [];
  for (let i = 0; i < canvas.width; i++) {
    points.push(baseY);
  }
}
resetPoints();

// Variabel scanner cahaya
let scanX = 0;

// Timer detak
let heartbeatTimer = 0;

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ECG Line
  ctx.beginPath();
  ctx.moveTo(0, points[0]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(i, points[i]);
  }
// Gradient warna garis ECG
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "#2cf216");   // warna awal
  gradient.addColorStop(0.5, "#ff0066");   // warna tengah
  gradient.addColorStop(1, "#ffcc00"); // warna akhir


  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2;
  ctx.shadowColor = "#00ffff";
  ctx.shadowBlur = 15;
  ctx.stroke();

  // Scanner effect
  const scannerWidth = 80;
  const scannerGradient = ctx.createLinearGradient(scanX - scannerWidth, 0, scanX + scannerWidth, 0);
  scannerGradient.addColorStop(0, "rgba(0,255,255,0)");
  scannerGradient.addColorStop(0.5, "rgba(0,255,255,0.3)");
  scannerGradient.addColorStop(1, "rgba(0,255,255,0)");
  ctx.fillStyle = scannerGradient;
  ctx.fillRect(scanX - scannerWidth, 0, scannerWidth * 2, canvas.height);

  scanX += 6;
  if (scanX > canvas.width + scannerWidth) scanX = -scannerWidth;

  // ECG movement
  points.shift();

  let newY = baseY + Math.sin(x / 10) * 3;
  heartbeatTimer++;

  // Dua detakan cepat (double spike)
  if (heartbeatTimer % 100 === 0) {
    newY = baseY - (Math.random() * 150 + 80);
  } else if (heartbeatTimer % 100 === 10) {
    newY = baseY - (Math.random() * 120 + 60);
  } else if (heartbeatTimer % 100 === 20) {
    newY = baseY + (Math.random() * 90 + 40);
  }

  // Tambahkan variasi acak ringan
  const rand = Math.random();
  if (rand > 0.995) newY -= Math.random() * 100;
  if (rand < 0.005) newY += Math.random() * 100;

  points.push(newY);
  x += speed / 2;

  requestAnimationFrame(draw);
}

draw();

// Skill Bar Animation
document.querySelectorAll('.bar').forEach(bar => {
  const fill = bar.querySelector('.fill');
  const percentText = bar.querySelector('.percent');
  const target = parseInt(bar.getAttribute('data-percent'));
  let current = 0;
  let started = false;

  const animateBar = () => {
    if (started) return; // biar ga keulang
    started = true;

    fill.style.width = target + '%';
    bar.classList.add('active');

    const interval = setInterval(() => {
      if (current < target) {
        current++;
        percentText.textContent = current + '%';
      } else {
        percentText.textContent = target + '%'; // pastikan berhenti pas target
        clearInterval(interval);
      }
    }, 15); // makin kecil makin cepat angka naik
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateBar();
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(bar);
});

// Animasi muncul saat scroll
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      projectObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

projectCards.forEach(card => projectObserver.observe(card));

// Modal Project Details
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalImg = document.getElementById('modalImg');
const modalLink = document.getElementById('modalLink');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent = card.querySelector('h3').textContent;
    modalDesc.textContent = card.querySelector('p').textContent;
    modalImg.src = card.querySelector('img').src;
    modalLink.href = card.querySelector('a').href;
    modal.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
