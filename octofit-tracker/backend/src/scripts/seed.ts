import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Workout } from '../models/workout';
import { Leaderboard } from '../models/leaderboard';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGODB_URI, {
    autoIndex: true,
  });

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  const users = await User.create([
    {
      name: 'Maya Chen',
      email: 'maya.chen@example.com',
      role: 'Athlete',
      profile: 'Endurance runner and weekend cyclist',
      totalPoints: 1540,
      joinedAt: new Date('2025-11-12'),
    },
    {
      name: 'Jason Patel',
      email: 'jason.patel@example.com',
      role: 'Athlete',
      profile: 'Strength training specialist',
      totalPoints: 1390,
      joinedAt: new Date('2026-01-09'),
    },
    {
      name: 'Alex Moreno',
      email: 'alex.moreno@example.com',
      role: 'Coach',
      profile: 'Certified fitness coach and nutrition advisor',
      totalPoints: 980,
      joinedAt: new Date('2025-08-04'),
    },
  ]);

  const teams = await Team.create([
    {
      name: 'Phoenix Striders',
      description: 'A community team focused on endurance challenges and personal bests.',
      members: [users[0]._id, users[1]._id],
      totalPoints: 2930,
      createdAt: new Date('2025-12-05'),
    },
    {
      name: 'Core Comets',
      description: 'Strength and recovery team for athletes who want consistent progress.',
      members: [users[2]._id],
      totalPoints: 980,
      createdAt: new Date('2025-10-21'),
    },
  ]);

  await User.updateMany(
    { _id: { $in: teams[0].members } },
    { $set: { team: teams[0]._id } }
  );

  await User.updateOne({ _id: teams[1].members[0] }, { $set: { team: teams[1]._id } });

  await Activity.create([
    {
      user: users[0]._id,
      type: 'Trail Run',
      durationMinutes: 55,
      caloriesBurned: 620,
      date: new Date('2026-05-24T07:15:00Z'),
      notes: 'Hill intervals with steady pace recovery. Felt strong on the final climb.',
    },
    {
      user: users[1]._id,
      type: 'Strength Circuit',
      durationMinutes: 45,
      caloriesBurned: 480,
      date: new Date('2026-05-25T18:30:00Z'),
      notes: 'Upper body and core focus with timed rest periods.',
    },
    {
      user: users[2]._id,
      type: 'Recovery Yoga',
      durationMinutes: 35,
      caloriesBurned: 180,
      date: new Date('2026-05-26T06:00:00Z'),
      notes: 'Mobility flow after a heavy training week.',
    },
  ]);

  await Workout.create([
    {
      name: 'Morning HIIT Boost',
      category: 'Cardio',
      durationMinutes: 30,
      difficulty: 'Intermediate',
      targetMuscles: ['Legs', 'Core', 'Glutes'],
      description: 'A fast-paced interval session designed to build endurance and power.',
    },
    {
      name: 'Strength Circuit Builder',
      category: 'Strength',
      durationMinutes: 50,
      difficulty: 'Advanced',
      targetMuscles: ['Chest', 'Back', 'Shoulders', 'Core'],
      description: 'Mixes compound lifts and bodyweight moves for a full upper-body strength session.',
    },
    {
      name: 'Recovery Flow',
      category: 'Mobility',
      durationMinutes: 40,
      difficulty: 'Beginner',
      targetMuscles: ['Full Body'],
      description: 'A gentle workout focused on stretching, breathing, and muscle recovery.',
    },
  ]);

  await Leaderboard.create({
    name: 'Weekly Performance Standings',
    scope: 'Mixed Team + User',
    entries: [
      {
        rank: 1,
        entityType: 'user',
        entityId: users[0]._id,
        label: 'Maya Chen',
        points: 1540,
      },
      {
        rank: 2,
        entityType: 'user',
        entityId: users[1]._id,
        label: 'Jason Patel',
        points: 1390,
      },
      {
        rank: 3,
        entityType: 'team',
        entityId: teams[0]._id,
        label: 'Phoenix Striders',
        points: 2930,
      },
      {
        rank: 4,
        entityType: 'team',
        entityId: teams[1]._id,
        label: 'Core Comets',
        points: 980,
      },
    ],
  });

  console.log('Seed data created successfully in octofit_db');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  mongoose.disconnect().finally(() => process.exit(1));
});
