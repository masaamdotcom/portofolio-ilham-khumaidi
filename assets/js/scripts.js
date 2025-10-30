// Variabel
let nama = "Ilham Khumaidi";
let pekerjaan = "Web Developer Pemula";

// Fungsi sederhana
function perkenalan() {
  console.log(`Halo, saya ${nama}, seorang ${pekerjaan}.`);
}

// Jalankan fungsi
perkenalan();

// Event Listener untuk tombol
const btnHire = document.getElementById("btnHire");
btnHire.addEventListener("click", function() {
  alert(`Halo! Kamu bisa menghubungi ${nama} untuk kerja sama 😎`);
});

// Toggle navbar (mobile)
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navLinks'); // ubah jadi navMenu biar unik

burger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Dapatkan semua link navbar
const navItems = document.querySelectorAll('nav a'); // ubah jadi navItems

// Event scroll
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

document.getElementById("current-year").textContent = new Date().getFullYear();

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

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "#2cf216");   // warna akhir
gradient.addColorStop(0.5, "#ff0066");   // warna awal
gradient.addColorStop(1, "#ffcc00"); // warna tengah


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
