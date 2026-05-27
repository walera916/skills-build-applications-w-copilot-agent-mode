"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const workout_1 = require("./models/workout");
const leaderboard_1 = require("./models/leaderboard");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 8000);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_HOST = CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
    : `http://localhost:${PORT}`;
const API_BASE_URL = `${API_HOST}/api`;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Connect to MongoDB
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running',
        apiBaseUrl: API_BASE_URL,
    });
});
const users = express_1.default.Router();
users.get('/', async (_req, res) => {
    const users = await user_1.User.find().populate('team', 'name totalPoints');
    res.json({ route: '/api/users/', users });
});
users.post('/', async (req, res) => {
    const user = await user_1.User.create(req.body);
    res.status(201).json({ route: '/api/users/', user });
});
const teams = express_1.default.Router();
teams.get('/', async (_req, res) => {
    const teams = await team_1.Team.find().populate('members', 'name email totalPoints');
    res.json({ route: '/api/teams/', teams });
});
teams.post('/', async (req, res) => {
    const team = await team_1.Team.create(req.body);
    res.status(201).json({ route: '/api/teams/', team });
});
const activities = express_1.default.Router();
activities.get('/', async (_req, res) => {
    const activities = await activity_1.Activity.find().populate('user', 'name email');
    res.json({ route: '/api/activities/', activities });
});
activities.post('/', async (req, res) => {
    const activity = await activity_1.Activity.create(req.body);
    res.status(201).json({ route: '/api/activities/', activity });
});
const leaderboard = express_1.default.Router();
leaderboard.get('/', async (_req, res) => {
    const leaderboard = await leaderboard_1.Leaderboard.find();
    res.json({ route: '/api/leaderboard/', leaderboard });
});
const workouts = express_1.default.Router();
workouts.get('/', async (_req, res) => {
    const workouts = await workout_1.Workout.find();
    res.json({ route: '/api/workouts/', workouts });
});
workouts.post('/', async (req, res) => {
    const workout = await workout_1.Workout.create(req.body);
    res.status(201).json({ route: '/api/workouts/', workout });
});
app.use('/api/users', users);
app.use('/api/teams', teams);
app.use('/api/activities', activities);
app.use('/api/leaderboard', leaderboard);
app.use('/api/workouts', workouts);
app.listen(PORT, () => {
    console.log(`Server is running on ${API_HOST}`);
    console.log(`API base URL: ${API_BASE_URL}`);
});
//# sourceMappingURL=index.js.map