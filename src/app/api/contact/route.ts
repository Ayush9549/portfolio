import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, project, budget, message } = body;

    // Validate fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Required fields are missing (name, email, message)." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASS;
    const receiver = process.env.CONTACT_RECEIVER || "ayushkumawat9549@gmail.com";

    if (!gmailUser || !gmailPass) {
      console.error("Missing Gmail credentials in environment variables.");
      return NextResponse.json(
        { error: "Mail server is not configured. Please contact the administrator." },
        { status: 500 }
      );
    }

    // Configure Nodemailer Transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // Structure Email HTML
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-top: 0;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 150px;">Name:</td>
            <td style="padding: 8px 0; color: #1e293b;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
            <td style="padding: 8px 0; color: #1e293b;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Project Scope:</td>
            <td style="padding: 8px 0; color: #1e293b;">${project || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Budget Scope:</td>
            <td style="padding: 8px 0; color: #1e293b;">${budget || "N/A"}</td>
          </tr>
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #2563eb; border-radius: 4px;">
          <h4 style="margin: 0 0 10px 0; color: #1e293b;">Message:</h4>
          <p style="margin: 0; color: #334155; line-height: 1.5; white-space: pre-wrap;">${message}</p>
        </div>
        
        <footer style="margin-top: 20px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 10px;">
          Sent from Portfolio Contact Form
        </footer>
      </div>
    `;

    // Define Mail Options
    const mailOptions = {
      from: `"${name}" <${gmailUser}>`, // Sender address must match authenticated Gmail user
      to: receiver,
      replyTo: email, // Direct replies will go to the sender's email
      subject: `Portfolio Contact: ${name} - ${project || "New Message"}`,
      text: `New Portfolio Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nProject: ${project || "N/A"}\nBudget: ${budget || "N/A"}\n\nMessage:\n${message}`,
      html: emailHtml,
    };

    // Send Mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("Nodemailer contact route error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred." },
      { status: 500 }
    );
  }
}
