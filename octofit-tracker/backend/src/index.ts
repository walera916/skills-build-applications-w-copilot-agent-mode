import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { Workout } from './models/workout';
import { Leaderboard } from './models/leaderboard';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const CODESPACE_NAME = process.env.CODESPACE_NAME;

const API_HOST = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${PORT}`;
const API_BASE_URL = `${API_HOST}/api`;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    apiBaseUrl: API_BASE_URL,
  });
});

const users = express.Router();
users.get('/', async (_req: Request, res: Response) => {
  const users = await User.find().populate('team', 'name totalPoints');
  res.json({ route: '/api/users/', users });
});
users.post('/', async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json({ route: '/api/users/', user });
});

const teams = express.Router();
teams.get('/', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members', 'name email totalPoints');
  res.json({ route: '/api/teams/', teams });
});
teams.post('/', async (req: Request, res: Response) => {
  const team = await Team.create(req.body);
  res.status(201).json({ route: '/api/teams/', team });
});

const activities = express.Router();
activities.get('/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user', 'name email');
  res.json({ route: '/api/activities/', activities });
});
activities.post('/', async (req: Request, res: Response) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ route: '/api/activities/', activity });
});

const leaderboard = express.Router();
leaderboard.get('/', async (_req: Request, res: Response) => {
  const leaderboard = await Leaderboard.find();
  res.json({ route: '/api/leaderboard/', leaderboard });
});

const workouts = express.Router();
workouts.get('/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find();
  res.json({ route: '/api/workouts/', workouts });
});
workouts.post('/', async (req: Request, res: Response) => {
  const workout = await Workout.create(req.body);
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
