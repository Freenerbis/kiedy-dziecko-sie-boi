import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { success: false, error: 'PDF generation is only available locally.' },
    { status: 501 }
  );
}
