import CryptoJS from 'crypto-js';
export const isJsonStr = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const isBytesWordArr = (bytes: CryptoJS.lib.WordArray) => {
  try {
    bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return false;
    
  }
  return true;

}