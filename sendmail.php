<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name  = htmlspecialchars($_POST['name'] ?? '');
    $phone = htmlspecialchars($_POST['phone'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');

    // Enquiry will be sent to this email
    $to = "eshitasrivastava394@gmail.com";

    $subject = "New Free Consultation Enquiry";

    $message = "
    <html>
    <body>
        <h2>New Free Consultation Enquiry</h2>

        <p><strong>Name:</strong> $name</p>
        <p><strong>Mobile Number:</strong> $phone</p>
        <p><strong>Email:</strong> $email</p>

    </body>
    </html>
    ";

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";
    $headers .= "From: Website Enquiry <eshitasrivastava394@gmail.com>\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "<script>
                alert('Thank you! Your enquiry has been submitted successfully.');
                window.location.href='index.html';
              </script>";
    } else {
        echo "<script>
                alert('Sorry, something went wrong. Please try again.');
                window.history.back();
              </script>";
    }
}
?>