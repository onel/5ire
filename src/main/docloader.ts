import fs from 'fs';
import pdf from 'pdf-parse';
import officeParser from 'officeparser';
import * as logging from './logging';

/**
 * Abstract base class for document loaders that provides a common interface
 * for loading and reading different types of documents.
 */
abstract class BaseLoader {
  /**
   * Abstract method that must be implemented by subclasses to read file content.
   * @param {string} filePath - The path to the file to be read
   * @returns {Promise<string>} A promise that resolves to the file content as a string
   */
  protected abstract read(filePath: string): Promise<string>;

  /**
   * Loads a document by calling the read method implemented by subclasses.
   * @param {string} filePath - The path to the file to be loaded
   * @returns {Promise<string>} A promise that resolves to the file content as a string
   */
  async load(filePath: string): Promise<string> {
    return await this.read(filePath);
  }
}

/**
 * Loader for plain text documents including txt, md, and csv files.
 * Reads files using UTF-8 encoding.
 */
class TextDocumentLoader extends BaseLoader {
  /**
   * Reads a text file and returns its content as a UTF-8 encoded string.
   * @param {fs.PathLike} filePath - The path to the text file to be read
   * @returns {Promise<string>} A promise that resolves to the file content
   */
  async read(filePath: fs.PathLike): Promise<string> {
    return await fs.promises.readFile(filePath, 'utf-8');
  }
}

/**
 * Loader for Microsoft Office documents including docx, pptx, and xlsx files.
 * Uses the officeparser library to extract text content.
 */
class OfficeLoader extends BaseLoader {
  /**
   * Creates a new OfficeLoader instance.
   */
  constructor() {
    super();
  }

  /**
   * Reads an Office document and extracts its text content.
   * @param {string} filePath - The path to the Office document to be read
   * @returns {Promise<string>} A promise that resolves to the extracted text content
   */
  async read(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      officeParser.parseOffice(filePath, function (text: string, error: any) {
        if (error) {
          reject(error);
        } else {
          resolve(text);
        }
      });
    });
  }
}

/**
 * Loader for PDF documents that extracts text content using pdf-parse library.
 */
class PdfLoader extends BaseLoader {
  /**
   * Reads a PDF file and extracts its text content.
   * @param {fs.PathLike} filePath - The path to the PDF file to be read
   * @returns {Promise<string>} A promise that resolves to the extracted text content
   */
  async read(filePath: fs.PathLike): Promise<string> {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  }
}

/**
 * Loads a document based on its file type and returns normalized text content.
 * Supports txt, md, csv, pdf, docx, pptx, and xlsx file types.
 * The returned text is processed to normalize whitespace and paragraph formatting.
 * @param {string} filePath - The path to the document file to be loaded
 * @param {string} fileType - The type of the file (extension without dot)
 * @returns {Promise<string>} A promise that resolves to the processed document content
 * @throws {Error} Throws an error if the file type is not supported
 */
export async function loadDocument(
  filePath: string,
  fileType: string,
): Promise<string> {
  logging.info(`load file from  ${filePath} on ${process.platform}`);
  let Loader: new () => BaseLoader;
  switch (fileType) {
    case 'txt':
      Loader = TextDocumentLoader;
      break;
    case 'md':
      Loader = TextDocumentLoader;
      break;
    case 'csv':
      Loader = TextDocumentLoader;
      break;
    case 'pdf':
      Loader = PdfLoader;
      break;
    case 'docx':
      Loader = OfficeLoader;
      break;
    case 'pptx':
      Loader = OfficeLoader;
      break;
    case 'xlsx':
      Loader = OfficeLoader;
      break;
    default:
      throw new Error(`Miss Loader for: ${fileType}`);
  }
  const loader = new Loader();
  let result = await loader.load(filePath);
  result = result.replace(/ +/g, ' ');
  const paragraphs = result
    .split(/\r?\n\r?\n/)
    .map((i) => i.replace(/\s+/g, ' '))
    .filter((i) => i.trim() !== '');
  return paragraphs.join('\r\n\r\n');
}