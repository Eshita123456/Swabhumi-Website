<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Read JSON body (sent from fetch) or fallback to POST form data
$input = file_get_contents('php://input');
$data  = json_decode($input, true);

if (!$data) {
    $data = $_POST;
}

$name     = trim($data['name']     ?? '');
$phone    = trim($data['phone']    ?? '');
$email    = trim($data['email']    ?? '');
$budget   = trim($data['budget']   ?? '');
$location = trim($data['location'] ?? '');
$formType = trim($data['formType'] ?? 'Free Consultation');

// Basic validation
if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill in all required fields.']);
    exit();
}

if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address.']);
    exit();
}

// -------------------------------------------------------
// SET YOUR CLIENT'S EMAIL ADDRESS HERE
// -------------------------------------------------------
$to      = 'info@bhuinfo.in';
$subject = "New Enquiry - {$formType} from {$name}";
// -------------------------------------------------------

$emailBody = "
New Enquiry Received
====================

Form Type : {$formType}
Name      : {$name}
Phone     : {$phone}
Email     : " . ($email ?: 'Not provided') . "
Budget    : " . ($budget ?: 'Not specified') . "
Location  : " . ($location ?: 'Not specified') . "

--
This email was sent from the Swabhumi website contact form.
";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: Swabhumi Website <noreply@" . ($_SERVER['HTTP_HOST'] ?? 'swabhumi.com') . ">\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $emailBody, $headers)) {
    echo json_encode(['success' => true, 'message' => 'success']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email. Please try again.']);
}
?>
