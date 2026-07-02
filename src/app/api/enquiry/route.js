import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();
    const { 
      fullName, 
      businessName, 
      phone, 
      email, 
      socialMedia, 
      connectingFor, 
      howDidYouHear, 
      message 
    } = data;

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Format the connectingFor array into a comma separated string
    const connectionsStr = Array.isArray(connectingFor) && connectingFor.length > 0 
      ? connectingFor.join(", ") 
      : "None selected";

    const mailOptions = {
      from: process.env.SMTP_USER || "info@tvibe.ca",
      to: "info@tvibe.ca",
      subject: `New General Inquiry from ${fullName} (${businessName})`,
      text: `You have received a new general inquiry from the TVIBE website!

=============================================
CONTACT DETAILS
=============================================
Full Name: ${fullName}
Business Name: ${businessName}
Phone Number: ${phone}
Email Address: ${email}
Social Media Handle: ${socialMedia || 'Not provided'}

=============================================
INQUIRY DETAILS
=============================================
Connecting For: 
- ${connectionsStr}

How did you hear about TVIBE? 
- ${howDidYouHear || 'Not provided'}

=============================================
MESSAGE
=============================================
${message || 'No message provided'}
`,
      replyTo: email,
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn("SMTP credentials not found. Development mode: skipping actual email dispatch.");
    }

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Error sending general inquiry:", error);
    return new Response(JSON.stringify({ success: false, message: "Failed to send email" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
