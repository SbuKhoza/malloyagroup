import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const { to, subject, name, email, phone, message } = await request.json()

    // Create transporter using your SMTP settings
    const transporter = nodemailer.createTransporter({
      host: "mail.malloyagroup.co.za",
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: "info@malloyagroup.co.za",
        pass: process.env.EMAIL_PASSWORD, // You'll need to set this environment variable
      },
    })

    // Email content
    const emailContent = `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      
      Message:
      ${message}
      
      ---
      This email was sent from the contact form on malloyagroup.co.za
    `

    // Send email
    await transporter.sendMail({
      from: "info@malloyagroup.co.za",
      to: "info@malloyagroup.co.za",
      subject: subject,
      text: emailContent,
      replyTo: email, // Allow easy reply to the sender
    })

    return Response.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Email sending error:", error)
    return Response.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
