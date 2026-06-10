import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, budget, message } = body;

    // Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // If Resend API key is configured, send email
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL || "hello@siaenterprises.com.np";

    if (resendKey && resendKey !== "your_resend_key") {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: "SIA Enterprises Contact <noreply@siaenterprises.com.np>",
        to: [toEmail],
        replyTo: email,
        subject: `New enquiry from ${name} — ${service || "General"}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f8f7f4; border-radius: 12px;">
            <div style="background: #1A1A2E; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
              <h1 style="color: white; font-size: 24px; margin: 0;">SIA Enterprises — New Enquiry</h1>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #E4E2DC; color: #6B6B6B; font-size: 14px; width: 140px;">Name</td><td style="padding: 12px 0; border-bottom: 1px solid #E4E2DC; font-weight: 500;">${name}</td></tr>
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #E4E2DC; color: #6B6B6B; font-size: 14px;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid #E4E2DC;"><a href="mailto:${email}">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #E4E2DC; color: #6B6B6B; font-size: 14px;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid #E4E2DC;">${phone}</td></tr>` : ""}
              ${service ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #E4E2DC; color: #6B6B6B; font-size: 14px;">Service</td><td style="padding: 12px 0; border-bottom: 1px solid #E4E2DC;">${service}</td></tr>` : ""}
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #E4E2DC; color: #6B6B6B; font-size: 14px;">Budget</td><td style="padding: 12px 0; border-bottom: 1px solid #E4E2DC;">NPR ${Number(budget).toLocaleString()}</td></tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #E4E2DC;">
              <p style="color: #6B6B6B; font-size: 13px; margin: 0 0 8px;">Message</p>
              <p style="white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            <p style="margin-top: 24px; color: #6B6B6B; font-size: 12px; text-align: center;">SIA Enterprises · Kathmandu, Nepal · siaenterprises.com.np</p>
          </div>
        `,
      });
    } else {
      // Dev mode — just log
      console.log("📬 Contact form submission (Resend not configured):", { name, email, phone, service, budget, message });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
