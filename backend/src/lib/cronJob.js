import cron from "node-cron";

cron.schedule("*/5 * * * *", async () => {
  try {
    const res = await fetch("https://mern-chat-dnmr.onrender.com");
  } catch (error) {
    console.log(error.message);
  }
});
