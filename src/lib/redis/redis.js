const Redis = require("ioredis");
const { port, hostname } = require("../../utils/port");

const redis = new Redis(process.env.REDIS_URL);

redis.on("error", (err) => {
  console.error(`[${port} ${hostname}] Erro:`, err.message);
});

module.exports = redis;
