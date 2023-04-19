import crypto from 'crypto'
import { saveCodeVerifier } from '../redux/auth/slice';

export const genCodeVerifier = () => {
  const base64URLEncode = (str: Buffer) => {
    return str.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  const sha256 = (buffer: string) => {
    return crypto.createHash('sha256').update(buffer).digest();
  }

  const verifier = base64URLEncode(crypto.randomBytes(32));
  // console.log("code_verifier: ", verifier)

  if (verifier) {
    const challenge = base64URLEncode(sha256(verifier));
    // console.log("code_challenge: ", challenge)
    return { challenge, verifier }
  }
}
