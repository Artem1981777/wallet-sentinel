import { useState } from "react"
import { getPrice, getTrending, checkSecurity } from "./lib/trustwallet"

function App() {
  const [address, setAddress] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState("price")

  const handleAction = async () => {
    setLoading(true)
    setResult(null)
    try {
      if (tab === "price") setResult(await getPrice("c60"))
      if (tab === "trending") setResult(await getTrending())
      if (tab === "security") setResult(await checkSecurity(address))
    } catch (e: any) {
      setResult({ error: e.message })
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24, fontFamily: "sans-serif", background: "#0f172a", minHeight: "100vh", color: "white" }}>
      <h1>🛡️ WalletSentinel</h1>
      <p style={{ color: "#64748b" }}>Powered by Trust Wallet API</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["price", "trending", "security"].map(t => (
          <button key={t} onClick={() => { setTab(t); setResult(null) }}
            style={{ padding: "10px 18px", background: tab === t ? "#3b82f6" : "#1e293b",
              color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>
            {t === "price" ? "💰 ETH" : t === "trending" ? "🔥 Trending" : "🔍 Security"}
          </button>
        ))}
      </div>

      {tab === "security" && (
        <input value={address} onChange={e => setAddress(e.target.value)}
          placeholder="Token ID (e.g. c60_t0x...)"
          style={{ width: "100%", padding: 12, marginBottom: 16, borderRadius: 8, boxSizing: "border-box",
            border: "1px solid #334155", background: "#1e293b", color: "white" }} />
      )}

      <button onClick={handleAction} disabled={loading}
        style={{ width: "100%", padding: 14, background: "#3b82f6", color: "white",
          border: "none", borderRadius: 8, fontSize: 16, cursor: "pointer" }}>
        {loading ? "Loading..." : "Run"}
      </button>

      {result && (
        <pre style={{ marginTop: 24, padding: 16, background: "#1e293b", color: "#7dd3fc",
          borderRadius: 8, overflow: "auto", fontSize: 12, whiteSpace: "pre-wrap" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default App
