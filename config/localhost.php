<?php
// db.php

$host = 'localhost';       // biasanya 'localhost'
$dbname = 'ilhamkhumaidi_db'; // ganti dengan nama database kamu
$username = 'root';        // default user XAMPP
$password = '';            // default kosong (XAMPP), sesuaikan jika kamu punya password

try {
  // Membuat koneksi menggunakan PDO
  $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);

  // Mengatur mode error PDO menjadi exception
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // (Opsional) mengatur fetch mode default
  $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
  // Jika gagal terkoneksi, tampilkan pesan error
  die("Koneksi ke database gagal: " . $e->getMessage());
}
