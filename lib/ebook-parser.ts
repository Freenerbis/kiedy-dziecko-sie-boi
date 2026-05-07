import fs from 'fs';
import path from 'path';

export type ElementType =
  | 'h1' | 'h2' | 'h3'
  | 'paragraph'
  | 'box' | 'dialog' | 'lista' | 'cwiczenie' | 'cytat'
  | 'pagebreak';

export interface DialogLine {
  speaker: 'MAMA' | 'DZIECKO' | 'meta';
  text: string;
}

export interface EbookElement {
  type: ElementType;
  content: string;
  lines?: DialogLine[];   // dialog
  items?: string[];       // lista
}

export interface EbookSection {
  type: 'cover' | 'chapter' | 'content';
  chapterNum?: number;
  chapterTitle?: string;
  chapterDescription?: string;
  elements: EbookElement[];
}

// Estimated height in px for layout algorithm
export function estimateHeight(el: EbookElement): number {
  const words = (el.content || '').split(/\s+/).filter(Boolean).length;
  switch (el.type) {
    case 'h1':      return 72;
    case 'h2':      return 64;
    case 'h3':      return 48;
    case 'paragraph':
      return Math.max(32, Math.ceil(words / 10) * 26 + 18);
    case 'box': {
      const bWords = el.content.split(/\s+/).filter(Boolean).length;
      return Math.max(80, Math.ceil(bWords / 10) * 24 + 72);
    }
    case 'dialog': {
      const n = (el.lines || []).length;
      return n * 54 + 48;
    }
    case 'lista': {
      const n = (el.items || []).length;
      return n * 40 + 24;
    }
    case 'cwiczenie': return 200;
    case 'cytat':     return 130;
    case 'pagebreak': return 0;
    default:          return 40;
  }
}

export function parseEbook(): EbookSection[] {
  const filePath = path.join(process.cwd(), 'content', 'ebook.txt');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split('\n');

  const sections: EbookSection[] = [];
  let currentSection: EbookSection | null = null;
  let chapterCounter = 0;

  // State machine for multi-line blocks
  type BlockMode = 'none' | 'box' | 'dialog' | 'lista' | 'cwiczenie' | 'cytat';
  let mode: BlockMode = 'none';
  let blockLines: string[] = [];

  function flushBlock() {
    if (!currentSection || mode === 'none') return;
    const content = blockLines.join('\n').trim();
    if (mode === 'box') {
      currentSection.elements.push({ type: 'box', content });
    } else if (mode === 'cytat') {
      currentSection.elements.push({ type: 'cytat', content });
    } else if (mode === 'cwiczenie') {
      currentSection.elements.push({ type: 'cwiczenie', content });
    } else if (mode === 'dialog') {
      const dLines: DialogLine[] = blockLines.map(l => {
        const mamaMatch  = l.match(/^MAMA:\s*(.+)/);
        const kidMatch   = l.match(/^DZIECKO:\s*(.+)/);
        if (mamaMatch)  return { speaker: 'MAMA'    as const, text: mamaMatch[1].trim() };
        if (kidMatch)   return { speaker: 'DZIECKO' as const, text: kidMatch[1].trim() };
        if (l.trim())   return { speaker: 'meta'    as const, text: l.trim() };
        return null;
      }).filter(Boolean) as DialogLine[];
      currentSection.elements.push({ type: 'dialog', content: '', lines: dLines });
    } else if (mode === 'lista') {
      const items = blockLines
        .map(l => l.replace(/^-\s*/, '').trim())
        .filter(Boolean);
      currentSection.elements.push({ type: 'lista', content: '', items });
    }
    blockLines = [];
    mode = 'none';
  }

  function pushToSection(el: EbookElement) {
    if (!currentSection) {
      currentSection = { type: 'content', elements: [] };
      sections.push(currentSection);
    }
    currentSection.elements.push(el);
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Block closing tags
    if (trimmed === '[/BOX]')       { flushBlock(); continue; }
    if (trimmed === '[/DIALOG]')    { flushBlock(); continue; }
    if (trimmed === '[/LISTA]')     { flushBlock(); continue; }
    if (trimmed === '[/ĆWICZENIE]') { flushBlock(); continue; }
    if (trimmed === '[/CYTAT]')     { flushBlock(); continue; }

    // Inside a block
    if (mode !== 'none') {
      blockLines.push(line);
      continue;
    }

    // Block opening tags
    if (trimmed === '[BOX]')       { mode = 'box';       blockLines = []; continue; }
    if (trimmed === '[DIALOG]')    { mode = 'dialog';    blockLines = []; continue; }
    if (trimmed === '[LISTA]')     { mode = 'lista';     blockLines = []; continue; }
    if (trimmed === '[ĆWICZENIE]') { mode = 'cwiczenie'; blockLines = []; continue; }
    if (trimmed === '[CYTAT]')     { mode = 'cytat';     blockLines = []; continue; }

    // Page break
    if (trimmed === '---') {
      if (currentSection) {
        currentSection.elements.push({ type: 'pagebreak', content: '' });
      }
      continue;
    }

    // H1 — cover title or doc title (first # line)
    if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
      const title = trimmed.replace(/^#\s+/, '');
      // If first section doesn't exist yet, create cover
      if (sections.length === 0) {
        currentSection = { type: 'cover', chapterTitle: title, elements: [] };
        sections.push(currentSection);
      } else {
        pushToSection({ type: 'h1', content: title });
      }
      continue;
    }

    // H2 — chapter opener
    if (trimmed.startsWith('## ')) {
      const title = trimmed.replace(/^##\s+/, '');
      flushBlock();

      // Detect chapter number pattern "Rozdział N:"
      const chapMatch = title.match(/^Rozdział\s+(\d+):\s*(.+)/i);
      if (chapMatch) {
        chapterCounter = parseInt(chapMatch[1]);
        currentSection = {
          type: 'chapter',
          chapterNum: chapterCounter,
          chapterTitle: chapMatch[2].trim(),
          chapterDescription: '',
          elements: [],
        };
      } else {
        chapterCounter = 0;
        currentSection = {
          type: 'chapter',
          chapterNum: undefined,
          chapterTitle: title,
          chapterDescription: '',
          elements: [],
        };
      }
      sections.push(currentSection);
      continue;
    }

    // H3 — subheading (also used as chapter description if right after chapter)
    if (trimmed.startsWith('### ')) {
      const subtitle = trimmed.replace(/^###\s+/, '');
      if (
        currentSection?.type === 'chapter' &&
        currentSection.elements.length === 0 &&
        !currentSection.chapterDescription
      ) {
        currentSection.chapterDescription = subtitle;
      } else {
        if (!currentSection) {
          currentSection = { type: 'content', elements: [] };
          sections.push(currentSection);
        }
        currentSection.elements.push({ type: 'h3', content: subtitle });
      }
      continue;
    }

    // Empty line — skip
    if (!trimmed) continue;

    // Regular paragraph
    if (!currentSection) {
      currentSection = { type: 'content', elements: [] };
      sections.push(currentSection);
    }
    currentSection.elements.push({ type: 'paragraph', content: trimmed });
  }

  flushBlock();
  return sections;
}
