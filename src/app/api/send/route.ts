import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['ayushkumawat9549@gmail.com'],
            subject: `New Mission Request from ${name}`,
            replyTo: email,
            html: `
        <div style="font-family: monospace; background-color: #000; color: #fff; padding: 20px; border: 1px solid #22d3ee;">
          <h2 style="color: #22d3ee; text-transform: uppercase;">Incoming Mission Transmission</h2>
          <p><strong>Soldier Name:</strong> ${name}</p>
          <p><strong>Comms Email:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #333;" />
          <p><strong>Mission Objective:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
          <hr style="border: 0; border-top: 1px solid #333;" />
          <p style="font-size: 10px; color: #666;">Authenticated Battle Report via Portfolio Hub</p>
        </div>
      `,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
