# 🔀 Leader Election Challenge

## 🧠 Scenario

You're running multiple instances of a Node.js app. Only ONE instance should actively perform a recurring background task — polling a 3rd-party API every 5 seconds.

If the leader goes down, another instance must take over within 5 seconds. Redis will be used to coordinate this.

## ✅ Your Task

- Implement leader election using Redis.
- Only the leader should perform the polling task.
- Automatically fail over if the leader dies.
- Implement `/status` endpoint to show:
  - Whether this instance is leader
  - When it last polled the API

## 🧪 Simulating Multiple Instances

```bash
docker-compose up --build
```

This will start Redis and three Node.js instances on ports 3000, 3001, and 3002.

Watch the logs to see leadership change and polling activity.

## 📦 Commands

```bash
npm install
npm start
```

> **Note:**  
> If you want to run the app outside Docker Compose, make sure your `.env` file has `REDIS_URL=redis://localhost:6379/0` and that you have a local Redis server running.

## 📁 Project Structure

- `src/index.js` - App entrypoint
- `src/lib/leader.js` - Leader election logic
- `src/tasks/poll.js` - Task runner logic (only leader runs it)
- `src/routes/status.js` - Status endpoint

## 🛠 Assumptions

- You can mock the 3rd-party API with console.log
- Do not use a DB — everything should work with Redis and in-memory state
- Uses `ioredis` and `redlock`

## 🔍 Checking Pod Status

You can make a GET request to the `/status` route of each pod to see which one is the leader and when it last polled:

```bash
curl http://localhost:3000/status
curl http://localhost:3001/status
curl http://localhost:3002/status
```

The response will look like:

```json
{
  "isLeader": true,
  "lastPolled": "2025-06-18T15:00:00.000Z"
}
```

Only the leader will have `"isLeader": true` and update the `lastPolled` field.

## ⚡️ Environment Variables

- `REDIS_URL`

  - Use `redis://redis:6379/0` for Docker Compose (default in `docker-compose.yml`)
  - Use `redis://localhost:6379/0` for local development (edit `.env`)

- `PORT`

  - Set by Docker Compose for each instance

- `REDIS_LOCK_KEY`, `REDIS_LOCK_TTL`, `POLL_INTERVAL`
  - See `.env` for defaults
