<?php
declare(strict_types=1);

function app_config(): array {
    $path = __DIR__ . '/config.php';
    if (!is_file($path)) throw new RuntimeException('Server configuration is missing. Copy api/config.example.php to api/config.php.');
    return require $path;
}

function db(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;
    $config = app_config();
    $pdo = new PDO("mysql:host={$config['db_host']};dbname={$config['db_name']};charset=utf8mb4", $config['db_user'], $config['db_pass'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false]);
    return $pdo;
}

function json_response(array $body, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($body);
    exit;
}

function start_admin_session(): void {
    $config = app_config();
    session_name($config['session_name'] ?? 'franchise_admin');
    session_set_cookie_params(['httponly' => true, 'samesite' => 'Lax', 'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off']);
    session_start();
}

function start_captcha_session(): void {
    $config = app_config();
    session_name(($config['session_name'] ?? 'tiparii') . '_captcha');
    session_set_cookie_params(['httponly' => true, 'samesite' => 'Lax', 'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off']);
    session_start();
}

function require_admin(): void {
    start_admin_session();
    if (empty($_SESSION['admin_id'])) { header('Location: login.php'); exit; }
}
