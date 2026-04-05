import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Initialize the transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
  port: process.env.EMAIL_PORT || 2525,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendApplicationStatusEmail = async (to, name, gigTitle, status) => {
  const isAccepted = status === 'accepted';
  const color = isAccepted ? '#28a745' : '#dc3545';
  const actionText = isAccepted ? 'CONGRATULATIONS!' : 'UPDATE:';

  const mailOptions = {
    from: process.env.EMAIL_FROM || '"Micro-Freelance" <noreply@microfreelance.com>',
    to: to,
    subject: `[Update] Application status for "${gigTitle}"`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; color: #333;">
        <h1 style="color: ${color}; text-align: center;">${actionText}</h1>
        <p>Hello <strong>${name}</strong>,</p>
        <p>The poster for the gig <strong>"${gigTitle}"</strong> has updated your application status.</p>
        
        <div style="background-color: #f8f9fa; border-left: 5px solid ${color}; padding: 15px; margin: 20px 0;">
          <p style="margin: 0;">New Status: <strong style="text-transform: uppercase; color: ${color};">${status}</strong></p>
        </div>

        ${isAccepted
        ? `<p>Great work! The poster will be in touch with you shortly to finalize the next steps.</p>`
        : `<p>Thank you for your interest. While this application wasn't moved forward, we encourage you to keep applying for other opportunities on the platform!</p>`
      }

        <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 30px 0;">
        <p style="font-size: 0.8em; color: #777; text-align: center;">
          This is an automated notification from Micro-Freelance Marketplace.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Error sending application status email:', error);
    // Don't throw error to prevent blocking the main API response
    return null;
  }
};
