import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // This is the n8n TEST URL
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

    if (!N8N_WEBHOOK_URL) {
      return NextResponse.json({ error: 'N8N_WEBHOOK_URL is not defined' }, { status: 500 });
    }

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}