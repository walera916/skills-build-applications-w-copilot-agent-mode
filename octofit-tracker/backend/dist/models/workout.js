"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    targetMuscles: [{ type: String, required: true }],
    description: { type: String, required: true },
}, { timestamps: true });
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
//# sourceMappingURL=workout.js.map