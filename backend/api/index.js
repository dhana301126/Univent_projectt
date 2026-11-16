// backend/api/index.js
require('dotenv').config({ path: '../../.env' }); // Load env when running locally
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Import routers from each micro‑service
const authRouter = require('../auth-service/src/routes/auth.routes');
const eventRouter = require('../event-service/src/routes/event.routes');
const notifRouter = require('../notification-service/src/routes/announcement.routes');
const leaderboardRouter = require('../leaderboard-service/src/routes/leaderboard.routes');
const settingsRouter = require('../settings-service/src/routes/settings.routes');

app.use('/api/auth', authRouter);
app.use('/api/events', eventRouter);
app.use('/api/notifications', notifRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/settings', settingsRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
