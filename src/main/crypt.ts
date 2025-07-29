import crypto from 'node:crypto';

const algorithm = 'aes-256-cbc'; // 选择加密算法
const baseKey = process.env.CRYPTO_SECRET; // please change this key

/**
 * Creates a 32-character key by combining the base key with the provided key and hashing with SHA-256
 * @param {string} key - The input key to combine with the base key
 * @returns {string} A 32-character base64 encoded key suitable for AES-256 encryption
 */
const makeKey = (key: string): string => {
  return crypto
    .createHash('sha256')
    .update(`${baseKey}.${key}`)
    .digest('base64')
    .substring(0, 32);
};

/**
 * Encrypts text using AES-256-CBC algorithm with a randomly generated initialization vector
 * @param {string} text - The plain text to encrypt
 * @param {string} key - The key used for encryption (will be processed through makeKey function)
 * @returns {{ iv: string; encrypted: string }} Object containing the hex-encoded IV and base64-encoded encrypted data
 */
export function encrypt(
  text: string,
  key: string,
): { iv: string; encrypted: string } {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, makeKey(key), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return { iv: iv.toString('hex'), encrypted: encrypted.toString('base64') };
}

/**
 * Decrypts base64-encoded encrypted text using AES-256-CBC algorithm
 * @param {string} encrypted - The base64-encoded encrypted text to decrypt
 * @param {string} key - The key used for decryption (will be processed through makeKey function)
 * @param {string} ivHex - The hex-encoded initialization vector used during encryption
 * @returns {string} The decrypted plain text
 */
export function decrypt(encrypted: string, key: string, ivHex: string): string {
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, makeKey(key), iv);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}