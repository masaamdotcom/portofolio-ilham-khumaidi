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
const scriptURL = 'https://script.google.com/macros/s/AKfycbzE1eZt7slwp3vW-8kVWpWvXQkjlFuJHCw2TLs2y7PSsyvO1IGCN3TImdDm_TD3wq4SHw/exec'; // ganti dengan URL kamu

function sendMessage(e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then(() => {
      alert('Pesan kamu sudah terkirim ke Google Sheet! ✅');
      form.reset();
    })
    .catch((err) => {
      console.error('Error:', err);
      alert('Gagal mengirim pesan ❌');
    });
}

