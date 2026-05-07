import { parseEbook } from '@/lib/ebook-parser';
import { splitIntoPages, EbookPage } from '@/lib/page-splitter';
import PreviewClient from './PreviewClient';

export default function EbookPreviewPage() {
  const sections = parseEbook();
  const pages    = splitIntoPages(sections);
  return <PreviewClient pages={pages} />;
}
