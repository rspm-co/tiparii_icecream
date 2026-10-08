<?php
declare(strict_types=1);
require __DIR__ . '/../api/bootstrap.php';
start_admin_session();
if (!empty($_SESSION['admin_id'])) { header('Location: index.php'); exit; }
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim((string)($_POST['email'] ?? ''));
    $password = (string)($_POST['password'] ?? '');
    $query = db()->prepare('SELECT id, full_name, password_hash FROM admin_users WHERE email = ? AND is_active = 1 LIMIT 1');
    $query->execute([$email]);
    $admin = $query->fetch();
    if ($admin && password_verify($password, $admin['password_hash'])) {
        session_regenerate_id(true);
        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_name'] = $admin['full_name'];
        header('Location: index.php'); exit;
    }
    $error = 'Invalid email or password.';
}
?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Franchise CRM Login</title><link rel="stylesheet" href="admin.css"></head><body class="login-page"><main class="login-card"><p class="eyebrow">Franchise CRM</p><h1>Admin sign in</h1><?php if ($error): ?><p class="error"><?= htmlspecialchars($error) ?></p><?php endif; ?><form method="post"><label>Email<input type="email" name="email" required autocomplete="email"></label><label>Password<input type="password" name="password" required autocomplete="current-password"></label><button type="submit">Sign in</button></form></main></body></html>
