import express from "express";

const app = express();
const port = process.env.PORT || 5175;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/wxo-token", async (req, res) => {
  const apiKey = process.env.WXO_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing WXO_API_KEY" });
  }

  try {
    const params = new URLSearchParams();
    params.set("grant_type", "urn:ibm:params:oauth:grant-type:apikey");
    params.set("apikey", apiKey);

    const response = await fetch("https://iam.cloud.ibm.com/identity/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: "Token request failed", details: text });
    }

    const data = await response.json();
    res.set("Access-Control-Allow-Origin", "*");
    return res.json({ access_token: data.access_token, expires_in: data.expires_in });
  } catch (error) {
    return res.status(500).json({ error: "Token request error", details: String(error) });
  }
});

app.listen(port, () => {
  console.log(`[WXO] Token server running on http://localhost:${port}`);
});
