export default function handler(req, res) {
  res.status(200).json({ ok: true, env: Boolean(process.env.TW_ACCESS_ID) })
}
