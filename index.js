const express = require("express");
const { ytDlpWrap } = require("yt-dlp-exec");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/download", async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const videoLink = await ytDlpWrap.getVideoUrl(videoUrl);
        res.json({ videoUrl: videoLink });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch video", details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
