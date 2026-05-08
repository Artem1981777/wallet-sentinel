import { createHmac, randomUUID } from 'crypto'

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).end()

  try {
    const { method = "GET", path, query = "", body } = req.body
    const ACCESS_ID = process.env.TW_ACCESS_ID
    const HMAC_SECRET = process.env.TW_HMAC_SECRET

    const date = new Date().toUTCString()
    const nonce = randomUUID()

    const sortedQuery = query
      ? [...new URLSearchParams(query).entries()]
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([k, v]) => k + "=" + v)
          .join("&")
      : ""

    const plaintext = [method.toUpperCase(), path, sortedQuery, ACCESS_ID, nonce, date].join(";")
    const signature = createHmac("sha256", HMAC_SECRET).update(plaintext).digest("base64")
    const url = "https://tws.trustwallet.com" + path + (query ? "?" + query : "")

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-TW-CREDENTIAL": ACCESS_ID,
        "X-TW-NONCE": nonce,
        "X-TW-DATE": date,
        "Authorization": "HMAC-SHA256 Signature=" + signature,
      },
      body: method !== "GET" ? JSON.stringify(body) : undefined,
    })

    const text = await response.text()
    try {
      return res.status(200).json(JSON.parse(text))
    } catch(e) {
      return res.status(500).json({ parseError: e.message, raw: text.slice(0, 300) })
    }
  } catch(e) {
    return res.status(500).json({ error: e.message })
  }
}
