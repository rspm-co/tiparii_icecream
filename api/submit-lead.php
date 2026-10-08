<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['success' => false, 'message' => 'Method not allowed.'], 405);
start_captcha_session();
$input = static fn(string $key): string => trim((string)($_POST[$key] ?? ''));
$name = $input('name');
$mobile = preg_replace('/\D+/', '', $input('mobile'));
$city = $input('city');
$budget = $input('budget');
$location = $input('preferredLocation');
$message = $input('message');
$brand = strtolower($input('brand')) ?: 'tiparii';
if (mb_strlen($name) < 2 || strlen($mobile) !== 10 || mb_strlen($city) < 2 || !$budget || mb_strlen($location) < 2) json_response(['success' => false, 'message' => 'Please complete all required fields with valid details.'], 422);
if (!isset($_SESSION['captcha_answer'], $_SESSION['captcha_expires']) || time() > $_SESSION['captcha_expires'] || !hash_equals((string)$_SESSION['captcha_answer'], $input('captcha_answer'))) {
    json_response(['success' => false, 'message' => 'Please complete the verification question correctly.'], 422);
}

try {
    $pdo = db();
    $brandQuery = $pdo->prepare('SELECT id FROM brands WHERE slug = ? AND is_active = 1 LIMIT 1');
    $brandQuery->execute([$brand]);
    $brandRow = $brandQuery->fetch();
    if (!$brandRow) json_response(['success' => false, 'message' => 'This brand is currently unavailable.'], 422);
    $insert = $pdo->prepare('INSERT INTO leads (brand_id, name, mobile, city, investment_budget, preferred_location, message, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    $insert->execute([$brandRow['id'], $name, $mobile, $city, $budget, $location, $message ?: null, 'website']);
    unset($_SESSION['captcha_answer'], $_SESSION['captcha_expires']);
    json_response(['success' => true]);
} catch (Throwable $error) {
    error_log('Lead submission error: ' . $error->getMessage());
    json_response(['success' => false, 'message' => 'Unable to submit your enquiry right now. Please try again shortly.'], 500);
}
