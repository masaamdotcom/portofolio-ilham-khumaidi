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