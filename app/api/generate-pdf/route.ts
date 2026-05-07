import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function POST(req: Request) {
  try {
    // Dynamic import of puppeteer (not available in Edge runtime)
    const puppeteer = await import('puppeteer');
    const browser   = await puppeteer.default.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--font-render-hinting=none',
      ],
    });

    const page = await browser.newPage();

    // Set viewport to A4 width at 96dpi
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

    // Navigate to the preview page — derive base URL from incoming request
    const reqUrl  = new URL(req.url);
    const baseUrl = process.env.NEXT_PUBLIC_URL
      || `${reqUrl.protocol}//${reqUrl.host}`;
    await page.goto(`${baseUrl}/ebook-preview`, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });

    // Wait for all ebook pages to render
    await page.waitForSelector('.ebook-page-wrapper', { timeout: 30000 });

    // Count pages rendered
    const pageCount = await page.evaluate(() => {
      return document.querySelectorAll('.ebook-page-wrapper').length;
    });

    // Generate PDF with print background and correct A4 dimensions
    const outputPath = path.join(process.cwd(), 'public', 'ebook-output.pdf');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,          // CRITICAL — preserves background colors
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: false,
      displayHeaderFooter: false,
    });

    // Save PDF to /public
    fs.writeFileSync(outputPath, pdfBuffer);

    await browser.close();

    return NextResponse.json({
      success: true,
      pages: pageCount,
      path: '/ebook-output.pdf',
    });
  } catch (error: any) {
    console.error('[generate-pdf] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export const maxDuration = 120; // 2 minutes for Vercel (ignored locally)
