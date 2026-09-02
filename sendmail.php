<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer-master/src/Exception.php';
require __DIR__ . '/PHPMailer-master/src/PHPMailer.php';
require __DIR__ . '/PHPMailer-master/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit('Invalid request.');
}

$name     = trim($_POST['name'] ?? '');
$phone    = trim($_POST['phone'] ?? '');
$email    = trim($_POST['email'] ?? '');
$budget   = trim($_POST['budget'] ?? '');
$location = trim($_POST['location'] ?? '');
$formType = trim($_POST['form_type'] ?? 'Free Consultation');

if ($name === '' || $phone === '') {
    exit('Please fill in all required fields.');
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit('Invalid email address.');
}

$mail = new PHPMailer(true);

try {

    // SMTP SETTINGS
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;

    $mail->Username   = 'bhuinfradevelopers@gmail.com';

    // IMPORTANT:
    // Yahan Gmail ka 16-digit APP PASSWORD daalna hai.
    // Normal Gmail password nahi.
    $mail->Password   = 'YOUR_16_DIGIT_APP_PASSWORD';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->CharSet = 'UTF-8';

    // Sender
    $mail->setFrom(
        'bhuinfradevelopers@gmail.com',
        'BHU Infra Developers Website'
    );

    // Enquiries will arrive here
    $mail->addAddress('bhuinfradevelopers@gmail.com');

    // Visitor's email
    if ($email !== '') {
        $mail->addReplyTo(
            $email,
            $name ?: 'Website Visitor'
        );
    }

    // Email content
    $mail->isHTML(true);

    $mail->Subject = 'New Free Consultation Enquiry';

    $mail->Body = '
        <h2>New Website Enquiry</h2>

        <p><strong>Form:</strong> ' . htmlspecialchars($formType) . '</p>

        <p><strong>Name:</strong> ' . htmlspecialchars($name) . '</p>

        <p><strong>Phone:</strong> ' . htmlspecialchars($phone) . '</p>

        <p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>

        <p><strong>Budget:</strong> ' . htmlspecialchars($budget) . '</p>

        <p><strong>Location:</strong> ' . htmlspecialchars($location) . '</p>
    ';

    $mail->AltBody =
        "New Website Enquiry\n\n" .
        "Form: $formType\n" .
        "Name: $name\n" .
        "Phone: $phone\n" .
        "Email: $email\n" .
        "Budget: $budget\n" .
        "Location: $location\n";

    $mail->send();

    echo 'success';

} catch (Exception $e) {

    http_response_code(500);

    echo 'Mailer Error: ' . $mail->ErrorInfo;
}