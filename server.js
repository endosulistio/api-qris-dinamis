const express = require("express");
const bodyParser = require("body-parser");
const StaticQRIS = require("qris-dynamic-generator");

const app = express();
app.use(bodyParser.json());

app.post("/api/qris/generate", async (req, res) => {
  const { payload, nominal } = req.body;
  if (!payload || !nominal) {
    return res
      .status(400)
      .json({ success: false, error: "payload & nominal required" });
  }
  try {
    // 1. Instansiasi
    const QRIS = new StaticQRIS(payload);
    // 2. Generate string dinamis
    const qrisBaru = QRIS.generate(nominal.toString());
    return res.json({ success: true, qris: qrisBaru });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () =>
  console.log("QRIS API running on http://localhost:3000")
);
