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
const speed = 3;

// Inisialisasi titik
function resetPoints() {
  points = [];
  for (let i = 0; i < canvas.width; i++) {
    points.push(baseY);
  }
}
resetPoints();

// Variabel untuk efek scanner
let scanX = 0;

function draw() {
  // Latar belakang sedikit transparan agar efek trail muncul
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ECG line
  ctx.beginPath();
  ctx.moveTo(0, points[0]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(i, points[i]);
  }

  // Warna garis gradasi neon
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "#ff0066");
gradient.addColorStop(1, "#ffcc00");
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2;
  ctx.shadowColor = "#00ffff";
  ctx.shadowBlur = 20;
  ctx.stroke();

  // Efek garis scanner
  const scannerWidth = 80;
  const scannerGradient = ctx.createLinearGradient(scanX - scannerWidth, 0, scanX + scannerWidth, 0);
  scannerGradient.addColorStop(0, "rgba(0,255,255,0)");
  scannerGradient.addColorStop(0.5, "rgba(0,255,255,0.3)");
  scannerGradient.addColorStop(1, "rgba(0,255,255,0)");
  ctx.fillStyle = scannerGradient;
  ctx.fillRect(scanX - scannerWidth, 0, scannerWidth * 2, canvas.height);

  // Update posisi scanner
  scanX += 5;
  if (scanX > canvas.width + scannerWidth) scanX = -scannerWidth;

  // Gerakan ECG
  points.shift();

  let newY = baseY + Math.sin(x / 15) * 4;
  const rand = Math.random();

  if (rand > 0.985) {
    newY = baseY - (Math.random() * 150 + 70); // lonjakan besar
  } else if (rand < 0.02) {
    newY = baseY + (Math.random() * 100); // jatuh
  }

  points.push(newY);
  x += speed / 2;

  requestAnimationFrame(draw);
}

draw();
