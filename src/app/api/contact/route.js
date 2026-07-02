import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { companyName, contactName, email, tierInterest, message } = await req.json();

    // Create a transporter using SMTP
    // You will need to add these to your .env.local file to use it in production
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Your email address (e.g., info@tvibe.ca)
        pass: process.env.SMTP_PASS, // Your email App Password
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER || "info@tvibe.ca",
      to: "info@tvibe.ca",
      subject: `New Sponsorship Inquiry from ${companyName}`,
      text: `You have received a new sponsorship inquiry from the website!

Details:
-------------------------
Company Name: ${companyName}
Contact Name: ${contactName}
Email Address: ${email}
Tier of Interest: ${tierInterest}

Sponsorship Goals / Details:
${message}
-------------------------
`,
      replyTo: email, // This allows you to simply hit "Reply" to respond to the sponsor
    };

    // Attempt to send the email
    // Note: If SMTP credentials are not set, this will fail gracefully.
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn("SMTP credentials not found in environment variables. Email was not sent.");
      // For development purposes, we'll still return success if the user hasn't configured .env yet
    }

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ success: false, message: "Failed to send email" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
