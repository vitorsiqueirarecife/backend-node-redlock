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
PORT=3000 npm start
PORT=3001 npm start
```

Watch the logs to see leadership change and polling activity.

## 📦 Commands

```bash
npm install
npm start
```

## 📁 Project Structure

- `src/index.js` - App entrypoint
- `src/lib/leader.js` - Leader election logic (you implement)
- `src/tasks/poll.js` - Task runner logic (only leader runs it)
- `src/routes/status.js` - Status endpoint

## 🛠 Assumptions

- You can mock the 3rd-party API with console.log
- Do not use a DB — everything should work with Redis and in-memory state
- Use `ioredis` or `redlock` if you prefer (both supported)

Good luck!
