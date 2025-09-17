"use strict";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");   // <— importer le module cors
app.use(cors());

//Logs par requête
app.use((req, res, next) => {
    const start = process.hrtime.bigint();
        res.on("finish", () => {
        const durMs = Number(process.hrtime.bigint() - start) / 1e6;
        console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} ${durMs.toFixed(1)}ms`);
    });
    next()
});

app.get("/health", (req, res) => {
    return res.status(200).json({ status: "ok" });
});

app.get("/next-metro", (req, res) => {
    const station = req.query.station;

    if (!station || typeof station !== "string" || !station.trim()) {
        return res.status(400).json({
            error: "missing station",
        });
    }

    const result = nextArrival();

    if ("service" in result) {
        // renvoie "closed" si le service est fermé
        return res.status(200).json(result);
    }

    // cas où le service est ouverte
    return res.status(200).json({
        station: station.trim(),
        line: "M7",
        ...result
    })
});

app.use((req, res) => {
    return res.status(404).json({
        error: "route not found"
    });
});

app.use((err, req, res, next) => {
    console.log("error", err);
    return res.status(500).json({ error: "internal error" });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function nextArrival(now = new Date(), headwayMin = 3) {
  const tz = "Europe/Paris";
  const toHM = d => String(d.getHours()).padStart(2,"0") + ":" + String(d.getMinutes()).padStart(2,"0");

  const start = new Date(now); start.setHours(5,30,0,0);            // 05:30
  const end   = new Date(now); end.setHours(1,15,0,0);              // 01:15
  const lastWindowStart = new Date(now); lastWindowStart.setHours(0,45,0,0); // 00:45
  const inService = (now >= start) || (now <= end);
  if (!inService) return { service: "closed", tz };
  const next = new Date(now.getTime() + headwayMin * 60 * 1000);
  const isLast = (now >= lastWindowStart && now <= end);

  return { nextArrival: toHM(next), isLast, headwayMin, tz };
}