const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/your-webhook-url";

app.get('/', (req, res) => res.send("Server is alive!"));

app.post('/send-log', async (req, res) => {
  const { username, userId } = req.body;
  if (!username || !userId) return res.status(400).send("Missing data");

  try {
    await axios.post(DISCORD_WEBHOOK, {
      content: `👤 **${username}** joined (UserId: ${userId})`
    });
    res.status(200).send("Sent to Discord.");
  } catch (e) {
    console.error(e);
    res.status(500).send("Failed to send to Discord.");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

