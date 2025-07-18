const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1395760129328283650/WUXgotpYa37wYv42RCZu5-Ef8kMm3i4fLQ8Y01lrVbaengu1HUC9yFr96Asy2uP7mxKz";

app.post('/send-log', async (req, res) => {
  const { players } = req.body;
  
  if (!players) return res.status(400).send("Missing data");

  const user1 = players[0].username
  const user2 = players[1].username
    
  try {
    await axios.post(DISCORD_WEBHOOK, {
      content: `@everyone ${user1} Has completed a trade with ${user2}`
    });
    res.status(200).send("Sent to Discord.");
  } catch (e) {
    console.error(e);
    res.status(500).send("Failed to send to Discord.");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

