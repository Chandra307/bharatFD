const redis = require('ioredis');
const redisClient = redis.createClient({
  host: 'redis',
  port: 6379,
});

let redisReady = false;

redisClient.on('connect', () => redisReady = true);

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

const getRedisClient = () => {
  return new Promise((resolve, reject) => {
    if (redisReady) {
      resolve(redisClient);
    }
    else {
      redisClient.on('connect', () => resolve(redisClient));
      redisClient.on('error', reject);
    }
  });
};

module.exports = getRedisClient;
