<?php

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

$to      = 'rahulsanskar07@gmail.com';
$subject = 'New Free Consultation Enquiry';

$body = "New Website Enquiry\n\n" .
        "Form: $formType\n" .
        "Name: $name\n" .
        "Phone: $phone\n" .
        "Email: $email\n" .
        "Budget: $budget\n" .
        "Location: $location\n";

$headers = "From: BHU Infra Developers Website <bhuinfradevelopers@gmail.com>\r\n" .
           "Reply-To: " . ($email !== '' ? "$name <$email>" : 'Website Visitor') . "\r\n" .
           "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo 'success';
} else {
    http_response_code(500);
    echo 'Mailer Error: Failed to send email.';
}