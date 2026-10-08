<?php
declare(strict_types=1);
require __DIR__ . '/../api/bootstrap.php';
$pdo = db();
if ((int)$pdo->query('SELECT COUNT(*) FROM admin_users')->fetchColumn() > 0) { header('Location: login.php'); exit; }
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim((string)($_POST['full_name'] ?? ''));
    $email = trim((string)($_POST['email'] ?? ''));
    $password = (string)($_POST['password'] ?? '');
    if (mb_strlen($name) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 12) {
        $error = 'Enter a name, valid email, and a password with at least 12 characters.';
    } else {
        $insert = $pdo->prepare('INSERT INTO admin_users (full_name, email, password_hash) VALUES (?, ?, ?)');
        $insert->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT)]);
        header('Location: login.php'); exit;
    }
}
?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Create Franchise CRM Admin</title><link rel="stylesheet" href="admin.css"></head><body class="login-page"><main class="login-card"><p class="eyebrow">First-time setup</p><h1>Create admin account</h1><?php if ($error): ?><p class="error"><?= htmlspecialchars($error) ?></p><?php endif; ?><form method="post"><label>Full name<input name="full_name" required autocomplete="name"></label><label>Email<input type="email" name="email" required autocomplete="email"></label><label>Password<input type="password" name="password" minlength="12" required autocomplete="new-password"></label><button type="submit">Create admin</button></form></main></body></html>
