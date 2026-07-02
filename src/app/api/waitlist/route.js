import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();
    const { 
      fullName, 
      email, 
      phone, 
      city, 
      province, 
      ageGroup, 
      interests, 
      howDidYouHear, 
      message, 
      newsletterOptIn 
    } = data;

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Your email address (e.g., info@tvibe.ca)
        pass: process.env.SMTP_PASS, // Your email App Password
      },
    });

    // Format interests array to string if it exists
    const interestsString = Array.isArray(interests) ? interests.join(", ") : interests || "None specified";

    const mailOptions = {
      from: process.env.SMTP_USER || "info@tvibe.ca",
      to: "info@tvibe.ca",
      subject: `New Waitlist Signup: ${fullName}`,
      text: `You have received a new waitlist signup from the website!

Waitlist Details:
-------------------------
Full Name: ${fullName || 'N/A'}
Email Address: ${email || 'N/A'}
Phone Number: ${phone || 'N/A'}
City: ${city || 'N/A'}
Province/State: ${province || 'N/A'}
Age Group: ${ageGroup || 'N/A'}

Interests: ${interestsString}
Heard About TVIBE From: ${howDidYouHear || 'N/A'}

Additional Message:
${message || 'No additional message.'}

Opted into Newsletter: ${newsletterOptIn ? "YES" : "NO"}
-------------------------
`,
      replyTo: email,
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn("SMTP credentials not found in environment variables. Email was not sent.");
    }

    return new Response(JSON.stringify({ success: true, message: "Waitlist joined successfully" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Error sending waitlist email:", error);
    return new Response(JSON.stringify({ success: false, message: "Failed to process waitlist signup" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
