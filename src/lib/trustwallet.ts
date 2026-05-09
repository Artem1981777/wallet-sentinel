async function twRequest(path: string, query: string = "", body?: object, method = "GET") {
  const res = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ method, path, query, body }),
  })
  return res.json()
}

export async function getPrice(assetId: string) {
  return twRequest("/v2/market/tickers", "", { currency: "USD", assets: [assetId] }, "POST")
}

export async function getTrending() {
  return twRequest("/v1/assets/listings", "version=27&currency=USD&category_id=trending&limit=10")
}

export async function checkSecurity(tokenId: string) {
  return twRequest("/v1/validate", "address=" + tokenId + "&type=address")
}

export async function searchAsset(query: string) {
  return twRequest("/v1/search/assets", "limit=5&query=" + query)
}
