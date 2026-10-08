<?php
declare(strict_types=1);
require __DIR__ . '/../api/bootstrap.php';
require_admin();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: index.php'); exit; }
$id = (int)($_POST['id'] ?? 0);
$status = (string)($_POST['status'] ?? '');
$allowed = ['new','contacted','follow_up','qualified','closed','rejected'];
if ($id > 0 && in_array($status, $allowed, true)) {
    db()->prepare('UPDATE leads SET status = ? WHERE id = ?')->execute([$status, $id]);
}
$return = (string)($_POST['return'] ?? 'index.php');
header('Location: ' . (str_starts_with($return, '/') ? 'index.php' : $return));
