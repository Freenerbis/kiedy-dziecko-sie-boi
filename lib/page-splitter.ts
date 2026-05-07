import { EbookElement, EbookSection, estimateHeight } from './ebook-parser';

export interface EbookPage {
  type: 'cover' | 'chapter' | 'content';
  pageNum: number;          // 1-based
  chapterNum?: number;
  chapterTitle?: string;
  chapterDescription?: string;
  elements: EbookElement[];
  /** 0–1 — how full this page is, used to stretch spacing */
  fillRatio: number;
}

// Usable content height per page (A4 1123px − top/bottom margin 64px each − header 38px − footer 28px)
const CONTENT_H = 993;
// Minimum fill ratio before we stretch
const MIN_FILL  = 0.82;

export function splitIntoPages(sections: EbookSection[]): EbookPage[] {
  const pages: EbookPage[] = [];
  let pageCounter = 0;

  function nextPageNum() { return ++pageCounter; }

  for (const section of sections) {
    if (section.type === 'cover') {
      pages.push({
        type: 'cover',
        pageNum: nextPageNum(),
        chapterTitle: section.chapterTitle,
        elements: section.elements,
        fillRatio: 1,
      });
      continue;
    }

    if (section.type === 'chapter') {
      pages.push({
        type: 'chapter',
        pageNum: nextPageNum(),
        chapterNum: section.chapterNum,
        chapterTitle: section.chapterTitle,
        chapterDescription: section.chapterDescription,
        elements: [],
        fillRatio: 1,
      });
    }

    // Now distribute section.elements across content pages
    let currentPage: EbookPage = {
      type: 'content',
      pageNum: nextPageNum(),
      chapterNum: section.chapterNum,
      chapterTitle: section.chapterTitle,
      elements: [],
      fillRatio: 1,
    };
    let usedH = 0;

    const flushCurrentPage = () => {
      if (currentPage.elements.length === 0) return;
      currentPage.fillRatio = Math.min(1, usedH / CONTENT_H);
      pages.push(currentPage);
      currentPage = {
        type: 'content',
        pageNum: nextPageNum(),
        chapterNum: section.chapterNum,
        chapterTitle: section.chapterTitle,
        elements: [],
        fillRatio: 1,
      };
      usedH = 0;
    };

    for (const el of section.elements) {
      // Explicit page break
      if (el.type === 'pagebreak') {
        flushCurrentPage();
        continue;
      }

      const elH = estimateHeight(el);

      // If this element alone exceeds the page → put it on its own page
      if (elH > CONTENT_H) {
        if (currentPage.elements.length > 0) flushCurrentPage();
        currentPage.elements.push(el);
        usedH = elH;
        flushCurrentPage();
        continue;
      }

      // If adding this element would overflow → flush first
      if (usedH + elH > CONTENT_H && currentPage.elements.length > 0) {
        flushCurrentPage();
      }

      currentPage.elements.push(el);
      usedH += elH;
    }

    // Flush remaining
    if (currentPage.elements.length > 0) {
      flushCurrentPage();
    }
  }

  // Post-process: merge tiny last pages (< 30% full) back if possible
  // and recalculate fill ratios
  return pages;
}
