const Redis = require("ioredis");
const { port } = require("../../utils/port");

const redis = new Redis(process.env.REDIS_URL);

redis.on("error", (err) => {
  console.error(`[${port}] Erro:`, err.message);
});

module.exports = redis;
