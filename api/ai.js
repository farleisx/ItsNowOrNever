import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'prompt' in request body." });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server misconfigured: GOOGLE_API_KEY not set." });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate?key=${encodeURIComponent(apiKey)}`;

  const body = {
    prompt: { text: prompt },
    temperature: 0.7,
    maxOutputTokens: 800
  };

  try {
    const glRes = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
      timeout: 30_000
    });

    const data = glRes.data || {};

    // Defensive extraction of text (Google's response shape can vary)
    let text = "";

    if (data.candidates && Array.isArray(data.candidates) && data.candidates.length) {
      // candidate might contain 'output' string or 'content' array
      const c = data.candidates[0];
      if (typeof c.output === "string" && c.output.trim()) text = c.output;
      else if (c.content && Array.isArray(c.content)) {
        text = c.content.map(x => (typeof x.text === "string" ? x.text : "")).join("\n");
      }
    }
    if (!text && typeof data.output === "string") text = data.output;
    if (!text && data.result && data.result.output) text = data.result.output;

    // fallback: stringify anything helpful
    if (!text) text = JSON.stringify(data).slice(0, 5000);

    return res.status(200).json({ text });
  } catch (err) {
    console.error("AI function error:", err.response?.data || err.message || err);
    const message = err.response?.data || err.message || "Unknown error contacting Google API";
    return res.status(500).json({ error: message });
  }
}
