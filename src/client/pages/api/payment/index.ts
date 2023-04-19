import { NextApiRequest, NextApiResponse } from "next"
import CryptoJS from "crypto-js";
const encryptionKey = process.env.ENCRYPTED_SECRET!

export const config = {
  api: {
    bodyParser: { sizeLimit: '50mb' },
    externalResolver: true,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.body) {
    const { state, merRef } = req.body
    const redirectUrl = `${process.env.NEXTAUTH_URL}/shopping-cart/payment-result`
    console.log('payment result from next api: ', req.body)
    let text = { success: false, orderNo: "" }
    if (state === '1') {
      text = { success: true, orderNo: merRef }
    } else {
      text = { success: false, orderNo: merRef }
    }

    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(req.body), encryptionKey)
    // console.log('encrypted data', encryptedData)
    res.redirect(302, `${redirectUrl}?state=${encodeURIComponent(encryptedData.toString())}`)
  }
}
export default handler