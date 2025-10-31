<?php
require_once 'nama_database-kamu.php';

$username = 'admin';
$password = password_hash('ilham041316A#', PASSWORD_DEFAULT); // hash password
$email = 'ilhamkhumaidi23@gmail.com';
$fullname = 'Administrator';

$stmt = $pdo->prepare("INSERT INTO admin (username, password, email, fullname) VALUES (?, ?, ?, ?)");
$stmt->execute([$username, $password, $email, $fullname]);

echo "Admin berhasil ditambahkan!";
