import { createHmac, randomUUID } from "node:crypto"

const ACCESS_ID = process.env.TW_ACCESS_ID
const HMAC_SECRET = process.env.TW_HMAC_SECRET

const method = "GET"
const path = "/v1/search/assets"
const query = "limit=5&query=ethereum"

const date = new Date().toUTCString()
const nonce = randomUUID()

const sortedQuery = [...new URLSearchParams(query).entries()]
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([k, v]) => k + "=" + v)
  .join("&")

const plaintext = [method, path, sortedQuery, ACCESS_ID, nonce, date].join(";")
console.log("Plaintext:", plaintext)

const signature = createHmac("sha256", HMAC_SECRET).update(plaintext).digest("base64")

const res = await fetch("https://tws.trustwallet.com" + path + "?" + query, {
  headers: {
    "X-TW-CREDENTIAL": ACCESS_ID,
    "X-TW-NONCE": nonce,
    "X-TW-DATE": date,
    "Authorization": "HMAC-SHA256 Signature=" + signature,
    "Content-Type": "application/json",
  }
})
const data = await res.json()
console.log("Response:", JSON.stringify(data, null, 2))
