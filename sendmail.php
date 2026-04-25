<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

$mail = new PHPMailer(true);

try {

    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;

    $mail->Username   = 'yourgmail@gmail.com';   // 👈 YOUR EMAIL
    $mail->Password   = 'your_app_password';     // 👈 APP PASSWORD

    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // FROM
    $mail->setFrom('yourgmail@gmail.com', 'Website Lead');

    // TO (CLIENT EMAIL)
    $mail->addAddress('clientemail@gmail.com');

    // FORM DATA
    $name  = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    // EMAIL CONTENT
    $mail->isHTML(true);
    $mail->Subject = '🔥 New Lead from Website';

    $mail->Body = "
        <h2>New Enquiry</h2>
        <p><b>Name:</b> $name</p>
        <p><b>Phone:</b> $phone</p>
        <p><b>Email:</b> $email</p>
    ";

    $mail->addReplyTo($email, $name);

    $mail->send();

    // Redirect after submit
    header("Location: thankyou.html");

} catch (Exception $e) {
    echo "Error: {$mail->ErrorInfo}";
}
?>