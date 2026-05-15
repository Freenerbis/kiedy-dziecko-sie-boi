import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import PurchaseConfirmation from '@/emails/purchase-confirmation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const resend = new Resend(process.env.RESEND_API_KEY!);

const DOWNLOAD_URL = 'https://pomocemocjonalna.pl/Kiedy_Twoje_Dziecko_Sie_Boi.pdf';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature error:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name?.split(' ')[0] || 'Mamo';

    if (!customerEmail) {
      return NextResponse.json({ error: 'No email' }, { status: 400 });
    }

    const html = await render(
      PurchaseConfirmation({ customerName, downloadUrl: DOWNLOAD_URL })
    );

    await resend.emails.send({
      from: 'Katarzyna Wiśniewska <kontakt@pomocemocjonalna.pl>',
      to: customerEmail,
      subject: '📘 Twój ebook jest gotowy do pobrania',
      html,
    });

    console.log(`Email sent to ${customerEmail}`);
  }

  return NextResponse.json({ received: true });
}
