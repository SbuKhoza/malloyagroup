import nodemailer from 'nodemailer';

// Create transporter function
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'your-smtp-host', // Replace with your actual SMTP host
    port: 465, // Usually 465 for SSL
    secure: true,
    auth: {
      user: 'info@malloyagroup.co.za',
      pass: 'your-email-password'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Email sending function
const sendEmail = async (emailData) => {
  const transporter = createTransporter();

  try {
    // Verify connection
    await transporter.verify();

    // Send email
    const info = await transporter.sendMail({
      from: '"Malloya Group" <info@malloyagroup.co.za>',
      to: 'info@malloyagroup.co.za', // Where you want to receive contact form submissions
      subject: emailData.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${emailData.name}</p>
          <p><strong>Email:</strong> ${emailData.email}</p>
          <p><strong>Phone:</strong> ${emailData.phone || 'Not provided'}</p>
          <p><strong>Service:</strong> ${emailData.service || 'Not specified'}</p>
          <hr/>
          <p><strong>Message:</strong></p>
          <p>${emailData.message}</p>
        </div>
      `
    });

    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// API Route Handler
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const emailData = req.body;
      
      // Validate required fields
      if (!emailData.name || !emailData.email || !emailData.subject || !emailData.message) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required fields' 
        });
      }

      // Send email
      await sendEmail(emailData);

      // Respond with success
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Email sending error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to send email' 
      });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}