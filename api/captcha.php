<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
start_captcha_session();

$left = random_int(3, 12);
$right = random_int(1, 9);
$subtract = (bool)random_int(0, 1);
if ($subtract && $right > $left) [$left, $right] = [$right, $left];
$answer = $subtract ? $left - $right : $left + $right;
$_SESSION['captcha_answer'] = (string)$answer;
$_SESSION['captcha_expires'] = time() + 900;
header('Cache-Control: no-store, no-cache, must-revalidate');
json_response(['success' => true, 'question' => "$left " . ($subtract ? '−' : '+') . " $right = ?"]);
