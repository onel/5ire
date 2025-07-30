import { describe, expect } from '@jest/globals';
import { loadDocument } from '../../src/main/docloader';
import path from 'path';
import { getFileType } from '../../src/main/util';

/**
 * Test suite for DocLoader functionality
 * Tests file type detection and document content loading for various file formats
 */
describe('DocLader', () => {
  /**
   * Tests the getFileType utility function with different file formats
   * Verifies that the function correctly identifies file types based on file extensions
   */
  it('GetFileType', async () => {
    const file1 = path.join(__dirname, '../assets/AI-Career.pdf');
    expect(await getFileType(file1)).toBe('pdf');
    const file2 = path.join(__dirname, '../assets/演示项目.xlsx');
    expect(await getFileType(file2)).toBe('xlsx');
    const file3 = path.join(__dirname, '../assets/长恨歌.docx');
    expect(await getFileType(file3)).toBe('docx');
    const file4 = path.join(__dirname, '../assets/出师表.txt');
    expect(await getFileType(file4)).toBe('txt');
    const file5 = path.join(__dirname, '../assets/SOTA.md');
    expect(await getFileType(file5)).toBe('md');
  });

  /**
   * Tests PDF document loading functionality
   * Verifies that PDF content is correctly extracted and contains expected text
   */
  it('Load PDF file', async () => {
    const file = path.join(__dirname, '../assets/AI-Career.pdf');
    const content = await loadDocument(file, 'pdf');
    expect(content).toContain('Coding AI is the New Literacy');
  });

  /**
   * Tests XLSX (Excel) document loading functionality
   * Verifies that spreadsheet content is correctly extracted and contains expected Chinese text
   */
  it('Load XLSX file', async () => {
    const file = path.join(__dirname, '../assets/演示项目.xlsx');
    const content = await loadDocument(file, 'xlsx');
    expect(content).toContain('关于成立某某县监察委员会驻某某乡监察室的请示');
    expect(content).toContain('某某县委党建工作领导小组办公室');
    expect(content).toContain('20180915');
  });

  /**
   * Tests DOCX (Word) document loading functionality
   * Verifies that Word document content is correctly extracted and contains expected Chinese poetry text
   */
  it('Load DOCX file', async () => {
    const file = path.join(__dirname, '../assets/长恨歌.docx');
    const content = await loadDocument(file, 'docx');
    expect(content).toContain('汉皇重色思倾国');
    expect(content).toContain('御宇多年求不得');
    expect(content).toContain('【唐】白居易');
  });

  /**
   * Tests PPTX (PowerPoint) document loading functionality
   * Verifies that presentation content is correctly extracted and contains expected Chinese text
   * Removes whitespace from content for reliable text matching
   */
  it('Load PPTX file', async () => {
    const file = path.join(__dirname, '../assets/探索智慧的疆界.pptx');
    const content = (await loadDocument(file, 'pptx')).replace(/\s+/g, '');
    expect(content).toContain('探索智慧的疆界');
    expect(content).toContain('AGISurge');
    expect(content).toContain('标志着人类正式迈入了人工智能时代');
  });

  /**
   * Tests TXT and MD (text and markdown) file loading functionality
   * Verifies that plain text and markdown content is correctly extracted
   * Tests both TXT and MD file formats in a single test case
   */
  it('Load TXT file', async () => {
    const file = path.join(__dirname, '../assets/出师表.txt');
    const content = await loadDocument(file, 'txt');
    expect(content).toContain('【三国】诸葛亮');
    expect(content).toContain('先帝创业未半而中道崩殂');
    expect(content).toContain('此臣所以报先帝而忠陛下之职分也');

    const file1 = path.join(__dirname, '../assets/SOTA.md');
    const content1 = await loadDocument(file1, 'md');
    expect(content1).toContain('SOTA');
    expect(content1).toContain('计算机视觉');
    expect(content1).toContain('它会随着时间和新技术的出现而更新');
  });
});